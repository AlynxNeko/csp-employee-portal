import type { Metadata } from "next";
import { AuthForm } from "@/components/auth-form";
import { registerAction } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Registrasi | Employee Portal",
  description: "Buat akun baru untuk mengakses portal karyawan.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4">
      <AuthForm
        title="Registrasi Akun"
        description="Masukkan email dan password untuk membuat akun baru."
        submitLabel="Daftar"
        action={registerAction}
        helperText="Sudah memiliki akun?"
        helperHref="/login"
      />
    </div>
  );
}
