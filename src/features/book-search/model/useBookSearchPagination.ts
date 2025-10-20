"use client";

import { useState, useCallback, useEffect } from "react";

import { useBookSearch } from "@/entities/book";
import type {
  Book,
  BookSearchMeta,
  BookSearchParams,
} from "@/shared/types/book";

export interface UseBookSearchPaginationProps {
  initialParams?: BookSearchParams;
  itemsPerPage?: number;
}

export interface UseBookSearchPaginationReturn {
  // 데이터
  books: Book[];
  meta: BookSearchMeta | null;

  // 상태
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;

  // 액션
  search: (query: string) => void;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;

  // 유틸리티
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  getPageInfo: () => {
    startIndex: number;
    endIndex: number;
    showing: string;
  };
}

/**
 * 책 검색 페이지네이션용 커스텀 훅
 *
 * @description
 * - 책 검색 API 호출
 * - 페이지네이션 상태 관리
 * - 검색 결과 페이지별 표시
 * - 페이지 네비게이션 기능
 */
export function useBookSearchPagination({
  initialParams = { query: "", page: 1, size: 10 },
  itemsPerPage = 10,
}: UseBookSearchPaginationProps = {}): UseBookSearchPaginationReturn {
  const [searchParams, setSearchParams] =
    useState<BookSearchParams>(initialParams);
  const [currentPage, setCurrentPage] = useState(1);

  // 책 검색 API 호출
  const { books, meta, isLoading, isError, error } =
    useBookSearch(searchParams);

  // 총 페이지 수 계산
  const totalPages = meta ? Math.ceil(meta.total_count / itemsPerPage) : 0;

  // 페이지 상태 계산
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // 검색 실행
  const search = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      const newParams: BookSearchParams = {
        ...searchParams,
        query: query.trim(),
        page: 1,
        size: itemsPerPage,
      };

      setSearchParams(newParams);
      setCurrentPage(1);
    },
    [searchParams, itemsPerPage]
  );

  // 페이지 변경 핸들러
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page);
        setSearchParams((prev) => ({
          ...prev,
          page,
        }));

        // 페이지 변경 시 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages, currentPage]
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
    const endIndex = Math.min(
      currentPage * itemsPerPage,
      meta?.total_count || 0
    );
    const showing = `${startIndex}-${endIndex} of ${meta?.total_count || 0}`;

    return {
      startIndex: startIndex - 1, // 0-based index
      endIndex: endIndex - 1, // 0-based index
      showing,
    };
  }, [currentPage, itemsPerPage, meta?.total_count]);

  // 검색 파라미터가 변경되면 현재 페이지 업데이트
  useEffect(() => {
    setCurrentPage(searchParams.page || 1);
  }, [searchParams.page]);

  return {
    // 데이터
    books,
    meta: meta || null,

    // 상태
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,

    // 액션
    search,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,

    // 유틸리티
    hasNextPage,
    hasPreviousPage,
    getPageInfo,
  };
}
