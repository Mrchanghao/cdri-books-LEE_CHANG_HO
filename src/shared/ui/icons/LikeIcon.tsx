import React from "react";
import LikeIconSvg from "@/assets/Like.svg";
import { cn } from "@/shared/lib";
import { IconProps, sizeClasses, variantClasses } from "./Icon.types";

export function LikeIcon({
  size = "md",
  variant = "default",
  className,
  ...props
}: IconProps) {
  return (
    <LikeIconSvg
      className={cn(sizeClasses[size], variantClasses[variant], className)}
      aria-label="Like icon"
      {...props}
    />
  );
}
