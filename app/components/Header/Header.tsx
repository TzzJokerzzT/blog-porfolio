"use client";

import { Button } from "@/shared/components/Button/Button";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { useAuth } from "@/shared/hooks/useAuth";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Experience", href: "/experience" },
  { name: "Blog", href: "/blog" },
  { name: "Library", href: "/library" },
];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-divider">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold text-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">Alex Portfolio</Link>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            {navLinks.map((link) => (
              <Button key={link.name} variant="ghost" radius="lg" href={link.href}>
                {link.name}
              </Button>
            ))}

            {isAuthenticated && user ? (
              <>
                <span className="hidden sm:block text-sm text-foreground-secondary px-2">
                  {user.name}
                </span>
                <Button
                  variant="bordered"
                  color="default"
                  radius="lg"
                  size="md"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button variant="ghost" radius="lg" href="/login">
                Login
              </Button>
            )}

            <ThemeToggle variant="dropdown" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
