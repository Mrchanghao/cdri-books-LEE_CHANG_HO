"use client";

import { BookThumbnail } from "./BookThumbnail/BookThumbnail";
// import { BookInfo } from "./BookInfo";
import { BookActions } from "./BookActions";

interface BookDetailsProps {
  book: {
    title: string;
    authors: string[];

    contents?: string;
    thumbnail?: string;
    price: number;
    sale_price: number;
    url?: string;
  };
  onPurchase?: () => void;
  onToggleDetails?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  showPurchaseButton?: boolean;
  showFavoriteButton?: boolean;
  className?: string;
}

/**
 * 도서 상세 정보를 표시하는 아코디언 컴포넌트
 *
 * @description
 * - 큰 썸네일과 상세 정보 표시
 * - 가격 정보와 외부 링크 제공
 * - 재사용 가능한 상세 정보 레이아웃
 */
export function BookDetails({
  book,
  onPurchase,
  onToggleDetails,
  onToggleFavorite,
  isFavorite = false,
  showPurchaseButton = true,
  showFavoriteButton = false,
  className = "",
}: BookDetailsProps) {
  return (
    <div className={`border-t border-none ${className}`}>
      <div className="flex flex-col md:flex-row gap-4 py-4">
        {/* 큰 썸네일 */}
        <div className="flex-shrink-0 flex justify-center md:justify-start">
          <BookThumbnail
            src={book.thumbnail}
            alt={book.title}
            size="lg"
            className="border border-brand-neutral"
            isFavorite={isFavorite}
            showFavoriteIcon={showFavoriteButton}
            onToggleFavorite={onToggleFavorite}
          />
        </div>

        {/* 상세 정보 */}
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-row gap-2 mb-4">
              <h3 className="text-lg font-bold text-brand-dark leading-tight">
                {book.title}
              </h3>
              <span className="text-sm text-[#8D94A0]">
                {book.authors.join(", ")}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#353C49]">책 소개</h4>
              <p className="text-[10px] text-[#353C49] leading-relaxed ">
                {book.contents || "내용 정보가 없습니다."}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-80">
            {/* 액션 버튼들 - 가격 정보가 버튼 사이에 포함됨 */}
            <BookActions
              onPurchase={onPurchase}
              onToggleDetails={onToggleDetails}
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
              isExpanded={true}
              showPurchaseButton={showPurchaseButton}
              showDetailsButton={true}
              showFavoriteButton={showFavoriteButton}
              price={book.price}
              salePrice={book.sale_price}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
