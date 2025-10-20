import { cn } from "@/shared/lib";
import { IconProps, sizeClasses, variantClasses } from "./Icon.types";

import BookIconSvg from "@/assets/icon_book.svg";

/**
 * BookIcon 컴포넌트
 *
 * @param size - 아이콘 크기 (sm, md, lg)
 * @param variant - 아이콘 색상 변형 (default, primary, secondary)
 * @param className - 추가 CSS 클래스
 * @param props - SVG 요소의 기본 속성들
 */
export function BookIcon({
  size = "lg",
  variant = "default",
  className,
  ...props
}: IconProps) {
  return (
    <BookIconSvg
      className={cn(sizeClasses[size], variantClasses[variant], className)}
      aria-label="Book icon"
      {...props}
    />
  );
}
