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
      .catch(() => setError("No se encontró el post o no tienes acceso."))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, params.slug]);

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-foreground-secondary">
          {error ?? "Post no encontrado."}
        </p>
        <button
          type="button"
          onClick={() => router.push("/blog")}
          className="text-primary-500 hover:underline text-sm"
        >
          Volver al Blog
        </button>
      </div>
    );
  }

  return <EditPost post={post} />;
}
