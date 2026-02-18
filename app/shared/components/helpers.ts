// Sizes are now handled in individual component helpers
// This file can be used for shared utilities across components
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};
