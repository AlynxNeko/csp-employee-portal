"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { AuthActionState } from "@/app/actions/auth";

export type AuthFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  action: (state: AuthActionState, formData: FormData) => Promise<AuthActionState>;
  helperText: string;
  helperHref: string;
};

const initialState: AuthActionState = { error: undefined };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-300"
      disabled={pending}
    >
      {pending ? "Memproses..." : label}
    </button>
  );
}

export function AuthForm({ title, description, submitLabel, action, helperHref, helperText }: AuthFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [state, formAction] = useActionState(action as any, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <div className="mb-6 space-y-2">
        <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
        <p className="text-sm text-zinc-600">{description}</p>
      </div>

      <form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-zinc-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-base text-zinc-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="********"
          />
        </div>

        {state?.error ? (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </div>
        ) : null}

        <SubmitButton label={submitLabel} />
      </form>

      <div className="mt-6 text-sm text-zinc-600">
        {helperText} {" "}
        <Link href={helperHref} className="font-semibold text-indigo-700 hover:text-indigo-500">
          Klik di sini
        </Link>
      </div>
    </div>
  );
}
