import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/shared/lib/queryKeys";
import type {
  BookSearchParams,
  BookSearchResponse,
  BookSearchData,
} from "@/shared/types/book";
import { searchBooks } from "../api/searchBooks";

export function useBookSearch(params: BookSearchParams) {
  const { data, error, isLoading, isFetching, isError } = useQuery<
    BookSearchResponse,
    Error,
    BookSearchData
  >({
    queryKey: queryKeys.books.search({
      query: params.query,
      sort: params.sort,
      page: params.page,
      size: params.size,
      target: params.target,
    }),
    queryFn: () => searchBooks(params),
    enabled: Boolean(params.query?.trim()),
    select: (response) => ({
      books: response.documents.map((doc) => ({
        ...doc,
        id: doc.isbn || doc.url,
      })),
      meta: response.meta,
    }),
  });

  return {
    books: data?.books ?? [],
    meta: data?.meta,
    error,
    isLoading,
    isFetching,
    isError,
  };
}
