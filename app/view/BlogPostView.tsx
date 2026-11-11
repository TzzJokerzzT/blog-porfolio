"use client";

import Link from "next/link";
import { useAuth } from "@/shared/hooks/useAuth";
import { Prose } from "@/shared/components/Prose";
import type { Post } from "@/shared/types/api.types";

interface BlogPostViewProps {
  post: Post;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

const BackIcon = () => (
  <svg
    className="h-3.5 w-3.5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

export function BlogPostView({ post }: BlogPostViewProps) {
  const { isAuthenticated } = useAuth();

  return (
    <article className="page-shell py-16">
      <div className="ui-meta flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-foreground-secondary transition-colors hover:text-accent"
        >
          <BackIcon />
          All posts
        </Link>
        {isAuthenticated && (
          <Link
            href={`/blog/editar/${post.slug}`}
            className="text-foreground-secondary transition-colors hover:text-accent"
          >
            Edit
          </Link>
        )}
      </div>

      <header className="enter mt-8">
        <h1 className="font-serif text-[clamp(2rem,5.5vw,2.875rem)] font-medium leading-[1.12] tracking-tight text-foreground">
          {post.title}
        </h1>
        <div className="ui-meta mt-4 flex flex-wrap gap-x-5 gap-y-1 text-foreground-secondary">
          <time dateTime={post.date} className="tabular">
            {formatDate(post.date)}
          </time>
          <span className="tabular">{post.readTime}</span>
          {post.category && <span>{post.category}</span>}
        </div>
      </header>

      {post.excerpt && (
        <p className="mt-10 border-l-2 border-accent pl-4 font-serif text-[1.125rem] leading-[1.7] text-foreground-secondary">
          {post.excerpt}
        </p>
      )}

      <div className="mt-10">
        <Prose content={post.content} />
      </div>

      <div className="mt-16 border-t border-divider pt-6">
        <Link
          href="/blog"
          className="ui-meta flex items-center gap-1.5 text-foreground-secondary transition-colors hover:text-accent"
        >
          <BackIcon />
          All posts
        </Link>
      </div>
    </article>
  );
}
