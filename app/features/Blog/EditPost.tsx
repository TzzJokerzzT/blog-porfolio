"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
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
    "w-full px-4 py-3 rounded-lg bg-input border border-divider text-foreground placeholder:text-foreground-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-foreground mb-2";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            href={`/blog/${post.slug}`}
            variant="ghost"
            color="default"
            radius="lg"
            size="sm"
            className="mb-6"
          >
            ← Volver al Post
          </Button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Editar Post
              </h1>
              <p className="text-foreground-secondary">
                Modifica los campos que deseas actualizar.
              </p>
            </div>
            <Button
              type="button"
              color="default"
              variant="bordered"
              radius="lg"
              size="md"
              onClick={() => setShowDeleteConfirm(true)}
              className="text-red-500 border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
            >
              Eliminar Post
            </Button>
          </div>
        </motion.div>

        {/* Error global */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="mb-6 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal confirmación de borrado */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-full max-w-sm p-6 rounded-xl bg-background border border-divider shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-2">
                  ¿Eliminar este post?
                </h2>
                <p className="text-foreground-secondary text-sm mb-6">
                  Esta acción es irreversible. El post{" "}
                  <span className="font-medium text-foreground">
                    &ldquo;{post.title}&rdquo;
                  </span>{" "}
                  será eliminado permanentemente.
                </p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    color="default"
                    variant="bordered"
                    radius="lg"
                    size="md"
                    fullWidth
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    color="default"
                    variant="solid"
                    radius="lg"
                    size="md"
                    fullWidth
                    isLoading={isDeleting}
                    disabled={isDeleting}
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Sí, eliminar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <motion.form
          className="space-y-6 p-8 rounded-xl bg-background/80 backdrop-blur-sm border border-divider"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Título */}
          <div>
            <label htmlFor="title" className={labelClass}>
              Título *
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
            {fieldErrors.title && (
              <p className={errorClass}>{fieldErrors.title}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug *{" "}
              <span className="text-foreground-secondary/60 font-normal">
                (URL del post)
              </span>
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
            {fieldErrors.slug && (
              <p className={errorClass}>{fieldErrors.slug}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className={labelClass}>
              Resumen *
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

          {/* Contenido */}
          <div>
            <label htmlFor="content" className={labelClass}>
              Contenido *{" "}
              <span className="text-foreground-secondary/60 font-normal">
                (Markdown: ## Heading, - lista)
              </span>
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
              <p className="mt-1 text-xs text-foreground-secondary/60">
                Tiempo estimado: {estimateReadTime(content)}
              </p>
            )}
            {fieldErrors.content && (
              <p className={errorClass}>{fieldErrors.content}</p>
            )}
          </div>

          {/* Categoría + Fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={labelClass}>
                Categoría *
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
                Fecha *
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
              {fieldErrors.date && (
                <p className={errorClass}>{fieldErrors.date}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className={labelClass}>
              Tags{" "}
              <span className="text-foreground-secondary/60 font-normal">
                (separados por coma)
              </span>
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

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              className="w-4 h-4 rounded border-divider text-primary-500 focus:ring-primary-500 focus:ring-offset-0 accent-primary-500 cursor-pointer"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label
              htmlFor="featured"
              className="text-sm text-foreground cursor-pointer select-none"
            >
              Marcar como post destacado
            </label>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              color="primary"
              variant="solid"
              size="md"
              radius="lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
              Guardar cambios
            </Button>
            <Button
              type="button"
              color="default"
              variant="ghost"
              size="md"
              radius="lg"
              href={`/blog/${post.slug}`}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
