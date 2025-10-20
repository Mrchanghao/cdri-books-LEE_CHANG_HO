"use client";

import { useCallback, useMemo, useSyncExternalStore, useState } from "react";
import type { Book } from "@/shared/types/book";
import { favoritesStore } from "./favoritesStore";

/**
 * 즐겨찾기 기능을 관리하는 커스텀 훅
 *
 * @description
 * - 즐겨찾기 목록 조회 및 관리
 * - 즐겨찾기 상태 토글 기능
 * - 즐겨찾기 목록 초기화 기능
 * - SSR 호환성을 위한 useSyncExternalStore 사용
 * - IndexedDB 기반 비동기 데이터 관리
 */
export function useFavorites() {
  // 외부 스토어와 동기화하여 즐겨찾기 목록 상태 관리
  const favorites = useSyncExternalStore(
    favoritesStore.subscribe, // 스토어 변경 구독
    favoritesStore.getSnapshot, // 클라이언트 스냅샷
    favoritesStore.getServerSnapshot // 서버 스냅샷 (SSR용)
  );

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // 즐겨찾기 목록 조회 가능
  const favoritesMap = useMemo(
    () =>
      favorites.reduce<Record<string, boolean>>((acc, book) => {
        acc[book.id] = true; // 책 isbn를 키로, true를 값으로 설정
        return acc;
      }, {}),
    [favorites] // favorites 배열이 변경될 때만 재계산
  );

  // 즐겨찾기 상태를 토글하는 함수
  // 책이 이미 즐겨찾기면 제거, 아니면 추가
  const toggleFavorite = useCallback(async (book: Book) => {
    setIsLoading(true);
    try {
      await favoritesStore.toggle(book);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 즐겨찾기 추가 함수
  const addFavorite = useCallback(async (book: Book) => {
    setIsLoading(true);
    try {
      await favoritesStore.add(book);
    } catch (error) {
      console.error("Failed to add favorite:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 즐겨찾기 제거 함수
  const removeFavorite = useCallback(async (bookId: string) => {
    setIsLoading(true);
    try {
      await favoritesStore.remove(bookId);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 모든 즐겨찾기를 초기화하는 함수
  // 즐겨찾기 목록을 완전히 비움
  const clearFavorites = useCallback(async () => {
    setIsLoading(true);
    try {
      await favoritesStore.clear();
    } catch (error) {
      console.error("Failed to clear favorites:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 즐겨찾기 여부 확인 함수 (동기)
  const isFavorite = useCallback(
    (bookId: string) => {
      return favoritesMap[bookId] || false;
    },
    [favoritesMap]
  );

  // 즐겨찾기 개수 반환 함수 (동기)
  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites.length]);

  // 즐겨찾기 여부 확인 함수 (비동기 - IndexedDB 직접 조회)
  const isFavoriteAsync = useCallback(async (bookId: string) => {
    try {
      return await favoritesStore.isFavorite(bookId);
    } catch (error) {
      console.error("Failed to check favorite status:", error);
      return false;
    }
  }, []);

  // 즐겨찾기 개수 반환 함수 (비동기 - IndexedDB 직접 조회)
  const getFavoritesCountAsync = useCallback(async () => {
    try {
      return await favoritesStore.getCount();
    } catch (error) {
      console.error("Failed to get favorites count:", error);
      return 0;
    }
  }, []);

  return {
    favorites, // 즐겨찾기 목록 배열
    favoritesMap, // 즐겨찾기 상태 조회용 Map
    isLoading, // 로딩 상태
    toggleFavorite, // 즐겨찾기 토글 함수
    addFavorite, // 즐겨찾기 추가 함수
    removeFavorite, // 즐겨찾기 제거 함수
    clearFavorites, // 즐겨찾기 초기화 함수
    isFavorite, // 즐겨찾기 여부 확인 함수 (동기)
    getFavoritesCount, // 즐겨찾기 개수 반환 함수 (동기)
    isFavoriteAsync, // 즐겨찾기 여부 확인 함수 (비동기)
    getFavoritesCountAsync, // 즐겨찾기 개수 반환 함수 (비동기)
  };
}
