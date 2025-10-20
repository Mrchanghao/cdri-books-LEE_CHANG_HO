/**
 * BookThumbnail 컴포넌트의 타입 정의
 */

export interface BookThumbnailProps {
  /** 이미지 소스 URL */
  src?: string;
  /** 이미지 대체 텍스트 (접근성) */
  alt: string;
  /** 썸네일 크기 */
  size?: "sm" | "lg";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 우선순위 로딩 (Above the fold 이미지용) */
  priority?: boolean;
  /** 플레이스홀더 타입 */
  placeholder?: "blur" | "empty";
  /** 커스텀 블러 데이터 URL */
  blurDataURL?: string;
  /** 즐겨찾기 상태 */
  isFavorite?: boolean;
  /** 즐겨찾기 아이콘 표시 여부 */
  showFavoriteIcon?: boolean;
  /** 즐겨찾기 아이콘 클릭 핸들러 */
  onToggleFavorite?: () => void;
}

export type BookThumbnailSize = NonNullable<BookThumbnailProps["size"]>;
export type BookThumbnailPlaceholder = NonNullable<
  BookThumbnailProps["placeholder"]
>;
