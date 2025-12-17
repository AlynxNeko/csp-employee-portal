import { createClient } from "@/utils/supabase/server";
import { logoutAction } from "@/app/actions/auth";
import { redirect } from "next/navigation";

type Announcement = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: announcements, error: announcementsError } = await supabase
    .from("announcements")
    .select("id, title, content, created_at")
    .order("created_at", { ascending: false });

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
            <p className="text-sm text-slate-600">
              {announcements?.length ? `${announcements.length} item` : "Tidak ada data."}
            </p>
          </div>

          {announcementsError ? (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              Gagal memuat data pengumuman: {announcementsError.message}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {announcements?.map((item: Announcement) => (
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
          )}
        </section>
      </div>
    </div>
  );
}
