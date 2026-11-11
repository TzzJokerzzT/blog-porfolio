import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { LayoutProps } from "./types";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Header />

      <main id="content" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
