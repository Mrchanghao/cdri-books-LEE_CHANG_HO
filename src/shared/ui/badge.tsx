import * as React from "react";
import { cn } from "@/shared/lib";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-brand-primary text-brand-white hover:bg-brand-primary/80",
  secondary: "bg-gray-100 text-brand-dark hover:bg-gray-200",
  destructive: "bg-brand-error text-brand-white hover:bg-brand-error/80",
  outline: "border border-brand-neutral text-brand-dark",
  success: "bg-green-100 text-green-800 hover:bg-green-200",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1.5 text-sm",
  lg: "px-3 py-2 text-base",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
