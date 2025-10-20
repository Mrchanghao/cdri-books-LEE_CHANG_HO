import * as React from "react";
import { cn } from "@/shared/lib";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "error" | "success";
  size?: "sm" | "md" | "lg";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
}

const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
  default:
    "border-brand-neutral focus:border-brand-primary focus:ring-brand-primary",
  error: "border-brand-error focus:border-brand-error focus:ring-brand-error",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
};

const sizeClasses: Record<NonNullable<InputProps["size"]>, string> = {
  sm: "h-8 px-2 py-1 text-xs",
  md: "h-10 px-10 py-2 text-sm",
  lg: "h-12 px-4 py-3 text-base",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant = "default",
      size = "md",
      leftIcon,
      rightIcon,
      helperText,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const hasError = variant === "error" || !!errorMessage;
    const actualVariant = hasError ? "error" : variant;

    return (
      <div className=" flex-1">
        <div className="relative">
          {leftIcon && (
            <div className="absolute rounded-lg left-3 top-1/2 -translate-y-1/2 font-semibold text-brand-dark pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex w-full rounded-lg border  bg-[#F2F4F6] text-brand-dark ",
              "placeholder:text-[#8D94A0] focus-visible:outline-none ",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-20",
              rightIcon && "pr-20",
              variantClasses[actualVariant],
              sizeClasses[size],
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || errorMessage) && (
          <p
            className={cn(
              "mt-1 text-xs",
              hasError ? "text-brand-error" : "text-gray-500"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
