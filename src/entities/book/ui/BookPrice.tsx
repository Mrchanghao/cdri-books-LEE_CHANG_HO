"use client";

interface BookPriceProps {
  price: number;
  salePrice?: number;

  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-sm",
  md: "text-lg font-semibold",
  lg: "text-xl font-bold",
};

/**
 
 *
 * @description
 * - 정가와 판매가 표시
 * - 할인율 자동 계산 및 표시
 * - 다양한 크기 지원
 */
export function BookPrice({
  price,
  salePrice,
  size = "md",
  className = "",
}: BookPriceProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={`${sizeClasses[size]} text-brand-dark`}>
        {salePrice ? salePrice.toLocaleString() : price.toLocaleString()}원
      </span>
    </div>
  );
}
