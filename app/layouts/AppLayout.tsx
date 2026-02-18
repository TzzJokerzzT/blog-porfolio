import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import {
  AnimatedBackground,
} from "@/shared/components/AnimatedBackground";
import { LayoutProps } from "./types";

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Animated Background */}
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
