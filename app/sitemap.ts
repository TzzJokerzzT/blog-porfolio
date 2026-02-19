import type { MetadataRoute } from "next";
import { blogPosts } from "@/features/Blog/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = blogPosts.map((post) => ({
    url: `https://alexisbuelvas.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: "https://alexisbuelvas.dev", lastModified: new Date() },
    { url: "https://alexisbuelvas.dev/blog", lastModified: new Date() },
    { url: "https://alexisbuelvas.dev/experience", lastModified: new Date() },
    { url: "https://alexisbuelvas.dev/library", lastModified: new Date() },
    ...blogEntries,
  ];
}
