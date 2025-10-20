import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/shared/lib";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-brand-primary text-brand-white hover:bg-brand-primary/90 shadow-sm",
  outline:
    "border border-brand-neutral bg-brand-white hover:bg-gray-50 hover:text-brand-dark",
  secondary: "bg-gray-100 text-brand-dark hover:bg-gray-200",
  ghost: "hover:bg-gray-100 hover:text-brand-dark",
  destructive:
    "bg-brand-error text-brand-white hover:bg-brand-error/90 shadow-sm",
  link: "text-brand-primary underline-offset-4 hover:underline p-0 h-auto",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-10 rounded-md px-4 py-2",
  lg: "h-12 rounded-md px-8 text-lg",
  icon: "h-10 w-10 rounded-md p-0",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Component
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Component>
    );
  }
);
Button.displayName = "Button";

export { Button };
