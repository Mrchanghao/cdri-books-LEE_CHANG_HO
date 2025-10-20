"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode, useState } from "react";

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 60초 후 데이터 만료
            gcTime: 60 * 1000, // 60초 후 데이터 가비지 컬렉션
            retry: (failureCount, error) => {
              // 400 이상 500 미만은 재시도하지 않음
              if (
                error instanceof AxiosError &&
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500
              ) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false, // 컴포넌트
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
