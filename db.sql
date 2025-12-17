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
  ('Health Check', 'Harap lengkapi form kesehatan bulanan sebelum tanggal 25.'),
  ('Pelatihan Keamanan Data', 'Ikuti modul keamanan data terbaru sebelum akhir bulan ini.'),
  ('Town Hall', 'Town hall perusahaan akan diadakan Jumat pukul 15:00 di auditorium.'),
  ('Upgrade VPN', 'Client VPN baru tersedia, harap unduh versi terbaru sebelum Senin.'),
  ('Cuti Bersama', 'Tanggal 1-2 bulan depan ditetapkan sebagai cuti bersama nasional.'),
  ('Reminder Klaim Kesehatan', 'Klaim kesehatan Q4 ditutup pada tanggal 28 bulan ini.'),
  ('Survey Kepuasan', 'Mohon isi survey kepuasan karyawan, link ada di email Anda.'),
  ('Kebijakan Email', 'Gunakan email perusahaan hanya untuk keperluan pekerjaan resmi.'),
  ('Program Mentoring', 'Pendaftaran program mentoring batch berikutnya dibuka sampai tanggal 18.');

-- Delete specific announcements to keep only a few
delete from announcements
where title in (
  'Pelatihan Keamanan Data',
  'Town Hall',
  'Upgrade VPN',
  'Cuti Bersama',
  'Reminder Klaim Kesehatan',
  'Survey Kepuasan',
  'Kebijakan Email',
  'Program Mentoring'
);
