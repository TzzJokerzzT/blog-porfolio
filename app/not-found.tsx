import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell py-24">
      <p className="ui-meta text-foreground-secondary">404</p>
      <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-3 max-w-[52ch] text-foreground-secondary">
        The link may be out of date, or the post may have been removed.
      </p>
      <Link
        href="/blog"
        className="ui-meta mt-8 inline-block text-accent underline decoration-divider underline-offset-4 hover:decoration-accent"
      >
        Read the posts
      </Link>
    </div>
  );
}
