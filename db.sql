create table if not exists announcements (
  id bigint generated always as identity primary key,
  title text not null,
  content text not null,
  created_at timestamptz not null default now()
);

insert into announcements (title, content)
values
  ('Kebijakan WFH', 'Mulai pekan depan, WFO 3 hari dan WFH 2 hari.'),
  ('Pemeliharaan Sistem', 'Portal akan maintenance hari Sabtu pukul 22:00-23:00.'),
  ('Health Check', 'Harap lengkapi form kesehatan bulanan sebelum tanggal 25.');
