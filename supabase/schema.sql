-- Hablo accounts: one row of progress per user and language.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.
create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lang text not null check (lang in ('es', 'de', 'fr', 'ru')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);

-- Row Level Security: every user can read and change only their own rows.
-- Re-runnable: lets existing tables accept new course languages.
alter table public.progress drop constraint if exists progress_lang_check;
alter table public.progress add constraint progress_lang_check check (lang in ('es', 'de', 'fr', 'ru'));

alter table public.progress enable row level security;

drop policy if exists "own progress: read" on public.progress;
drop policy if exists "own progress: insert" on public.progress;
drop policy if exists "own progress: update" on public.progress;
drop policy if exists "own progress: delete" on public.progress;
create policy "own progress: read" on public.progress for select using (auth.uid() = user_id);
create policy "own progress: insert" on public.progress for insert with check (auth.uid() = user_id);
create policy "own progress: update" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress: delete" on public.progress for delete using (auth.uid() = user_id);

-- Limit each saved progress copy to 1 MB so nobody can fill the database with junk.
alter table public.progress drop constraint if exists progress_size_limit;
alter table public.progress add constraint progress_size_limit check (octet_length(data::text) < 1000000);

-- Lets a signed-in user delete their own account (and, through "on delete cascade", their progress).
create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;

-- ============================================================================================
-- Lesson feedback: learners report a problem in a lesson; admins resolve it; the learner is
-- thanked in the app. Re-runnable.
-- ============================================================================================
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lang text not null check (lang in ('es', 'de', 'fr', 'ru')),
  -- Where it happened: route (e.g. /unit/de-a1-01), lesson title, the exercise shown, the answer typed.
  context jsonb not null default '{}'::jsonb,
  category text not null check (category in ('wrong', 'translation', 'audio', 'typo', 'unclear', 'other')),
  message text not null default '' check (char_length(message) <= 2000),
  status text not null default 'open' check (status in ('open', 'resolved', 'declined')),
  reply text check (reply is null or char_length(reply) <= 2000),
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  -- false until the learner has seen the "thank you" after it was resolved.
  seen boolean not null default true,
  constraint feedback_context_size check (octet_length(context::text) < 8000)
);
create index if not exists feedback_status_idx on public.feedback (status, created_at desc);
create index if not exists feedback_user_idx on public.feedback (user_id, created_at desc);

-- Who may resolve feedback. Add yourself once (see README): insert into public.admins …
create table if not exists public.admins (user_id uuid primary key references auth.users (id) on delete cascade);
alter table public.admins enable row level security;
drop policy if exists "admins: read self" on public.admins;
create policy "admins: read self" on public.admins for select using (auth.uid() = user_id);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to authenticated;

alter table public.feedback enable row level security;
drop policy if exists "feedback: insert own" on public.feedback;
drop policy if exists "feedback: read own or admin" on public.feedback;
-- Learners add their own reports (always open, never pre-resolved); no direct updates at all.
create policy "feedback: insert own" on public.feedback for insert
  with check (auth.uid() = user_id and status = 'open' and reply is null and resolved_at is null and seen);
create policy "feedback: read own or admin" on public.feedback for select
  using (auth.uid() = user_id or public.is_admin());

-- At most 30 reports a day per person, so nobody can flood the list.
create or replace function public.feedback_rate_limit()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if (select count(*) from public.feedback where user_id = new.user_id and created_at > now() - interval '1 day') >= 30 then
    raise exception 'Too many reports today. Thank you — please try again tomorrow.';
  end if;
  return new;
end $$;
drop trigger if exists feedback_rate_limit on public.feedback;
create trigger feedback_rate_limit before insert on public.feedback for each row execute function public.feedback_rate_limit();

-- Admins resolve or decline a report with a reply; the learner then sees it once.
create or replace function public.feedback_resolve(fid uuid, new_status text, reply_text text)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Only admins can resolve feedback.'; end if;
  if new_status not in ('open', 'resolved', 'declined') then raise exception 'Unknown status.'; end if;
  update public.feedback
     set status = new_status,
         reply = nullif(left(reply_text, 2000), ''),
         resolved_at = case when new_status = 'open' then null else now() end,
         seen = new_status = 'open'
   where id = fid;
end $$;
revoke all on function public.feedback_resolve(uuid, text, text) from public, anon;
grant execute on function public.feedback_resolve(uuid, text, text) to authenticated;

-- The learner marks the thank-you as seen (only on their own reports).
create or replace function public.feedback_mark_seen(fid uuid)
returns void language sql security definer set search_path = '' as $$
  update public.feedback set seen = true where id = fid and user_id = auth.uid();
$$;
revoke all on function public.feedback_mark_seen(uuid) from public, anon;
grant execute on function public.feedback_mark_seen(uuid) to authenticated;

