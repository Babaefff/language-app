-- Hablo accounts: one row of progress per user and language.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.
create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lang text not null check (lang in ('es', 'de', 'fr')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);

-- Row Level Security: every user can read and change only their own rows.
-- Re-runnable: lets existing tables accept new course languages.
alter table public.progress drop constraint if exists progress_lang_check;
alter table public.progress add constraint progress_lang_check check (lang in ('es', 'de', 'fr'));

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
