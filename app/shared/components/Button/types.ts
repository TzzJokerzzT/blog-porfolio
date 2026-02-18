export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isLoading?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  spinner?: React.ReactNode;
  disableAnimation?: boolean;
  "data-testid"?: string;
}
