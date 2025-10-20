"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createBlurDataURL } from "@/shared/lib";

export interface UseImageLazyLoadingProps {
  src?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface UseImageLazyLoadingReturn {
  isLoaded: boolean;
  isInView: boolean;
  hasError: boolean;

  imgRef: React.RefObject<HTMLDivElement>;

  handleLoad: () => void;
  handleError: () => void;
  generateBlurDataURL: () => string;

  shouldShowSkeleton: boolean;
  shouldShowImage: boolean;
  shouldShowPlaceholder: boolean;
}

/**
 *
 * @description
 * - Intersection Observer를 사용한 lazy loading
 * - 이미지 로딩 상태 (loading, loaded, error)
 * - Skeleton loading UI
 */
export function useImageLazyLoading({
  src,
  priority = false,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  placeholder = "blur",
  blurDataURL,
  onLoad,
  onError,
}: UseImageLazyLoadingProps): UseImageLazyLoadingReturn {
  // 이미지 로딩
  const [isLoaded, setIsLoaded] = useState(false);

  // 뷰포트 내 이미지 상태 (lazy loading용)
  const [isInView, setIsInView] = useState(priority);

  // 이미지 로딩 에러
  const [hasError, setHasError] = useState(false);

  // 이미지 컨테이너 ref
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer 로직
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 이미지가 뷰포트 내에 있을 때 lazy loading 처리
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );
    // 이미지 컨테이너 ref 관찰
    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // 이미지 로드 핸들러
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // 이미지 로드 에러 핸들러
  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
    onError?.();
  }, [onError]);

  // Blur 데이터 URL 생성
  const generateBlurDataURL = useCallback(() => {
    if (blurDataURL) return blurDataURL;

    // 기본 캔버스 크기 결정)
    return createBlurDataURL({
      width: 96,
      height: 128,
    });
  }, [blurDataURL]);

  // 계산된 상태들
  const shouldShowSkeleton: boolean = (!isLoaded &&
    isInView &&
    src &&
    !hasError) as boolean;
  const shouldShowImage: boolean = (isInView && src && !hasError) as boolean;
  const shouldShowPlaceholder = hasError || !src;

  return {
    // 상태
    isLoaded,
    isInView,
    hasError,

    // 참조
    imgRef,

    handleLoad,
    handleError,
    generateBlurDataURL,

    shouldShowSkeleton,
    shouldShowImage,
    shouldShowPlaceholder,
  };
}
