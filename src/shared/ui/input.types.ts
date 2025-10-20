export type { InputProps } from './input';

export const inputVariants = {
  variant: {
    default: "default",
    error: "error",
    success: "success",
  } as const,
  size: {
    sm: "sm",
    md: "md",
    lg: "lg", 
  } as const,
};

export const inputDefaultProps = {
  variant: "default" as const,
  size: "md" as const,
};
