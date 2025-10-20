"use client";

import { FavoriteList, useFavorites } from "@/features/favorites";

/**
 * 즐겨찾기 페이지의 메인 위젯 컴포넌트
 *
 * @description
 * - 즐겨찾기된 책들의 목록을 표시
 * - 전체 즐겨찾기 초기화 기능 제공
 * - 즐겨찾기 개별 제거 기능 제공
 */
export function FavoritesWidget() {
  // 즐겨찾기 관련 상태와 함수들을 가져옴
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  return (
    <section className="space-y-4">
      {/* 페이지 헤더 */}
      <header className="flex items-center justify-between">
        <h1 className="text-[16px] font-medium">
          찜한 책 총{" "}
          <span className="text-brand-primary">{favorites.length}</span>건
        </h1>
        {/* 즐겨찾기가 있을 때만 전체 삭제 버튼 표시 */}
        {favorites.length > 0 ? (
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-destructive"
            onClick={clearFavorites}
          >
            Clear all
          </button>
        ) : null}
      </header>

      {/* 즐겨찾기 목록 렌더링 */}
      <FavoriteList
        favorites={favorites}
        onRemove={toggleFavorite} // 개별 제거 시 토글 함수 사용
      />
    </section>
  );
}
