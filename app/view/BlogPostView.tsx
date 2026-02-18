"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { BlogPost } from "@/features/Blog/data/posts";

interface BlogPostViewProps {
  post: BlogPost;
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-primary-500 transition-colors"
          >
            <svg
              className="w-4 h-4"
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
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              {post.category}
            </span>
            <span className="text-sm text-foreground-secondary">
              {post.readTime}
            </span>
          </div>

          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 text-foreground-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </motion.div>
        </motion.header>

        {/* Divider */}
        <motion.hr
          className="border-divider mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {paragraphs.map((paragraph: string, index: number) => {
            const trimmed = paragraph.trim();

            if (trimmed.startsWith("## ")) {
              return (
                <motion.h2
                  key={`heading-${index}`}
                  className="text-2xl sm:text-3xl font-bold text-foreground mt-10 mb-4"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {trimmed.replace("## ", "")}
                </motion.h2>
              );
            }

            if (trimmed.startsWith("- ")) {
              const items = trimmed
                .split("\n")
                .filter((l: string) => l.startsWith("- "));
              return (
                <ul key={`list-${index}`} className="space-y-2 ml-4">
                  {items.map((item: string, itemIndex: number) => (
                    <motion.li
                      key={`item-${index}-${itemIndex}`}
                      className="flex items-start gap-2 text-foreground-secondary leading-relaxed"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.1 }}
                    >
                      <motion.span
                        className="inline-block w-1.5 h-1.5 bg-primary-500 rounded-full mt-2.5 flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: itemIndex * 0.2,
                        }}
                      />
                      <span>{item.replace("- ", "")}</span>
                    </motion.li>
                  ))}
                </ul>
              );
            }

            return (
              <motion.p
                key={`para-${index}`}
                className="text-lg text-foreground-secondary leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
              >
                {trimmed}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Tags */}
        <motion.div
          className="mt-12 pt-8 border-t border-divider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string, tagIndex: number) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-default-100 dark:bg-default-800 text-default-700 dark:text-default-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-default"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: tagIndex * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Back to blog link at bottom */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-50 dark:bg-primary-950/50 rounded-full border border-primary-200 dark:border-primary-800 text-foreground hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
          >
            <svg
              className="w-4 h-4"
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
            Back to all posts
          </Link>
        </motion.div>
      </div>
    </article>
  );
}
