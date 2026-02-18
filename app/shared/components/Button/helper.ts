// Color variants usando el nuevo sistema de colores definido en globals.css
const colorClasses = {
  default: {
    solid: "bg-default-500 text-white hover:bg-default-600",
    bordered: "border-2 border-default-400 text-default-600 hover:bg-default-50",
    light: "bg-transparent text-default-600 hover:bg-default-50",
    flat: "bg-default-100 text-default-700 hover:bg-default-200",
    faded: "bg-default-50 text-default-700 hover:bg-default-100 border border-default-200",
    shadow: "bg-default-500 text-white hover:bg-default-600 shadow-lg shadow-default-500/25",
    ghost: "border-2 border-default-300 text-default-600 hover:bg-default-50",
  },
  primary: {
    solid: "bg-primary-500 text-white hover:bg-primary-600",
    bordered: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
    light: "bg-transparent text-primary-600 hover:bg-primary-50",
    flat: "bg-primary-100 text-primary-700 hover:bg-primary-200",
    faded: "bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200",
    shadow: "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25",
    ghost: "border-2 border-primary-500 text-primary-600 hover:text-white hover:bg-primary-500",
  },
  secondary: {
    solid: "bg-secondary-500 text-white hover:bg-secondary-600",
    bordered: "border-2 border-secondary-400 text-secondary-600 hover:bg-secondary-50",
    light: "bg-transparent text-secondary-600 hover:bg-secondary-50",
    flat: "bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
    faded: "bg-secondary-50 text-secondary-700 hover:bg-secondary-100 border border-secondary-200",
    shadow: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg shadow-secondary-500/25",
    ghost: "border-2 border-secondary-400 text-secondary-600 hover:bg-secondary-50",
  },
  success: {
    solid: "bg-success-500 text-white hover:bg-success-600",
    bordered: "border-2 border-success-500 text-success-600 hover:bg-success-50",
    light: "bg-transparent text-success-600 hover:bg-success-50",
    flat: "bg-success-100 text-success-700 hover:bg-success-200",
    faded: "bg-success-50 text-success-700 hover:bg-success-100 border border-success-200",
    shadow: "bg-success-500 text-white hover:bg-success-600 shadow-lg shadow-success-500/25",
    ghost: "border-2 border-success-500 text-success-600 hover:text-white hover:bg-success-500",
  },
  warning: {
    solid: "bg-warning-500 text-white hover:bg-warning-600",
    bordered: "border-2 border-warning-500 text-warning-600 hover:bg-warning-50",
    light: "bg-transparent text-warning-600 hover:bg-warning-50",
    flat: "bg-warning-100 text-warning-700 hover:bg-warning-200",
    faded: "bg-warning-50 text-warning-700 hover:bg-warning-100 border border-warning-200",
    shadow: "bg-warning-500 text-white hover:bg-warning-600 shadow-lg shadow-warning-500/25",
    ghost: "border-2 border-warning-500 text-warning-600 hover:text-white hover:bg-warning-500",
  },
  danger: {
    solid: "bg-danger-500 text-white hover:bg-danger-600",
    bordered: "border-2 border-danger-500 text-danger-600 hover:bg-danger-50",
    light: "bg-transparent text-danger-600 hover:bg-danger-50",
    flat: "bg-danger-100 text-danger-700 hover:bg-danger-200",
    faded: "bg-danger-50 text-danger-700 hover:bg-danger-100 border border-danger-200",
    shadow: "bg-danger-500 text-white hover:bg-danger-600 shadow-lg shadow-danger-500/25",
    ghost: "border-2 border-danger-500 text-danger-600 hover:text-white hover:bg-danger-500",
  },
};

export const getVariant = (
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger",
  variant: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost"
) => {
  return colorClasses[color]?.[variant] || colorClasses.default.solid;
};

export const getRadius = (radius: "none" | "sm" | "md" | "lg" | "full") => {
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  return radiusClasses[radius] || radiusClasses.md;
};

export const getSize = (size: "sm" | "md" | "lg", isIconOnly?: boolean) => {
  if (isIconOnly) {
    return {
      sm: "h-8 w-8 min-w-8 text-sm",
      md: "h-10 w-10 min-w-10 text-base",
      lg: "h-12 w-12 min-w-12 text-lg",
    }[size];
  }
  
  return {
    sm: "h-8 px-3 text-sm min-w-16",
    md: "h-10 px-4 text-base min-w-20",
    lg: "h-12 px-6 text-lg min-w-24",
  }[size];
};