"use client";

import { useState, useCallback } from "react";

/**
 *
 * @description
 * - 여러 BookCard의 확장 상태를 독립적으로
 * - 하나의 카드만 열리도록 제어 (accordion 방식)
 * - 각 카드의 고유 ID로 상태 구분
 */
export function useBookCardExpansion() {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  /**
   * 특정 도서 카드의 확장 상태를 토글
   * @param bookId - 토글할 도서의 ID
   */
  const toggleBookExpansion = useCallback((bookId: string) => {
    setExpandedBookId((prev) => (prev === bookId ? null : bookId));
  }, []);

  /**
   * 특정 도서가 확장 상태인지 확인
   * @param bookId - 확인할 도서의 ID
   * @returns 확장 상태 여부
   */
  const isBookExpanded = useCallback(
    (bookId: string) => {
      return expandedBookId === bookId;
    },
    [expandedBookId]
  );

  /**
   * 모든 확장 상태 초기화
   */
  const closeAllBooks = useCallback(() => {
    setExpandedBookId(null);
  }, []);

  /**
   * 현재 확장된 도서 ID 반환
   */
  const getExpandedBookId = useCallback(() => {
    return expandedBookId;
  }, [expandedBookId]);

  return {
    expandedBookId,
    toggleBookExpansion,
    isBookExpanded,
    closeAllBooks,
    getExpandedBookId,
  };
}
