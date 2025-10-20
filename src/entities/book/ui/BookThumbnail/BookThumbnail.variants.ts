import type { BookThumbnailSize } from "./BookThumbnail.types";

/**
 * BookThumbnail 컴포넌트의 스타일 variants
 */

export const sizeClasses: Record<BookThumbnailSize, string> = {
  sm: "h-[68px] w-12",
  lg: "h-[280px] w-[210px]",
};

export const imageSizes: Record<BookThumbnailSize, string> = {
  sm: "48px",
  lg: "210px",
};

export const skeletonClasses: Record<BookThumbnailSize, string> = {
  sm: "h-[68px] w-12",
  lg: "h-[280px] w-[210px]",
};
