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
