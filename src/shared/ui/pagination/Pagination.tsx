"use client";

import { Button } from "@/shared/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * 페이지네이션 컴포넌트
 *
 * @description
 * - 현재 페이지, 전체 페이지 수, 페이지 변경 핸들러를 받아 페이지네이션 UI 제공
 * - 이전/다음 버튼과 페이지 번호 버튼 포함
 * - 현재 페이지 주변의 페이지들만 표시하여 UI 정리
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  // 표시할 페이지 번호들을 계산하는 함수
  const getVisiblePages = () => {
    const delta = 2; // 현재 페이지 앞뒤로 표시할 페이지 수
    const range = [];
    const rangeWithDots = [];

    // 현재 페이지 주변의 페이지 범위 계산
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // 첫 페이지 처리
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    // 중간 페이지들 추가
    rangeWithDots.push(...range);

    // 마지막 페이지 처리
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // 페이지가 1개 이하면 페이지네이션 숨김
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* 이전 버튼 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </Button>

      {/* 페이지 번호들 */}
      {getVisiblePages().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          aria-label={`페이지 ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      {/* 다음 버튼 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        다음
      </Button>
    </div>
  );
}
