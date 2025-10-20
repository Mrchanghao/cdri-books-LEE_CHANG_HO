"use client";

import Image from "next/image";

import { useImageLazyLoading } from "../../model/useImageLazyLoading";
import { createBlurDataURLBySize } from "@/shared/lib";
import { LikeIcon, UnlikeIcon } from "@/shared/ui/icons";
import type { BookThumbnailProps } from "./BookThumbnail.types.ts";
import {
  sizeClasses,
  imageSizes,
  skeletonClasses,
} from "./BookThumbnail.variants";

/**
 * 도서 썸네일을 표시하는 재사용 가능한 컴포넌트
 *
 * @description
 * - 다양한 크기 지원 (sm, md, lg)
 * - Lazy loading과 skeleton loading 지원
 * - 이미지가 없을 때 플레이스홀더 표시
 * - Next.js Image 최적화 적용
 * - Intersection Observer를 통한 성능 최적화
 */
export function BookThumbnail({
  src,
  alt,
  size = "sm",
  className = "",
  priority = false,
  placeholder = "empty",
  blurDataURL,
  isFavorite = false,
  showFavoriteIcon = false,
  onToggleFavorite,
}: BookThumbnailProps) {
  // Custom hook을 사용하여 이미지 로딩 로직 분리
  const {
    imgRef,
    handleLoad,
    handleError,
    shouldShowSkeleton,
    shouldShowImage,
    shouldShowPlaceholder,
  } = useImageLazyLoading({
    src,
    priority,
    placeholder,
    blurDataURL,
  });

  // 크기별 blur placeholder 생성 (shared lib 유틸리티 사용)
  const createBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    return createBlurDataURLBySize(size);
  };

  return (
    <div
      ref={imgRef}
      className={`relative ${sizeClasses[size]} shrink-0 overflow-hidden rounded ${className}`}
    >
      {/* Skeleton Loading */}
      {shouldShowSkeleton && (
        <div
          className={`absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 ${skeletonClasses[size]}`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-gray-400" />
          </div>
        </div>
      )}

      {/* Image */}
      {shouldShowImage && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes[size]}
          className="object-cover transition-opacity duration-300"
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={placeholder === "blur" ? createBlurDataURL() : undefined}
        />
      ) : shouldShowPlaceholder ? (
        /* No Image Placeholder */
        <div className="flex h-full w-full items-center justify-center bg-brand-neutral text-brand-dark text-xs">
          <div className="flex flex-col items-center gap-1">
            <div className="h-4 w-4 rounded bg-gray-400" />
            <span className="text-xs">No Image</span>
          </div>
        </div>
      ) : null}

      {/* Loading Indicator */}
      {!imgRef.current && !priority && (
        <div className="flex h-full w-full items-center justify-center bg-gray-100">
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary" />
        </div>
      )}

      {/* 즐겨찾기 아이콘 */}
      {showFavoriteIcon && (
        <button
          onClick={onToggleFavorite}
          className="absolute top-1 right-1 z-10 flex h-6 w-6 items-center justify-center rounded-full  transition-all duration-200 hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1"
          aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
          type="button"
        >
          {isFavorite ? (
            <LikeIcon size={"md"} className="text-white drop-shadow-sm" />
          ) : (
            <UnlikeIcon size={"md"} className="text-white drop-shadow-sm" />
          )}
        </button>
      )}
    </div>
  );
}
