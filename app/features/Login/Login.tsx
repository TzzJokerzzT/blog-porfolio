"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/shared/services/api.service";
import { useAuth } from "@/shared/hooks/useAuth";
import { LoginForm } from "./components/LoginForm";

export function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await authApi.login({ email, password });
      const { user, accessToken, refreshToken } = res.data;
      login(user, accessToken, refreshToken);
      router.push("/blog");
    } catch (err: unknown) {
      const apiErr = err as Error & { status?: number };
      if (apiErr.status === 401 || apiErr.status === 400) {
        setError("Email o contraseña incorrectos.");
      } else {
        setError("Ocurrió un error. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />;
}
