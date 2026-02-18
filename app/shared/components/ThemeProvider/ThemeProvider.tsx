"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Marcar como montado después de la hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Aplicar clase dark al HTML en el lado del cliente
  useEffect(() => {
    if (!mounted) return;
    
    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [resolvedTheme, mounted]);

  // Durante SSR y antes de montar, prevenir contenido que cause hydration mismatch
  if (!mounted) {
    return (
      <div suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};

