"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PostList } from "./components/PostList";
import { postsApi } from "@/shared/services/api.service";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Post } from "@/shared/types/api.types";

export function Blog() {
  const { isAuthenticated } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params =
        selectedCategory !== "All"
          ? { category: selectedCategory, limit: 50 }
          : { limit: 50 };

      const res = await postsApi.getAll(params);
      const fetchedPosts = res.data.posts;
      setPosts(fetchedPosts);

      // Reconstruir lista de categorías solo en la carga inicial (All)
      if (selectedCategory === "All") {
        const unique = [
          "All",
          ...Array.from(new Set(fetchedPosts.map((p) => p.category))),
        ];
        setCategories(unique);
      }
    } catch {
      setError("Couldn't load posts.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="page-shell py-16">
      <header className="enter">
        <h1 className="font-serif text-[clamp(2rem,5vw,2.75rem)] font-medium leading-tight tracking-tight text-foreground">
          Writing
        </h1>
        <p className="mt-3 max-w-[58ch] text-foreground-secondary">
          Notes on frontend development, React, Next.js, and the tools I use
          every day.
        </p>
        {isAuthenticated && (
          <Link
            href="/blog/crear"
            className="ui-meta mt-4 inline-block text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
          >
            New post
          </Link>
        )}
      </header>

      {categories.length > 1 && (
        <nav
          aria-label="Filter by category"
          className="ui-meta mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-divider pb-3"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isSelected}
                className={`inline-flex h-9 cursor-pointer items-center transition-colors ${
                  isSelected
                    ? "font-medium text-accent underline decoration-2 underline-offset-4"
                    : "text-foreground-secondary hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      )}

      {isLoading && (
        <>
          <span role="status" className="sr-only">
            Loading posts…
          </span>
          <ul aria-hidden="true" className="divide-y divide-divider">
            {[0, 1, 2].map((row) => (
              <li
                key={row}
                className="py-5 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-x-8"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-3 space-y-2 sm:mt-0">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {!isLoading && error && (
        <div className="py-10">
          <p className="text-foreground">{error}</p>
          <button
            type="button"
            onClick={fetchPosts}
            className="ui-meta mt-2 cursor-pointer text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="py-10">
          <p className="text-foreground-secondary">
            {selectedCategory === "All"
              ? "No posts yet."
              : `No posts in ${selectedCategory} yet.`}
          </p>
          {isAuthenticated && selectedCategory === "All" && (
            <Link
              href="/blog/crear"
              className="ui-meta mt-2 inline-block text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
            >
              Write the first one
            </Link>
          )}
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && <PostList posts={posts} />}
    </div>
  );
}
