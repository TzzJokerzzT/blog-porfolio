"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/shared/components/Button/Button";
import { postsApi } from "@/shared/services/api.service";
import { useAuth } from "@/shared/hooks/useAuth";

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function CreatePost() {
  const router = useRouter();
  const { accessToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === toSlug(title)) {
      setSlug(toSlug(value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!accessToken) {
      setError("Debes iniciar sesión para crear un post.");
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

      const res = await postsApi.create(payload, accessToken);
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
      } else if (apiErr.status === 401) {
        setError("Tu sesión expiró. Inicia sesión de nuevo.");
      } else {
        setError(apiErr.message ?? "Ocurrió un error al crear el post.");
      }
    } finally {
      setIsLoading(false);
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
            href="/blog"
            variant="ghost"
            color="default"
            radius="lg"
            size="sm"
            className="mb-6"
          >
            ← Volver al Blog
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Crear nuevo post
          </h1>
          <p className="text-foreground-secondary">
            Completa todos los campos para publicar un nuevo artículo.
          </p>
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
              onChange={(e) => handleTitleChange(e.target.value)}
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
              Publicar post
            </Button>
            <Button
              type="button"
              color="default"
              variant="ghost"
              size="md"
              radius="lg"
              href="/blog"
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
