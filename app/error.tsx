"use client";

import { Button } from "@/shared/components/Button/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Something went wrong
        </h2>
        <p className="text-foreground-secondary mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            radius="lg"
            onClick={reset}
          >
            Try Again
          </Button>
          <Button
            size="lg"
            color="primary"
            variant="bordered"
            radius="lg"
            href="/"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
