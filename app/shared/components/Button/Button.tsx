"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getVariant, getRadius, getSize } from "./helper";
import { ButtonProps } from "./types";

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const Button = ({
  ariaLabel,
  children,
  className = "",
  color = "default",
  disabled = false,
  size = "md",
  radius = "md",
  type = "button",
  variant = "solid",
  fullWidth = false,
  isIconOnly = false,
  isLoading = false,
  startContent,
  endContent,
  spinner,
  disableAnimation = false,
  href,
  target,
  rel,
  onClick,
  "data-testid": dataTestId,
}: ButtonProps) => {
  const baseClasses = [
    "inline-flex items-center justify-center font-medium",
    "transition-all duration-200 ease-out",
    `focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-${color}`,
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    !disableAnimation && "active:scale-95",
    fullWidth && "w-full",
    getVariant(color, variant),
    getRadius(radius),
    getSize(size, isIconOnly),
  ]
    .filter(Boolean)
    .join(" ");

  const content = isLoading ? (
    <>
      {spinner || <Spinner />}
      {!isIconOnly && <span className="ml-2">Loading...</span>}
    </>
  ) : (
    <>
      {startContent && <span className="mr-2">{startContent}</span>}
      {children}
      {endContent && <span className="ml-2">{endContent}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel}>
        <motion.span
          role="button"
          aria-label={ariaLabel}
          className={`${baseClasses} ${className}`}
          data-testid={dataTestId}
          whileHover={disableAnimation ? undefined : { scale: 1.05 }}
          whileTap={disableAnimation ? undefined : { scale: 0.95 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      type={type}
      data-testid={dataTestId}
      whileHover={disableAnimation ? undefined : { scale: 1.05 }}
      whileTap={disableAnimation ? undefined : { scale: 0.95 }}
    >
      {content}
    </motion.button>
  );
};
