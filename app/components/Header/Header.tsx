"use client";

import { Button } from "@/shared/components/Button/Button";
import { ThemeToggle } from "@/shared/components/ThemeToggle";
import { motion } from "motion/react";
import Link from "next/link";

const navLinks = [
  { name: "Experience", href: "/experience" },
  { name: "Blog", href: "/blog" },
  { name: "Library", href: "/library" },
];

export function Header() {
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
            <ThemeToggle variant="dropdown" />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
