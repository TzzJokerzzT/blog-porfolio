"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { BlogPost } from "../../data/posts";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        className="group relative bg-background/80 backdrop-blur-sm border border-divider rounded-xl p-6 hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 h-full flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.02,
          y: -4,
        }}
      >
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <motion.span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
            whileHover={{ scale: 1.05 }}
          >
            {post.category}
          </motion.span>
          <span className="text-sm text-foreground-secondary">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-500 transition-colors mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-foreground-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Footer: Tags & Read Time */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-divider">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-default-100 dark:bg-default-800 text-default-700 dark:text-default-300"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: tagIndex * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <span className="text-xs text-foreground-secondary whitespace-nowrap ml-2">
            {post.readTime}
          </span>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.article>
    </Link>
  );
}
