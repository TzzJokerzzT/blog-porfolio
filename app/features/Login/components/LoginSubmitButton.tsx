"use client";

interface LoginSubmitButtonProps {
  isLoading: boolean;
}

export function LoginSubmitButton({ isLoading }: LoginSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full cursor-pointer rounded-md bg-primary-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          Signing in…
        </span>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
