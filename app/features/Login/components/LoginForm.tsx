"use client";

import { FormEvent } from "react";
import { LoginSubmitButton } from "./LoginSubmitButton";

interface LoginFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  error: string | null;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const inputClass =
    "w-full rounded-md border border-divider bg-input px-3 py-2.5 text-foreground placeholder:text-foreground-secondary/60 transition-colors focus:outline-none focus:border-accent";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      {error && (
        <div
          role="alert"
          className="rounded-md border border-danger-300 bg-danger-50 px-4 py-3 text-sm text-danger-700"
        >
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      <LoginSubmitButton isLoading={isLoading} />
    </form>
  );
}
