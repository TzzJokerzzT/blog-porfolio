import type { Metadata } from 'next';
import LibraryShowcase from "./LibraryShowcase";

export const metadata: Metadata = {
  title: "Component Library",
  description:
    "A live showcase of every reusable UI component in this design system — buttons, animations, typewriter effects, dividers, and theme toggles.",
};

export default function LibraryPage() {
  return <LibraryShowcase />;
}
