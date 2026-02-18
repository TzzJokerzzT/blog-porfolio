import { useEffect } from 'react';
import { useThemeStore } from '../stores/themeStore';

export const useTheme = () => {
  const { theme, resolvedTheme, setTheme, toggleTheme, updateSystemTheme } = useThemeStore();

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      updateSystemTheme(e.matches ? 'dark' : 'light');
    };

    // Listener para cambios en el tema del sistema
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [updateSystemTheme]);

  // Aplicar tema inicial después de la hidratación (para SSR)
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    updateSystemTheme(systemTheme);
  }, [updateSystemTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    // Helper para saber si el tema actual es oscuro
    isDark: resolvedTheme === 'dark',
    // Helper para saber si estamos usando el tema del sistema
    isSystemTheme: theme === 'system',
  };
};