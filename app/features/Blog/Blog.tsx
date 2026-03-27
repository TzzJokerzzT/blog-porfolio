"use client";

import { motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { BlogCard } from "./components/BlogCard";
import { postsApi } from "@/shared/services/api.service";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/shared/components/Button/Button";
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
      setError("No se pudieron cargar los posts. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Blog
          </motion.h2>
          <motion.p
            className="text-xl text-foreground-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Thoughts, tutorials, and insights about web development, design
            patterns, and the technologies I work with daily.
          </motion.p>

          {/* Botón crear post solo para usuarios autenticados */}
          {isAuthenticated && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Button
                href="/blog/crear"
                color="primary"
                variant="solid"
                radius="lg"
                size="md"
              >
                + Crear Post
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-default-100 dark:bg-default-800 text-default-700 dark:text-default-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <motion.div
              className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-red-500 mb-4">{error}</p>
            <Button
              onClick={fetchPosts}
              color="primary"
              variant="bordered"
              radius="lg"
            >
              Reintentar
            </Button>
          </motion.div>
        )}

        {/* Posts Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {!isLoading && !error && posts.length === 0 && (
          <motion.p
            className="text-center text-foreground-secondary text-lg mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No se encontraron posts en esta categoría.
          </motion.p>
        )}
      </div>
    </section>
  );
}
