"use client";

import { useCallback, useState } from "react";

import type { BookSearchParams } from "@/shared/types/book";

const DEFAULT_PARAMS: BookSearchParams = {
  query: "",
  page: 1,
  size: 10,
};

export function useBookSearchForm(initialQuery = "") {
  const [params, setParams] = useState<BookSearchParams>({
    ...DEFAULT_PARAMS,
    query: initialQuery,
  });

  const setQuery = useCallback((query: string) => {
    setParams((prev) => {
      console.log("setQuery called with:", query);
      return { ...prev, query, page: 1 };
    });
  }, []);

  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const setSize = useCallback((size: number) => {
    setParams((prev) => ({ ...prev, size, page: 1 }));
  }, []);

  const updateParams = useCallback((newParams: BookSearchParams) => {
    setParams(newParams);
  }, []);

  return {
    params,
    setQuery,
    setPage,
    setSize,
    setParams: updateParams,
  };
}
