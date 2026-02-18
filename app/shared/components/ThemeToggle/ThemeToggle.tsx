import { useTheme } from "../../hooks/useTheme";
import { Button } from "../Button/Button";

// Iconos SVG para cada tema
const SunIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const SystemIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

interface ThemeToggleProps {
  variant?: "icon" | "button" | "dropdown";
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle = ({
  variant = "icon",
  showLabel = false,
  className = "",
}: ThemeToggleProps) => {
  const { theme, toggleTheme, setTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon />;
      case "dark":
        return <MoonIcon />;
      case "system":
        return <SystemIcon />;
      default:
        return <SystemIcon />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Claro";
      case "dark":
        return "Oscuro";
      case "system":
        return "Sistema";
      default:
        return "Sistema";
    }
  };

  if (variant === "dropdown") {
    return (
      <div className={`relative inline-block ${className}`}>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
          className="appearance-none bg-background border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="light">🌞 Claro</option>
          <option value="dark">🌙 Oscuro</option>
          <option value="system">💻 Sistema</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="bordered"
        size="md"
        onClick={toggleTheme}
        startContent={getThemeIcon()}
        className={className}
        ariaLabel={`Cambiar tema - actual: ${getThemeLabel()}`}
      >
        {showLabel && getThemeLabel()}
      </Button>
    );
  }

  // variant === 'icon' (por defecto)
  return (
    <Button
      variant="ghost"
      isIconOnly
      size="md"
      onClick={toggleTheme}
      className={className}
      ariaLabel={`Cambiar tema - actual: ${getThemeLabel()}`}
    >
      {getThemeIcon()}
    </Button>
  );
};

