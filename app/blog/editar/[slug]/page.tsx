"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/shared/hooks/useAuth";
import { postsApi } from "@/shared/services/api.service";
import { EditPost } from "@/features/Blog/EditPost";
import type { Post } from "@/shared/types/api.types";

export default function EditPostPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams<{ slug: string }>();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch post by slug
  useEffect(() => {
    if (!isAuthenticated || !params.slug) return;

    setIsLoading(true);
    postsApi
      .getBySlug(params.slug)
      .then((res) => setPost(res.data))
      .catch(() =>
        setError(
          "Couldn't load this post. It may be missing, or you may not have access.",
        ),
      )
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, params.slug]);

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="page-shell py-16">
        <span role="status" className="sr-only">
          Loading post…
        </span>
        <div
          aria-hidden="true"
          className="h-8 w-8 animate-spin rounded-full border-2 border-divider border-t-accent"
        />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-shell py-16">
        <p className="text-foreground-secondary">{error ?? "Post not found."}</p>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="ui-meta mt-2 cursor-pointer text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
        >
          All posts
        </button>
      </div>
    );
  }

  return <EditPost post={post} />;
}
