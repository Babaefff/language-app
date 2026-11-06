-- Hablo accounts: one row of progress per user and language.
-- Run this once in Supabase: SQL Editor → New query → paste → Run.
create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lang text not null check (lang in ('es', 'de')),
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);

-- Row Level Security: every user can read and change only their own rows.
alter table public.progress enable row level security;

drop policy if exists "own progress: read" on public.progress;
drop policy if exists "own progress: insert" on public.progress;
drop policy if exists "own progress: update" on public.progress;
drop policy if exists "own progress: delete" on public.progress;
create policy "own progress: read" on public.progress for select using (auth.uid() = user_id);
create policy "own progress: insert" on public.progress for insert with check (auth.uid() = user_id);
create policy "own progress: update" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own progress: delete" on public.progress for delete using (auth.uid() = user_id);
