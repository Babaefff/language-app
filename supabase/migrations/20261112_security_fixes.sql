-- Apply before deploying the corresponding client. Safe to re-run.
begin;

-- Enforce time and quota on the server, including concurrent requests.
create or replace function public.feedback_rate_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended('feedback:' || new.user_id::text, 0));
  new.created_at := clock_timestamp();
  if (select count(*) from public.feedback where user_id = new.user_id and created_at > new.created_at - interval '1 day') >= 30 then
    raise exception 'Too many reports today. Thank you — please try again tomorrow.';
  end if;
  return new;
end $$;

-- Tolerate legacy or malicious progress shapes in the admin overview.
create or replace function public.progress_object(value jsonb)
returns jsonb language sql immutable set search_path = '' as $$
  select case when jsonb_typeof(value) = 'object' then value else '{}'::jsonb end;
$$;
create or replace function public.progress_number(value text)
returns numeric language plpgsql immutable set search_path = '' as $$
begin
  if value is null or value !~ '^[0-9]+([.][0-9]+)?$' or length(value) > 100 then return null; end if;
  return value::numeric;
exception when invalid_text_representation or numeric_value_out_of_range then return null;
end $$;

-- Course-progress deletion is durable across clients. Personal tests and feedback
-- are deliberately separate; account deletion still removes user-owned rows.
create table if not exists public.progress_sync_controls (
  user_id uuid primary key references auth.users(id) on delete cascade,
  paused boolean not null default false
);
alter table public.progress_sync_controls enable row level security;
-- No direct write policy: only authenticated, self-scoped functions change this table.
create or replace function public.cloud_progress_paused()
returns boolean language sql security definer set search_path = '' as $$
  select coalesce((select paused from public.progress_sync_controls where user_id = auth.uid()), false);
$$;
create or replace function public.guard_progress_sync()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended('progress:' || new.user_id::text, 0));
  if exists (select 1 from public.progress_sync_controls where user_id = new.user_id and paused) then
    raise exception 'CLOUD_PROGRESS_PAUSED';
  end if;
  return new;
end $$;
drop trigger if exists guard_progress_sync on public.progress;
create trigger guard_progress_sync before insert or update on public.progress for each row execute function public.guard_progress_sync();

create or replace function public.delete_cloud_progress(expected_user uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if uid is null or uid is distinct from expected_user then raise exception 'Account changed. Sign in again.'; end if;
  perform pg_advisory_xact_lock(hashtextextended('progress:' || uid::text, 0));
  insert into public.progress_sync_controls(user_id, paused) values(uid, true)
    on conflict(user_id) do update set paused = true;
  delete from public.progress where user_id = uid;
end $$;
create or replace function public.resume_cloud_progress(expected_user uuid)
returns void language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if uid is null or uid is distinct from expected_user then raise exception 'Account changed. Sign in again.'; end if;
  perform pg_advisory_xact_lock(hashtextextended('progress:' || uid::text, 0));
  insert into public.progress_sync_controls(user_id, paused) values(uid, false)
    on conflict(user_id) do update set paused = false;
end $$;
revoke all on function public.cloud_progress_paused() from public, anon;
revoke all on function public.delete_cloud_progress(uuid) from public, anon;
revoke all on function public.resume_cloud_progress(uuid) from public, anon;
grant execute on function public.cloud_progress_paused() to authenticated;
grant execute on function public.delete_cloud_progress(uuid) to authenticated;
grant execute on function public.resume_cloud_progress(uuid) to authenticated;

create or replace function public.admin_learners()
returns table (user_id uuid, email text, created_at timestamptz, last_sign_in_at timestamptz, progress jsonb)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Only admins.'; end if;
  return query
  select u.id, u.email::text, u.created_at, u.last_sign_in_at,
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'lang', p.lang,
        'updated_at', p.updated_at,
        'xp', coalesce(p.data->'xp', '{}'::jsonb),
        'exams', coalesce(p.data->'exams', '{}'::jsonb),
        'units', (select count(*) from jsonb_object_keys(public.progress_object(p.data->'units'))),
        'words', (select count(*) from jsonb_each(public.progress_object(p.data->'cards'))),
        'known', (select count(*) from jsonb_each(public.progress_object(p.data->'cards')) c where public.progress_number(c.value->>'interval') >= 14),
        'learning', (select count(*) from jsonb_each(public.progress_object(p.data->'cards')) c where public.progress_number(c.value->>'interval') < 1),
        'due', (select count(*) from jsonb_each(public.progress_object(p.data->'cards')) c where public.progress_number(c.value->>'due') <= extract(epoch from now()) * 1000),
        'danger', coalesce((select jsonb_agg(c.key) from jsonb_each(public.progress_object(p.data->'cards')) c where public.progress_number(c.value->>'lapses') >= 3), '[]'::jsonb)
      ) order by p.updated_at desc)
      from public.progress p where p.user_id = u.id
    ), '[]'::jsonb)
  from auth.users u
  order by u.last_sign_in_at desc nulls last;
end $$;
revoke all on function public.admin_learners() from public, anon;
grant execute on function public.admin_learners() to authenticated;

commit;
