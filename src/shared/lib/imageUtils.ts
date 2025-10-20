/**
 * 이미지 관련 유틸리티 함수들
 *
 * @description
 * - Blur placeholder 생성
 * - 이미지 최적화 관련 헬퍼 함수들
 * - 재사용 가능한 이미지 처리 로직
 */

export interface BlurDataURLOptions {
  width: number;
  height: number;
  gradient?: {
    start: string;
    middle: string;
    end: string;
  };
}

/**
 * Canvas를 이용하여 blur placeholder 데이터 URL을 생성합니다.
 *
 * @param options - Blur 데이터 URL 생성 옵션
 * @returns Base64로 인코딩된 데이터 URL
 *
 * @example
 * ```typescript
 * const blurURL = createBlurDataURL({
 *   width: 96,
 *   height: 128,
 *   gradient: {
 *     start: "#f3f4f6",
 *     middle: "#e5e7eb",
 *     end: "#f3f4f6"
 *   }
 * });
 * ```
 */
export function createBlurDataURL(options: BlurDataURLOptions): string {
  const { width, height, gradient } = options;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.warn("Canvas context not available for blur data URL generation");
    return "";
  }

  canvas.width = width;
  canvas.height = height;

  // 기본 그라데이션 색상
  const defaultGradient = {
    start: "#f3f4f6",
    middle: "#e5e7eb",
    end: "#f3f4f6",
  };

  const gradientColors = gradient || defaultGradient;

  // 그라데이션 스켈레톤 생성
  const gradientObj = ctx.createLinearGradient(0, 0, width, height);
  gradientObj.addColorStop(0, gradientColors.start);
  gradientObj.addColorStop(0.5, gradientColors.middle);
  gradientObj.addColorStop(1, gradientColors.end);

  ctx.fillStyle = gradientObj;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL();
}

/**
 * 이미지 크기에 따른 기본 blur placeholder를 생성합니다.
 *
 * @param size - 이미지 크기 타입
 * @param customGradient - 커스텀 그라데이션 색상 (선택사항)
 * @returns Base64로 인코딩된 데이터 URL
 *
 * @example
 * ```typescript
 * const blurURL = createBlurDataURLBySize("md");
 * const customBlurURL = createBlurDataURLBySize("lg", {
 *   start: "#000000",
 *   middle: "#333333",
 *   end: "#000000"
 * });
 * ```
 */
export function createBlurDataURLBySize(
  size: "sm" | "lg",
  customGradient?: BlurDataURLOptions["gradient"]
): string {
  // 크기별 기본 캔버스 크기
  const sizeDimensions = {
    sm: { width: 48, height: 68 },
    lg: { width: 210, height: 280 },
  };

  const dimensions = sizeDimensions[size];

  return createBlurDataURL({
    width: dimensions.width,
    height: dimensions.height,
    gradient: customGradient,
  });
}
