import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { loginAction } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Login | Employee Portal",
  description: "Masuk ke portal karyawan untuk melihat profil dan pengumuman.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
      <AuthForm
        title="Masuk Portal"
        description="Gunakan email dan password yang telah terdaftar."
        submitLabel="Masuk"
        action={loginAction}
        helperText="Belum punya akun?"
        helperHref="/register"
      />
    </div>
  );
}
