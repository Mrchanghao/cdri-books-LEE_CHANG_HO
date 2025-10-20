"use client";

import { useCallback, useMemo } from "react";
import { useSyncExternalStore } from "react";

const STORAGE_KEY = "book-search:history";
const MAX_HISTORY_ITEMS = 8;

type SearchHistoryItem = {
  id: string;
  query: string;
  timestamp: number;
};

type Listener = (history: SearchHistoryItem[]) => void;

let searchHistory: SearchHistoryItem[] = [];
const listeners = new Set<Listener>();
let initialized = false;

const EMPTY_HISTORY: SearchHistoryItem[] = [];

function readFromStorage(): SearchHistoryItem[] {
  if (typeof window === "undefined") {
    return searchHistory;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return searchHistory;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Failed to parse search history from storage", error);
  }
  return [];
}

function writeToStorage(history: SearchHistoryItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn("Failed to persist search history", error);
  }
}

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  searchHistory = readFromStorage();
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      try {
        searchHistory = event.newValue
          ? JSON.parse(event.newValue)
          : readFromStorage();
        emit();
      } catch (error) {
        console.warn("Failed to sync search history from storage", error);
      }
    }
  });
}

function emit() {
  const newHistory = [...searchHistory];
  listeners.forEach((listener) => listener(newHistory));
}

function addSearchQuery(query: string) {
  if (!query || !query.trim()) return;

  const trimmedQuery = query.trim();
  const now = Date.now();

  // query가 이미 존재하면 추가하지 않음
  const filtered = searchHistory.filter((item) => item.query !== trimmedQuery);
  // 새로운 쿼리를 첫 번째 위치에 추가
  const newItem: SearchHistoryItem = {
    id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
    query: trimmedQuery,
    timestamp: now,
  };

  searchHistory = [newItem, ...filtered];

  // 최대 기록 개수를 초과하면 가장 오래된 항목을 제거
  if (searchHistory.length > MAX_HISTORY_ITEMS) {
    searchHistory = searchHistory.slice(0, MAX_HISTORY_ITEMS);
  }
  writeToStorage(searchHistory);
  emit();
}

function removeSearchQuery(id: string) {
  searchHistory = searchHistory.filter((item) => item.id !== id);
  writeToStorage(searchHistory);
  emit();
}

function clearSearchHistory() {
  searchHistory = [];
  writeToStorage(searchHistory);
  emit();
}

export const searchHistoryStore = {
  subscribe(listener: Listener) {
    ensureInitialized();
    listeners.add(listener);
    listener(searchHistory);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot() {
    ensureInitialized();
    return searchHistory;
  },
  getServerSnapshot() {
    return EMPTY_HISTORY;
  },
  addQuery: addSearchQuery,
  removeQuery: removeSearchQuery,
  clearHistory: clearSearchHistory,
};

export function useSearchHistory() {
  const history = useSyncExternalStore(
    searchHistoryStore.subscribe,
    searchHistoryStore.getSnapshot,
    searchHistoryStore.getServerSnapshot
  );

  // useCallback으로 메모이제이션
  const addQuery = useCallback((query: string) => {
    searchHistoryStore.addQuery(query);
  }, []);

  const removeQuery = useCallback((id: string) => {
    searchHistoryStore.removeQuery(id);
  }, []);

  const clearHistory = useCallback(() => {
    searchHistoryStore.clearHistory();
  }, []);

  const recentQueries = useMemo(() => {
    return history.map((item) => item.query);
  }, [history]);

  return {
    history,
    recentQueries,
    addQuery,
    removeQuery,
    clearHistory,
    hasHistory: history.length > 0,
  };
}
