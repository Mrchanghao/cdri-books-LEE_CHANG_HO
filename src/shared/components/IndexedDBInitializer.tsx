"use client";

import { useEffect } from "react";

/**
 * IndexedDB 초기화 컴포넌트
 * 애플리케이션 시작 시 IndexedDB를 초기화합니다.
 */
export function IndexedDBInitializer() {
  useEffect(() => {
    const initializeIndexedDB = async () => {
      try {
        // IndexedDB 지원 여부 확인
        if (!window.indexedDB) {
          console.warn("IndexedDB is not supported in this browser");
          return;
        }

        // 즐겨찾기 IndexedDB 초기화
        const { initializeFavoritesDB } = await import(
          "@/features/favorites/model/favoritesStore"
        );
        await initializeFavoritesDB();
      } catch (error) {
        console.error("Failed to initialize IndexedDB:", error);
      }
    };

    initializeIndexedDB();
  }, []);

  return null; // UI를 렌더링하지 않음
}
