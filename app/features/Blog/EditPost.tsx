"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/Button/Button";
import { postsApi } from "@/shared/services/api.service";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Post } from "@/shared/types/api.types";

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

interface EditPostProps {
  post: Post;
}

export function EditPost({ post }: EditPostProps) {
  const router = useRouter();
  const { accessToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [content, setContent] = useState(post.content);
  const [date, setDate] = useState(post.date);
  const [category, setCategory] = useState(post.category);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [featured, setFeatured] = useState(post.featured);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!accessToken) {
      setError("Debes iniciar sesión para editar un post.");
      return;
    }

    setIsLoading(true);
    try {
      const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        slug,
        title,
        excerpt,
        content,
        date,
        readTime: estimateReadTime(content),
        tags: tagsArray,
        category,
        featured,
      };

      const res = await postsApi.update(post.id, payload, accessToken);
      router.push(`/blog/${res.data.slug}`);
    } catch (err: unknown) {
      const apiErr = err as Error & {
        status?: number;
        errors?: { field: string; message: string }[];
      };

      if (apiErr.errors && apiErr.errors.length > 0) {
        const mapped: Record<string, string> = {};
        apiErr.errors.forEach(({ field, message }) => {
          mapped[field] = message;
        });
        setFieldErrors(mapped);
      } else if (apiErr.status === 409) {
        setFieldErrors({ slug: "Ya existe un post con este slug." });
      } else if (apiErr.status === 403) {
        setError("No tienes permiso para editar este post.");
      } else if (apiErr.status === 401) {
        setError("Tu sesión expiró. Inicia sesión de nuevo.");
      } else {
        setError(apiErr.message ?? "Ocurrió un error al guardar los cambios.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!accessToken) return;
    setIsDeleting(true);
    try {
      await postsApi.delete(post.id, accessToken);
      router.push("/blog");
    } catch (err: unknown) {
      const apiErr = err as Error & { status?: number };
      if (apiErr.status === 403) {
        setError("No tienes permiso para eliminar este post.");
      } else if (apiErr.status === 401) {
        setError("Tu sesión expiró. Inicia sesión de nuevo.");
      } else {
        setError(apiErr.message ?? "Ocurrió un error al eliminar el post.");
      }
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };
  const inputClass =
    "w-full rounded-md border border-divider bg-input px-3 py-2.5 text-foreground placeholder:text-foreground-secondary/60 transition-colors focus:outline-none focus:border-accent";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";
  const hintClass = "font-normal text-foreground-secondary";
  const errorClass = "mt-1.5 text-sm text-danger-600";

  return (
    <div className="page-shell py-16">
      <Link
        href="/blog"
        className="ui-meta text-foreground-secondary transition-colors hover:text-accent"
      >
        All posts
      </Link>

      <header className="enter mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[clamp(2rem,5vw,2.6rem)] font-medium leading-tight tracking-tight text-foreground">
            Edit post
          </h1>
          <p className="mt-3 max-w-[58ch] text-foreground-secondary">
            Changes go live as soon as you save them.
          </p>
        </div>
        <Button
          type="button"
          color="danger"
          variant="bordered"
          radius="md"
          size="sm"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete post
        </Button>
      </header>

      {error && (
        <div
          role="alert"
          className="mt-8 rounded-md border border-danger-300 bg-danger-50 px-4 py-3 text-sm text-danger-700"
        >
          {error}
        </div>
      )}

      <form className="mt-10 space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title" className={labelClass}>
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {fieldErrors.title && <p className={errorClass}>{fieldErrors.title}</p>}
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug * <span className={hintClass}>(post URL)</span>
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            className={inputClass}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
          {fieldErrors.slug && <p className={errorClass}>{fieldErrors.slug}</p>}
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>
            Summary *
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            className={`${inputClass} resize-none`}
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            maxLength={500}
            required
          />
          {fieldErrors.excerpt && (
            <p className={errorClass}>{fieldErrors.excerpt}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className={labelClass}>
            Content * <span className={hintClass}>(Markdown: ## heading, - list)</span>
          </label>
          <textarea
            id="content"
            name="content"
            className={`${inputClass} resize-y font-mono text-sm`}
            rows={16}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          {content && (
            <p className="ui-meta mt-1.5 text-foreground-secondary">
              Estimated read time: {estimateReadTime(content)}
            </p>
          )}
          {fieldErrors.content && (
            <p className={errorClass}>{fieldErrors.content}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={labelClass}>
              Category *
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            {fieldErrors.category && (
              <p className={errorClass}>{fieldErrors.category}</p>
            )}
          </div>
          <div>
            <label htmlFor="date" className={labelClass}>
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className={inputClass}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            {fieldErrors.date && <p className={errorClass}>{fieldErrors.date}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags <span className={hintClass}>(comma separated)</span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            className={inputClass}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-divider accent-accent"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <label
            htmlFor="featured"
            className="cursor-pointer select-none text-sm text-foreground"
          >
            Mark as featured
          </label>
        </div>

        <div className="flex items-center gap-3 border-t border-divider pt-6">
          <Button
            type="submit"
            color="primary"
            variant="solid"
            radius="md"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save changes
          </Button>
          <Button
            type="button"
            color="default"
            variant="bordered"
            radius="md"
            href={`/blog/${post.slug}`}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-default-950/50 p-4"
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowDeleteConfirm(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-post-title"
            className="w-full max-w-sm rounded-lg border border-divider bg-background p-6"
          >
            <h2
              id="delete-post-title"
              className="font-serif text-xl font-medium text-foreground"
            >
              Delete this post?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
              This can&apos;t be undone. &ldquo;{post.title}&rdquo; will be
              removed permanently.
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                type="button"
                color="default"
                variant="bordered"
                radius="md"
                fullWidth
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                color="danger"
                variant="solid"
                radius="md"
                fullWidth
                isLoading={isDeleting}
                disabled={isDeleting}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
