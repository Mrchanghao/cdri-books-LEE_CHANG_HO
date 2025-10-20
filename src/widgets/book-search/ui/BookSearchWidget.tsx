"use client";

import { useMemo } from "react";

import {
  BookSearchForm,
  BookSearchResults,
  useBookSearchPagination,
} from "@/features/book-search";
import { useFavorites } from "@/features/favorites";

export function BookSearchWidget() {
  // 즐겨 찾기 관련 훅
  const { favoritesMap, toggleFavorite } = useFavorites();

  // 페이지네이션 통합 훅 사용
  const {
    books,
    meta,
    isLoading,
    isError,
    error,
    currentPage,
    totalPages,
    search,
    goToPage,
  } = useBookSearchPagination({
    itemsPerPage: 10,
  });

  const handleAdvancedSearch = (params: {
    query: string;
    target: "title" | "publisher" | "person";
  }) => {
    search(params.query);
  };

  const content = useMemo(() => {
    if (isError) {
      return <p className="text-center text-destructive">{String(error)}</p>;
    }

    // 로딩 중이지만 데이터가 없을 때만 로딩 표시
    if (isLoading && books.length === 0) {
      return (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-brand-primary" />
            <span className="text-gray-600">검색 중...</span>
          </div>
        </div>
      );
    }

    return (
      <BookSearchResults
        books={books}
        metaTotalCount={meta?.total_count ?? 0}
        onToggleFavorite={toggleFavorite}
        favoritesMap={favoritesMap}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        isLoading={isLoading}
      />
    );
  }, [
    isLoading,
    isError,
    books,
    meta?.total_count,
    toggleFavorite,
    favoritesMap,
    currentPage,
    totalPages,
    goToPage,
    error,
  ]);

  return (
    <section className="space-y-6">
      <BookSearchForm
        query=""
        onSubmit={search}
        onAdvancedSearch={handleAdvancedSearch}
      />
      {content}
    </section>
  );
}