-- ============================================================================================
-- Personal material: lessons and tests made for one learner (e.g. from their own worksheets).
-- Stored here, not in the app code, so only that learner (and admins) can read it. Re-runnable.
-- ============================================================================================
create table if not exists public.personal_sets (
  id uuid primary key default gen_random_uuid(),
  lang text not null check (lang in ('es', 'de', 'fr', 'ru')),
  title text not null check (char_length(title) <= 200),
  -- Lessons (words, sentences, notes) and tests, in the format described in README.
  content jsonb not null,
  created_at timestamptz not null default now(),
  constraint personal_sets_size check (octet_length(content::text) < 2000000)
);
create table if not exists public.personal_access (
  set_id uuid not null references public.personal_sets (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  -- The name of the learner's tab, e.g. "Mu kalli jaoks".
  tab_name text not null default 'Mu kalli jaoks' check (char_length(tab_name) <= 60),
  created_at timestamptz not null default now(),
  primary key (set_id, user_id)
);
create table if not exists public.personal_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  set_id uuid not null references public.personal_sets (id) on delete cascade,
  test_id text not null check (char_length(test_id) <= 100),
  score int not null check (score >= 0),
  total int not null check (total > 0),
  -- Every question: what was asked, the expected answer, what was answered, right or not.
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint personal_results_size check (octet_length(answers::text) < 200000)
);
-- How long a test took, in seconds (mock exams show it against their time limit).
alter table public.personal_results add column if not exists seconds int check (seconds >= 0);
create index if not exists personal_results_user_idx on public.personal_results (user_id, created_at desc);

alter table public.personal_sets enable row level security;
alter table public.personal_access enable row level security;
alter table public.personal_results enable row level security;

drop policy if exists "personal sets: assigned or admin" on public.personal_sets;
drop policy if exists "personal sets: admin writes" on public.personal_sets;
create policy "personal sets: assigned or admin" on public.personal_sets for select using (
  public.is_admin() or exists (select 1 from public.personal_access a where a.set_id = personal_sets.id and a.user_id = auth.uid()));
create policy "personal sets: admin writes" on public.personal_sets for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "personal access: own or admin" on public.personal_access;
drop policy if exists "personal access: admin writes" on public.personal_access;
create policy "personal access: own or admin" on public.personal_access for select using (auth.uid() = user_id or public.is_admin());
create policy "personal access: admin writes" on public.personal_access for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "personal results: own insert" on public.personal_results;
drop policy if exists "personal results: own or admin read" on public.personal_results;
-- Learners save their own results, only for material assigned to them; nobody edits results.
create policy "personal results: own insert" on public.personal_results for insert with check (
  auth.uid() = user_id and exists (select 1 from public.personal_access a where a.set_id = personal_results.set_id and a.user_id = auth.uid()));
create policy "personal results: own or admin read" on public.personal_results for select using (auth.uid() = user_id or public.is_admin());

-- Admins assign material by the learner's email (they must have signed in once).
create or replace function public.personal_assign(set_uuid uuid, learner_email text, tab text)
returns text language plpgsql security definer set search_path = '' as $$
declare uid uuid;
begin
  if not public.is_admin() then raise exception 'Only admins can assign material.'; end if;
  select id into uid from auth.users where lower(email) = lower(trim(learner_email));
  if uid is null then raise exception 'No account with that email yet: ask them to sign in to Hablo once.'; end if;
  insert into public.personal_access (set_id, user_id, tab_name) values (set_uuid, uid, coalesce(nullif(trim(tab), ''), 'Mu kalli jaoks'))
  on conflict (set_id, user_id) do update set tab_name = excluded.tab_name;
  return uid::text;
end $$;
revoke all on function public.personal_assign(uuid, text, text) from public, anon;
grant execute on function public.personal_assign(uuid, text, text) to authenticated;

-- Admins see who has which material and the results, with the learner's email.
create or replace function public.personal_overview()
returns table (set_id uuid, user_id uuid, email text, tab_name text)
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'Only admins.'; end if;
  return query select a.set_id, a.user_id, u.email::text, a.tab_name from public.personal_access a join auth.users u on u.id = a.user_id;
end $$;
revoke all on function public.personal_overview() from public, anon;
grant execute on function public.personal_overview() to authenticated;

-- ============================================================================================
-- Admin overview: one row per learner with a summary of their progress (no full copies).
-- Only admins can call it. Re-runnable.
-- ============================================================================================
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
        'units', (select count(*) from jsonb_object_keys(coalesce(p.data->'units', '{}'::jsonb))),
        'words', (select count(*) from jsonb_each(coalesce(p.data->'cards', '{}'::jsonb))),
        'known', (select count(*) from jsonb_each(coalesce(p.data->'cards', '{}'::jsonb)) c where (c.value->>'interval')::numeric >= 14),
        'learning', (select count(*) from jsonb_each(coalesce(p.data->'cards', '{}'::jsonb)) c where (c.value->>'interval')::numeric < 1),
        'due', (select count(*) from jsonb_each(coalesce(p.data->'cards', '{}'::jsonb)) c where (c.value->>'due')::numeric <= extract(epoch from now()) * 1000),
        'danger', coalesce((select jsonb_agg(c.key) from jsonb_each(coalesce(p.data->'cards', '{}'::jsonb)) c where (c.value->>'lapses')::int >= 3), '[]'::jsonb)
      ) order by p.updated_at desc)
      from public.progress p where p.user_id = u.id
    ), '[]'::jsonb)
  from auth.users u
  order by u.last_sign_in_at desc nulls last;
end $$;
revoke all on function public.admin_learners() from public, anon;
grant execute on function public.admin_learners() to authenticated;
