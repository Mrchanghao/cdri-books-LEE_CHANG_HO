import React from "react";
import UnlikeIconSvg from "@/assets/Unlike.svg";
import { IconProps, sizeClasses, variantClasses } from "./Icon.types";
import { cn } from "@/shared/lib";

export function UnlikeIcon({
  size = "md",
  variant = "default",
  className,
  ...props
}: IconProps) {
  return (
    <UnlikeIconSvg
      className={cn(sizeClasses[size], variantClasses[variant], className)}
      aria-label="Unlike icon"
      {...props}
    />
  );
}
