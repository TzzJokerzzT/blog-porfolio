import type { Metadata } from "next";
import { postsApi } from "@/shared/services/api.service";
import { BlogPostView } from "@/view/BlogPostView";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await postsApi.getBySlug(slug);
    const post = res.data;
    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const res = await postsApi.getBySlug(slug);
    return <BlogPostView post={res.data} />;
  } catch {
    notFound();
  }
}
