"use client";

import { BookCard, useBookCardExpansion } from "@/entities/book";
import type { Book } from "@/shared/types/book";
import { BookIcon, Pagination } from "@/shared/ui";
import { usePagination } from "@/shared/hooks";

interface FavoriteListProps {
  favorites: Book[];
  onRemove: (book: Book) => void;
  itemsPerPage?: number; // 페이지당 아이템 수 (기본값: 10)
}

/**
 * 즐겨찾기 목록을 표시하는 컴포넌트
 *
 * @description
 * - 즐겨찾기된 책들을 BookCard로 표시
 * - 페이지네이션을 통한 페이지별 표시
 * - 빈 목록일 때는 안내 메시지 표시
 * - 각 카드에서 즐겨찾기 제거 가능
 * - 각 BookCard의 확장 상태를 독립적으로 관리
 */
export function FavoriteList({
  favorites,
  onRemove,
  itemsPerPage = 10,
}: FavoriteListProps) {
  const { isBookExpanded, toggleBookExpansion } = useBookCardExpansion();

  // 페이지네이션 훅 사용
  const {
    paginatedItems: paginatedFavorites,
    totalPages,
    currentPage,
    goToPage,
  } = usePagination({
    items: favorites,
    itemsPerPage,
    autoReset: false,
    scrollToTopOnPageChange: true,
  });

  if (favorites.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <div className="flex mt-[15%] w-full flex-col items-center justify-center">
          <BookIcon size="lg" variant="default" className="w-[80px] h-[80px]" />
          <h3 className="text-lg font-bold text-[#6D7582] mt-4">
            찜한 책이 없습니다.
          </h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* 즐겨찾기 목록 */}
      {paginatedFavorites.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggleFavorite={onRemove}
          onToggleDetails={toggleBookExpansion}
          isFavorite
          isExpanded={isBookExpanded(book.id)}
          showDetailsButton={true}
          showPurchaseButton={true}
        />
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          className="mt-6"
        />
      )}
    </div>
  );
}
