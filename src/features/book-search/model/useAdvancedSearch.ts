"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchHistory } from "./useSearchHistory";

export type SearchTarget = "title" | "publisher" | "person";

export interface AdvancedSearchParams {
  query: string;
  target: SearchTarget;
}

export interface UseAdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (params: AdvancedSearchParams) => void;
}

export interface UseAdvancedSearchReturn {
  // 검색 관련
  searchQuery: string;
  searchTarget: SearchTarget;
  isTargetOpen: boolean;

  // 팝업 참조
  popupRef: React.RefObject<HTMLDivElement>;

  // 검색 관련 함수
  setSearchQuery: (query: string) => void;
  setSearchTarget: (target: SearchTarget) => void;
  setIsTargetOpen: (isOpen: boolean) => void;
  handleSearch: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleTargetSelect: (target: SearchTarget) => void;

  // 검색 조건 옵션들
  targetOptions: Array<{ value: SearchTarget; label: string }>;
}

/**
 * 상세 검색 팝업용 커스텀 훅
 *
 * @description
 * - 검색 조건 선택 (제목, 출판사, 저자명)
 * - 검색어 입력
 * - 외부 클릭 시 팝업 닫기
 * - 검색 실행 및 상태 초기화
 * - 키보드 Enter 키 이벤트 처리
 */
export function useAdvancedSearch({
  isOpen,
  onClose,
  onSearch,
}: UseAdvancedSearchProps): UseAdvancedSearchReturn {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 조건 상태 (기본값: 제목)
  const [searchTarget, setSearchTarget] = useState<SearchTarget>("title");

  // 검색 조건 드롭다운 열림/닫힘 상태
  const [isTargetOpen, setIsTargetOpen] = useState(false);

  // 팝업 참조 (외부 클릭 감지용)
  const popupRef = useRef<HTMLDivElement>(null);

  // 검색 조건 옵션들
  const targetOptions: Array<{ value: SearchTarget; label: string }> = [
    { value: "title", label: "제목" },
    { value: "publisher", label: "출판사" },
    { value: "person", label: "저자명" },
  ];
  const { addQuery } = useSearchHistory();

  // 외부 클릭 시 팝업 닫기 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  // 검색 조건  처리
  const handleTargetSelect = useCallback((target: SearchTarget) => {
    setSearchTarget(target);
    setIsTargetOpen(false);
  }, []);

  // 검색 실행 처리
  const handleSearch = useCallback(() => {
    if (searchQuery.trim()) {
      addQuery(searchQuery.trim());
      onSearch({
        query: searchQuery.trim(),
        target: searchTarget,
      });
      onClose();
      setSearchQuery("");
    }
  }, [searchQuery, addQuery, onSearch, searchTarget, onClose]);

  // 키보드 이벤트 처리 (Enter 키)
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return {
    // State
    searchQuery,
    searchTarget,
    isTargetOpen,

    // Refs
    popupRef,

    // Actions
    setSearchQuery,
    setSearchTarget,
    setIsTargetOpen,
    handleSearch,
    handleKeyPress,
    handleTargetSelect,

    // Constants
    targetOptions,
  };
}
