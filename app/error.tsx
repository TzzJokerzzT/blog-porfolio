"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell py-24">
      <h1 className="font-serif text-3xl font-medium tracking-tight text-foreground">
        Something went wrong.
      </h1>
      <p className="mt-3 max-w-[52ch] text-foreground-secondary">
        The page couldn&apos;t be loaded. Try again, or go back to the posts.
      </p>
      <div className="ui-meta mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={reset}
          className="cursor-pointer text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="text-foreground-secondary transition-colors hover:text-accent"
        >
          Read the posts
        </Link>
      </div>
    </div>
  );
}
