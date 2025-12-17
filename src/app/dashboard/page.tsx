import { createClient } from "@/utils/supabase/server";
import { logoutAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-indigo-50 px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-600">Portal Karyawan</p>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-700">Selamat datang, {user.email}</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-indigo-200 hover:text-indigo-700 hover:shadow"
            >
              Logout
            </button>
          </form>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Pengumuman</h2>
            <Suspense fallback={<AnnouncementsSkeleton count={6} />}>
              <AnnouncementCount />
            </Suspense>
          </div>

          <Suspense fallback={<AnnouncementsSkeleton count={6} />}>
            <AnnouncementsSection />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

type Announcement = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

async function fetchAnnouncements() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });
  return { data, error };
}

async function AnnouncementCount() {
  const { data } = await fetchAnnouncements();
  return (
    <p className="text-sm text-slate-600">
      {data?.length ? `${data.length} item` : "Tidak ada data."}
    </p>
  );
}

async function AnnouncementsSection() {
  const { data, error } = await fetchAnnouncements();

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        Gagal memuat data pengumuman: {error.message}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {data?.map((item) => (
        <article
          key={item.id}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>ID: {item.id}</span>
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-700">{item.content}</p>
        </article>
      ))}
    </div>
  );
}

function AnnouncementsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="h-3 w-12 rounded bg-slate-200" />
            <span className="h-3 w-16 rounded bg-slate-200" />
          </div>
          <div className="mt-3 h-4 w-2/3 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-full rounded bg-slate-200" />
          <div className="mt-1 h-3 w-5/6 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
}
