"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Componente para renderizar solo en el cliente (evita hydration mismatch)
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

interface ThemeAwareTextProps {
  lightText: string;
  darkText: string;
  className?: string;
}

// Componente específico para texto que cambia según el tema
export const ThemeAwareText = ({ lightText, darkText, className }: ThemeAwareTextProps) => {
  const { isDark } = useTheme();
  
  return (
    <ClientOnly fallback={<span className={className}>{lightText}</span>}>
      <span className={className}>
        {isDark ? darkText : lightText}
      </span>
    </ClientOnly>
  );
};