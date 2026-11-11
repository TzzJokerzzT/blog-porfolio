"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PostList } from "@/features/Blog/components/PostList";
import { postsApi } from "@/shared/services/api.service";
import type { Post } from "@/shared/types/api.types";
import data from "@/shared/data/data.json";

const { name, label, summary, email, social } = data.basics;

const LATEST_POSTS_LIMIT = 5;

const elsewhere = [
  { name: "GitHub", href: social.github },
  { name: "LinkedIn", href: social.linkedin },
  { name: "X", href: social.twitter },
  { name: "Email", href: `mailto:${email}` },
];

export function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLatestPosts() {
      try {
        const res = await postsApi.getAll({ limit: LATEST_POSTS_LIMIT });
        if (!cancelled) setPosts(res.data.posts);
      } catch {
        if (!cancelled) setError("Couldn't load the latest posts.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadLatestPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page-shell py-16">
      <section className="enter">
        <h1 className="font-serif text-[clamp(2.25rem,6vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-foreground">
          {name}
        </h1>
        <p className="ui-meta mt-4 text-foreground-secondary">{label}</p>
        <p className="mt-6 max-w-[60ch] font-serif text-[1.1875rem] leading-[1.7] text-foreground">
          {summary}
        </p>
        <nav aria-label="Elsewhere" className="ui-meta mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {elsewhere.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground-secondary underline decoration-divider underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              {...(link.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </section>

      <section className="mt-16" aria-labelledby="latest-posts">
        <div className="flex items-baseline justify-between gap-4 border-b border-divider pb-3">
          <h2
            id="latest-posts"
            className="ui-meta font-medium text-foreground"
          >
            Latest posts
          </h2>
          <Link
            href="/blog"
            className="ui-meta text-foreground-secondary transition-colors hover:text-accent"
          >
            All posts
          </Link>
        </div>

        {isLoading && (
          <p role="status" className="ui-meta py-8 text-foreground-secondary">
            Loading posts…
          </p>
        )}

        {!isLoading && error && (
          <div className="py-8">
            <p className="text-foreground">{error}</p>
            <Link
              href="/blog"
              className="ui-meta mt-2 inline-block text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
            >
              Go to all posts
            </Link>
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <p className="py-8 text-foreground-secondary">
            Nothing published yet.
          </p>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <PostList posts={posts} />
        )}
      </section>
    </div>
  );
}
