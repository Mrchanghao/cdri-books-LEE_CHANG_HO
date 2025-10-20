"use client";

import { useState, useMemo, useEffect, useCallback } from "react";

export interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  autoReset?: boolean; // items가 변경될 때 첫 페이지로 리셋할지 여부 (기본값: true)
  scrollToTopOnPageChange?: boolean; // 페이지 변경 시 상단으로 스크롤할지 여부 (기본값: true)
}

export interface UsePaginationReturn<T> {
  // 데이터
  paginatedItems: T[];
  totalPages: number;
  totalItems: number;

  // 상태
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;

  // 액션
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;

  // 유틸리티
  getPageInfo: () => {
    startIndex: number;
    endIndex: number;
    showing: string; // "1-10 of 25" 형태의 문자열
  };
}

/**
 * 페이지네이션을 위한 커스텀 훅
 *
 * @description
 * - 배열 데이터를 페이지별로 나누어 관리
 * - 페이지 변경, 네비게이션 기능 제공
 * - 자동 리셋 및 스크롤 기능 옵션
 * - 페이지 정보 및 상태 관리
 */
export function usePagination<T>({
  items,
  itemsPerPage,
  autoReset = true,
  scrollToTopOnPageChange = true,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const totalItems = items.length;

  // 현재 페이지의 아이템들 계산
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // 페이지 상태 계산
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // items가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    if (autoReset) {
      setCurrentPage(1);
    }
  }, [items.length, autoReset]);

  // 페이지 변경 핸들러
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);

        if (scrollToTopOnPageChange) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    [totalPages, scrollToTopOnPageChange]
  );

  // 네비게이션 함수들
  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [hasNextPage, currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [hasPreviousPage, currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  // 페이지 정보 가져오기
  const getPageInfo = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
    const showing = `${startIndex}-${endIndex} of ${totalItems}`;

    return {
      startIndex: startIndex - 1, // 0-based index
      endIndex: endIndex - 1, // 0-based index
      showing,
    };
  }, [currentPage, itemsPerPage, totalItems]);

  return {
    // 데이터
    paginatedItems,
    totalPages,
    totalItems,

    // 상태
    currentPage,
    hasNextPage,
    hasPreviousPage,

    // 액션
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,

    // 유틸리티
    getPageInfo,
  };
}
