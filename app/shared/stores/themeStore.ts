import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  updateSystemTheme: (systemTheme: ResolvedTheme) => void;
}

// Función para detectar el tema del sistema
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Función para resolver el tema actual
const resolveTheme = (theme: Theme, systemTheme: ResolvedTheme): ResolvedTheme => {
  return theme === 'system' ? systemTheme : theme;
};

// Función para aplicar el tema al documento (solo en cliente)
const applyTheme = (resolvedTheme: ResolvedTheme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Usar requestAnimationFrame para evitar conflictos de hydratación
  requestAnimationFrame(() => {
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  });
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => {
      const initialSystemTheme = getSystemTheme();
      
      return {
        theme: 'system',
        resolvedTheme: initialSystemTheme,
        systemTheme: initialSystemTheme,
        
        setTheme: (theme: Theme) => {
          const { systemTheme } = get();
          const resolvedTheme = resolveTheme(theme, systemTheme);
          
          set({ theme, resolvedTheme });
          applyTheme(resolvedTheme);
        },
        
        toggleTheme: () => {
          const { theme } = get();
          const themes: Theme[] = ['light', 'dark', 'system'];
          const currentIndex = themes.indexOf(theme);
          const nextTheme = themes[(currentIndex + 1) % themes.length];
          
          get().setTheme(nextTheme);
        },
        
        updateSystemTheme: (systemTheme: ResolvedTheme) => {
          const { theme } = get();
          const resolvedTheme = resolveTheme(theme, systemTheme);
          
          set({ systemTheme, resolvedTheme });
          applyTheme(resolvedTheme);
        },
      };
    },
    {
      name: 'theme-storage',
      // Solo persistir el theme seleccionado, no los temas resueltos
      partialize: (state) => ({ theme: state.theme }),
      
      // Reconfigurar el estado después de la hidratación
      onRehydrateStorage: () => (state) => {
        if (state) {
          const systemTheme = getSystemTheme();
          const resolvedTheme = resolveTheme(state.theme, systemTheme);
          
          state.systemTheme = systemTheme;
          state.resolvedTheme = resolvedTheme;
          
          applyTheme(resolvedTheme);
        }
      },
    }
  )
);