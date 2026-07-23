-- ============================================================
-- Riyadh Glass — Supabase schema
-- Run this once in Supabase SQL Editor (Project → SQL Editor → New query)
-- Safe to re-run: every statement is idempotent.
-- ============================================================

-- ---------- profiles / admin allowlist ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "admins_select_own" on public.admins;
create policy "admins_select_own" on public.admins
  for select using (auth.uid() = user_id);

-- ---------- content (site sections edited via dashboard) ----------
create table if not exists public.contents (
  id bigint generated always as identity primary key,
  key text not null unique,
  title text not null default '',
  body text not null default '',
  type text not null default 'section',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contents_key on public.contents (key);

alter table public.contents enable row level security;

drop policy if exists "contents_public_read" on public.contents;
create policy "contents_public_read" on public.contents
  for select using (true);

drop policy if exists "contents_admin_write" on public.contents;
create policy "contents_admin_write" on public.contents
  for all using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

-- ---------- messages (contact form submissions) ----------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  service text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.messages add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_messages_created_at on public.messages (created_at desc);

alter table public.messages enable row level security;

drop policy if exists "messages_public_insert" on public.messages;
create policy "messages_public_insert" on public.messages
  for insert with check (true);

drop policy if exists "messages_admin_read" on public.messages;
create policy "messages_admin_read" on public.messages
  for select using (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "messages_admin_update" on public.messages;
create policy "messages_admin_update" on public.messages
  for update using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

drop policy if exists "messages_admin_delete" on public.messages;
create policy "messages_admin_delete" on public.messages
  for delete using (exists (select 1 from public.admins where user_id = auth.uid()));

-- ---------- media (uploaded images) ----------
create table if not exists public.media (
  id bigint generated always as identity primary key,
  name text not null,
  url text not null,
  storage_path text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_media_created_at on public.media (created_at desc);

alter table public.media enable row level security;

drop policy if exists "media_public_read" on public.media;
create policy "media_public_read" on public.media
  for select using (true);

drop policy if exists "media_admin_write" on public.media;
create policy "media_admin_write" on public.media
  for all using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

-- ---------- projects (portfolio/gallery) ----------
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null default '',
  description text not null default '',
  image text not null default '',
  class_name text not null default 'md:col-span-1 md:row-span-1',
  order_index bigint not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_projects_order_index on public.projects (order_index);

alter table public.projects enable row level security;

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read" on public.projects
  for select using (true);

drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write" on public.projects
  for all using (exists (select 1 from public.admins where user_id = auth.uid()))
  with check (exists (select 1 from public.admins where user_id = auth.uid()));

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_contents_updated_at on public.contents;
create trigger trg_contents_updated_at
  before update on public.contents
  for each row execute function public.set_updated_at();

drop trigger if exists trg_messages_updated_at on public.messages;
create trigger trg_messages_updated_at
  before update on public.messages
  for each row execute function public.set_updated_at();

drop trigger if exists trg_media_updated_at on public.media;
create trigger trg_media_updated_at
  before update on public.media
  for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------- realtime ----------
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'contents'
  ) then
    alter publication supabase_realtime add table public.contents;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'media'
  ) then
    alter publication supabase_realtime add table public.media;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'projects'
  ) then
    alter publication supabase_realtime add table public.projects;
  end if;
end $$;

-- ---------- storage bucket for uploaded images ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_bucket_public_read" on storage.objects;
create policy "media_bucket_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_bucket_admin_insert" on storage.objects;
create policy "media_bucket_admin_insert" on storage.objects
  for insert with check (
    bucket_id = 'media' and exists (select 1 from public.admins where user_id = auth.uid())
  );

drop policy if exists "media_bucket_admin_update" on storage.objects;
create policy "media_bucket_admin_update" on storage.objects
  for update using (
    bucket_id = 'media' and exists (select 1 from public.admins where user_id = auth.uid())
  )
  with check (
    bucket_id = 'media' and exists (select 1 from public.admins where user_id = auth.uid())
  );

drop policy if exists "media_bucket_admin_delete" on storage.objects;
create policy "media_bucket_admin_delete" on storage.objects
  for delete using (
    bucket_id = 'media' and exists (select 1 from public.admins where user_id = auth.uid())
  );

-- ============================================================
-- IMPORTANT — after running this file:
-- 1. Sign in to the site once via /dashboard with the Google account
--    that should be admin (this creates the auth.users row).
-- 2. Run the statement below with that account's real email:
--
--    insert into public.admins (user_id, email)
--    select id, email from auth.users where email = 'YOUR_EMAIL_HERE'
--    on conflict (user_id) do nothing;
--
-- Without this step, nobody has admin/write access — this is what
-- replaces the old "click Google button = instant admin" behavior.
-- ============================================================
