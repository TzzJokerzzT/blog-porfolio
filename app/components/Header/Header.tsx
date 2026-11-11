"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { useAuth } from "@/shared/hooks/useAuth";
import data from "@/shared/data/data.json";

const navLinks = [{ name: "Blog", href: "/blog" }];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-divider bg-background/90 backdrop-blur-sm">
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-foreground transition-colors hover:text-accent"
        >
          {data.basics.name}
        </Link>

        <nav aria-label="Main" className="ui-meta flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="inline-flex h-11 items-center text-foreground-secondary transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && user ? (
            <>
              <span className="hidden text-foreground-secondary sm:inline">
                {user.name}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex h-11 cursor-pointer items-center text-foreground-secondary transition-colors hover:text-accent"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-11 items-center text-foreground-secondary transition-colors hover:text-accent"
            >
              Sign in
            </Link>
          )}

          <ThemeToggle variant="icon" />
        </nav>
      </div>
    </header>
  );
}
