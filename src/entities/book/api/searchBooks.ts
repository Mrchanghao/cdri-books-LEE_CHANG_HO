import type { BookSearchParams, BookSearchResponse } from "@/shared/types/book";
import { httpClient } from "@/shared/api";

export async function searchBooks(
  params: BookSearchParams
): Promise<BookSearchResponse> {
  const response = await httpClient.get<BookSearchResponse>("/v3/search/book", {
    params: {
      query: params.query.trim(),
      sort: params.sort ?? "accuracy",
      page: Math.max(1, Math.min(50, params.page ?? 1)),
      size: Math.max(1, Math.min(50, params.size ?? 10)),
      target: params.target,
    },
  });

  return response.data;
}
