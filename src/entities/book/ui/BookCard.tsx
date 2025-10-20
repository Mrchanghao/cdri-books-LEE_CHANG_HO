"use client";

import { memo } from "react";

import { BookThumbnail } from "./BookThumbnail/BookThumbnail";
import { BookInfo } from "./BookInfo";
import { BookPrice } from "./BookPrice";
import { BookActions } from "./BookActions";
import { BookDetails } from "./BookDetails";
import type { Book } from "@/shared/types/book";

interface BookCardProps {
  book: Book;
  onToggleFavorite?: (book: Book) => void;
  onPurchase?: (book: Book) => void;
  onToggleDetails?: (bookId: string) => void;
  isFavorite?: boolean;
  isExpanded?: boolean;
  showPurchaseButton?: boolean;
  showDetailsButton?: boolean;
  showFavoriteButton?: boolean;
  variant?: "compact" | "detailed";
  className?: string;
}

/**
 * 도서 카드 UI
 * @description
 * - 재사용 가능한 작은 컴포넌트들로 구성
 * - 컴팩트/상세 두 가지 변형 지원
 * - 아코디언 상세보기 기능
 * - 다양한 액션 버튼 지원
 */
function BookCardComponent({
  book,
  onToggleFavorite,
  onToggleDetails,
  isFavorite = false,
  isExpanded = false,
  showPurchaseButton = true,
  showDetailsButton = true,
  showFavoriteButton = true,
  variant = "compact",
  className = "",
}: BookCardProps) {
  const handleToggleDetails = () => {
    if (onToggleDetails) {
      onToggleDetails(book.id);
    }
  };

  const handlePurchase = () => {
    window.open(book.url, "_blank");
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(book);
    }
  };

  return (
    <article
      className={` border-b min-h-[100px] border-brand-neutral bg-brand-white p-4 shadow-sm ${className}`}
    >
      {!isExpanded ? (
        // 컴팩트 뷰: 기본 도서 정보와 액션 버튼들
        <div className="flex gap-2 justify-between">
          {/* 썸네일 */}
          <BookThumbnail
            src={book.thumbnail}
            alt={book.title}
            size="sm"
            isFavorite={isFavorite}
            showFavoriteIcon={showFavoriteButton}
            onToggleFavorite={handleToggleFavorite}
          />

          {/* 메인 콘텐츠 */}
          <div className="flex flex-1 justify-between">
            {/* 도서 정보 */}
            <BookInfo
              title={book.title}
              authors={book.authors}
              contents={variant === "detailed" ? book.contents : undefined}
              showContents={variant === "detailed"}
              className="flex items-center min-w-0 gap-2"
            />

            {/* 가격 및 액션 */}
            <div className="flex items-center gap-2">
              <BookPrice
                price={book.price}
                salePrice={book.sale_price}
                size="md"
              />

              <BookActions
                onPurchase={handlePurchase}
                onToggleDetails={handleToggleDetails}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
                isExpanded={isExpanded}
                showPurchaseButton={showPurchaseButton}
                showDetailsButton={showDetailsButton}
                showFavoriteButton={showFavoriteButton}
              />
            </div>
          </div>
        </div>
      ) : (
        // 확장 뷰: BookDetails 컴포넌트만 표시
        <BookDetails
          book={book}
          onPurchase={handlePurchase}
          onToggleDetails={handleToggleDetails}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite}
          showPurchaseButton={showPurchaseButton}
          showFavoriteButton={showFavoriteButton}
        />
      )}
    </article>
  );
}

export const BookCard = memo(BookCardComponent);
