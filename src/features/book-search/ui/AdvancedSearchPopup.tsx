"use client";

import { X, ChevronDown } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  useAdvancedSearch,
  type SearchTarget,
} from "../model/useAdvancedSearch";

interface AdvancedSearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (params: { query: string; target: SearchTarget }) => void;
  className?: string;
}

/**
 * 상세 검색 팝업 컴포넌트
 *
 * @description
 * - 검색 조건 선택 (제목, ISBN, 출판사, 저자명)
 * - 검색어 입력 및 상세 검색 실행
 * - 팝업 형태로 표시되며 외부 클릭 시 닫힘
 */
export function AdvancedSearchPopup({
  isOpen,
  onClose,
  onSearch,
  className = "",
}: AdvancedSearchPopupProps) {
  // Custom hook을 사용하여 비즈니스 로직 분리
  const {
    searchQuery,
    searchTarget,
    isTargetOpen,
    popupRef,
    setSearchQuery,
    setIsTargetOpen,
    handleSearch,
    handleKeyPress,
    handleTargetSelect,
    targetOptions,
  } = useAdvancedSearch({
    isOpen,
    onClose,
    onSearch,
  });

  if (!isOpen) return null;

  return (
    <div className="absolute top-full translate-x-[-50%] w-[360px] z-50 mt-2 ">
      <div
        ref={popupRef}
        className={`relative bg-brand-white rounded-lg shadow-lg p-4 w-full ${className}`}
      >
        {/* 닫기 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-2 top-2 h-8 w-8 p-0"
          aria-label="상세 검색 팝업 닫기"
          title="상세 검색 팝업 닫기"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* 검색 조건 선택 */}
        <div className=" mt-6 flex justify-between gap-1">
          <div className="flex-1 w-full">
            <div className="relative flex justify-between border-b border-brand-neutral">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setIsTargetOpen(!isTargetOpen)}
                className="w-full border-none justify-between text-sm"
                aria-label="검색 조건 선택"
                aria-expanded={isTargetOpen}
                aria-haspopup="listbox"
              >
                <span className="text-sm font-bold mr-2">
                  {
                    targetOptions.find(
                      (option) => option.value === searchTarget
                    )?.label
                  }
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {isTargetOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 bg-brand-white border border-brand-neutral rounded-md shadow-lg z-10 flex flex-col"
                  role="listbox"
                  aria-label="검색 조건 옵션"
                >
                  {targetOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleTargetSelect(option.value)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                      role="option"
                      aria-selected={searchTarget === option.value}
                      aria-label={`${option.label} 검색 조건 선택`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 검색어 입력 */}
          <div className="mb-6 border-b border-brand-neutral">
            <Input
              size="lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="검색어를 입력하세요"
              className="flex-1 border-none bg-brand-white"
            />
          </div>
        </div>

        {/* 액션 버튼들 */}
        <div className="flex w-full gap-2 items-end border-none">
          <Button
            onClick={handleSearch}
            size="lg"
            className="w-full border-none"
            disabled={!searchQuery.trim()}
          >
            검색하기
          </Button>
        </div>
      </div>
    </div>
  );
}
