import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are missing in middleware.");
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(
        name: string,
        value: string,
        options?: unknown,
      ) {
        const normalizedOptions = typeof options === "object" && options !== null ? options : {};
        response.cookies.set({ name, value, ...(normalizedOptions as Record<string, unknown>) });
      },
      remove(
        name: string,
        options?: unknown,
      ) {
        const normalizedOptions = typeof options === "object" && options !== null ? options : {};
        response.cookies.set({
          name,
          value: "",
          ...(normalizedOptions as Record<string, unknown>),
          maxAge: 0,
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname === "/login" || pathname === "/register";
  const isDashboard = pathname.startsWith("/dashboard");

  if (!session && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && (isAuthRoute || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
