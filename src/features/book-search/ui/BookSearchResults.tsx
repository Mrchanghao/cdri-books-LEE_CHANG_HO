"use client";

import { BookCard, useBookCardExpansion } from "@/entities/book";
import { BookIcon, Pagination } from "@/shared/ui";
import type { Book } from "@/shared/types/book";

interface BookSearchResultsProps {
  books: Book[];
  metaTotalCount: number;
  onToggleFavorite?: (book: Book) => void;
  favoritesMap?: Record<string, boolean>;
  // 페이지네이션 props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

/**
 * @description
 * - 검색된 도서 목록을 BookCard로 표시
 * - 페이지네이션을 통한 페이지별 표시
 * - 각 BookCard의 확장 상태를 독립적으로 관리
 * - 아코디언 방식으로 하나의 카드만 열리도록 제어
 */
export function BookSearchResults({
  books,
  metaTotalCount,
  onToggleFavorite,
  favoritesMap = {},
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isLoading = false,
}: BookSearchResultsProps) {
  // BookCard 확장 상태(아코디언 관련 로직) 관리
  const { isBookExpanded, toggleBookExpansion } = useBookCardExpansion();

  // 검색 결과가 없을 때만 빈 상태 표시
  if (metaTotalCount === 0 && !isLoading) {
    return (
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            도서 검색 결과 총{" "}
            <span className="text-brand-primary">{metaTotalCount}</span>건
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex mt-[15%] w-full flex-col items-center justify-center">
            <BookIcon
              size="lg"
              variant="default"
              className="w-[80px] h-[80px]"
            />
            <h3 className="text-lg font-bold text-[#6D7582] mt-4">
              검색된 결과가 없습니다.
            </h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex w-full items-center gap-2">
        <h2 className="text-lg font-semibold">
          도서 검색 결과 총{" "}
          <span className="text-brand-primary">
            {metaTotalCount.toLocaleString()}
          </span>
          건
        </h2>
      </div>

      <div className="flex flex-col">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onToggleFavorite={onToggleFavorite}
            onToggleDetails={toggleBookExpansion}
            isFavorite={Boolean(book.id && favoritesMap[book.id])}
            isExpanded={isBookExpanded(book.id)}
            showDetailsButton={true}
            showPurchaseButton={true}
            showFavoriteButton={true}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          className="mt-6"
        />
      )}
    </div>
  );
}
