import Link from "next/link";
import type { Post } from "@/shared/types/api.types";

interface PostListProps {
  posts: Post[];
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function PostList({ posts }: PostListProps) {
  return (
    <ul className="divide-y divide-divider">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/blog/${post.slug}`}
            className="group block py-5 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-x-8"
          >
            <div className="ui-meta flex gap-3 text-foreground-secondary sm:block">
              <time dateTime={post.date} className="tabular">
                {formatDate(post.date)}
              </time>
              <span className="tabular sm:mt-0.5 sm:block">{post.readTime}</span>
            </div>

            <div className="mt-1 sm:mt-0">
              <h3 className="font-serif text-[1.3rem] font-medium leading-snug text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="mt-1.5 line-clamp-2 text-[0.95rem] leading-relaxed text-foreground-secondary">
                  {post.excerpt}
                </p>
              )}
              {post.category && (
                <p className="ui-meta mt-2 text-foreground-secondary">
                  {post.category}
                </p>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
