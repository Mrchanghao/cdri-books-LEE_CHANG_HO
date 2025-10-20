"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { BookPrice } from "./BookPrice";
import { cn } from "@/shared/lib/cn";

interface CompactBookActionsProps {
  onPurchase?: () => void;
  onToggleDetails?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  showPurchaseButton?: boolean;
  showDetailsButton?: boolean;
  showFavoriteButton?: boolean;
  className?: string;
}

interface ExpandedBookActionsProps {
  onPurchase?: () => void;
  onToggleDetails?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  showPurchaseButton?: boolean;
  showDetailsButton?: boolean;
  showFavoriteButton?: boolean;
  price?: number;
  salePrice?: number;
  className?: string;
}

interface BookActionsProps {
  onPurchase?: () => void;
  onToggleDetails?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  isExpanded?: boolean;
  showPurchaseButton?: boolean;
  showDetailsButton?: boolean;
  showFavoriteButton?: boolean;
  price?: number;
  salePrice?: number;
  className?: string;
}

/**
 * 컴팩트 뷰용 도서 액션 버튼들
 *
 * @description
 * - 구매하기, 상세보기 버튼만 포함
 * - flex-row 레이아웃, md 사이즈
 * - 구매하기 → 상세보기 순서
 */
export function CompactBookActions({
  onPurchase,
  onToggleDetails,

  showPurchaseButton = true,
  showDetailsButton = true,

  className = "",
}: CompactBookActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 구매 버튼 */}
      {showPurchaseButton && onPurchase && (
        <Button variant="default" size="md" onClick={onPurchase}>
          구매하기
        </Button>
      )}

      {/* 상세보기 버튼 */}
      {showDetailsButton && onToggleDetails && (
        <Button
          variant="outline"
          size="md"
          className="bg-[#F2F4F6]"
          onClick={onToggleDetails}
          rightIcon={<ChevronDown className="h-4 w-4" />}
        >
          상세보기
        </Button>
      )}
    </div>
  );
}

/**
 * 확장 뷰용 도서 액션 버튼들
 *
 * @description
 * - 상세보기, 가격정보, 구매하기 버튼 포함
 * - flex-col 레이아웃
 * - 상세보기 → 가격정보 → 구매하기 순서
 */
export function ExpandedBookActions({
  onPurchase,
  onToggleDetails,
  onToggleFavorite,
  isFavorite = false,
  showPurchaseButton = true,
  showDetailsButton = true,
  showFavoriteButton = false,
  price,
  salePrice,
  className = "",
}: ExpandedBookActionsProps) {
  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* 상세보기 버튼 */}
      <div className="flex justify-end items-center gap-2 w-full">
        {showDetailsButton && onToggleDetails && (
          <Button
            variant="outline"
            size="md"
            className="bg-[#F2F4F6]"
            onClick={onToggleDetails}
            rightIcon={<ChevronUp className="h-4 w-4" />}
          >
            상세보기
          </Button>
        )}
      </div>
      {/* 가격 정보 */}
      {price && salePrice && (
        <div className="flex flex-col mt-[50%] gap-2 w-full">
          <div className="flex justify-end items-center gap-2 w-full">
            <span className="text-[10px] text-gray-600">정가</span>
            <span className="text-[18px] font-medium line-through text-brand-dark">
              ₩{price.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-end items-center gap-2">
            <span className="text-[10px] text-gray-600">할인가</span>
            <BookPrice price={price} salePrice={salePrice} size="md" />
          </div>
        </div>
      )}

      {/* 즐겨찾기 버튼 */}
      {showFavoriteButton && onToggleFavorite && (
        <Button
          variant={isFavorite ? "default" : "outline"}
          size="md"
          onClick={onToggleFavorite}
          className="w-full"
        >
          {isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        </Button>
      )}

      {/* 구매 버튼 */}
      {showPurchaseButton && onPurchase && (
        <Button
          variant="default"
          size="md"
          onClick={onPurchase}
          className="w-full"
        >
          구매하기
        </Button>
      )}
    </div>
  );
}

/**
 * 도서 관련 액션 버튼들을 관리하는 메인 컴포넌트
 *
 * @description
 * - isExpanded 상태에 따라 CompactBookActions 또는 ExpandedBookActions 렌더링
 * - 기존 API 호환성 유지
 */
export function BookActions({
  onPurchase,
  onToggleDetails,
  onToggleFavorite,
  isFavorite = false,
  isExpanded = false,
  showPurchaseButton = true,
  showDetailsButton = true,
  showFavoriteButton = false,
  price,
  salePrice,
  className = "",
}: BookActionsProps) {
  if (isExpanded) {
    return (
      <ExpandedBookActions
        onPurchase={onPurchase}
        onToggleDetails={onToggleDetails}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        showPurchaseButton={showPurchaseButton}
        showDetailsButton={showDetailsButton}
        showFavoriteButton={showFavoriteButton}
        price={price}
        salePrice={salePrice}
        className={className}
      />
    );
  }

  return (
    <CompactBookActions
      onPurchase={onPurchase}
      onToggleDetails={onToggleDetails}
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      showPurchaseButton={showPurchaseButton}
      showDetailsButton={showDetailsButton}
      showFavoriteButton={showFavoriteButton}
      className={className}
    />
  );
}
