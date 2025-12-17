import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export type AuthActionState = {
  error?: string;
};

const isValidInput = (value: unknown) => typeof value === "string" && value.trim().length > 0;

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState | void> {
  'use server';
  const email = formData.get("email");
  const password = formData.get("password");

  if (!isValidInput(email) || !isValidInput(password)) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: String(email),
    password: String(password),
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/login");
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState | void> {
  'use server';
  const email = formData.get("email");
  const password = formData.get("password");

  if (!isValidInput(email) || !isValidInput(password)) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email),
    password: String(password),
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
