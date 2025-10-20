import * as React from "react";
import { cn } from "@/shared/lib";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
}

/**
 *
 * @description
 * - 기본 카드 컴포넌트
 * - 카드 변형 지원 (default, outlined, elevated)
 * - 카드 헤더, 카드 콘텐츠, 카드 푸터 컴포넌트를 제공
 */

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4", className)}
      {...props}
    />
  )
);

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-brand-white border border-brand-neutral",
      outlined: "bg-brand-white border-2 border-brand-neutral",
      elevated: "bg-brand-white shadow-lg border border-brand-neutral",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-lg p-6", variantClasses[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardContent.displayName = "CardContent";

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardContent, CardFooter };
