import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast during build/runtime when env is missing
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.");
}

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options?: unknown) {
        const normalizedOptions = typeof options === "object" && options !== null ? options : {};
        cookieStore.set({ name, value, ...(normalizedOptions as Record<string, unknown>) });
      },
      remove(name: string, options?: unknown) {
        const normalizedOptions = typeof options === "object" && options !== null ? options : {};
        cookieStore.set({
          name,
          value: "",
          ...(normalizedOptions as Record<string, unknown>),
          maxAge: 0,
        });
      },
    },
  });
};
