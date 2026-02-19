import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { LayoutProps } from "./types";

const AnimatedBackground = dynamic(
  () =>
    import("@/shared/components/AnimatedBackground/AnimatedBackground").then(
      (mod) => mod.AnimatedBackground
    )
);

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AnimatedBackground />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10 flex-1">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
