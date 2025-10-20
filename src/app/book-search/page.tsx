import { BookSearchWidget } from "@/widgets/book-search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "도서 검색",
  description:
    "도서 검색 API를 활용하여 원하는 도서를 검색하고 상세 정보를 확인할 수 있습니다. 제목, 저자, 출판사별로 검색 가능합니다.",
  keywords: [
    "도서 검색",
    "책 검색",
    "도서 API",
    "도서 정보",
    "책 상세정보",
    "저자 검색",
    "출판사 검색",
  ],
  openGraph: {
    title: "도서 검색 | CERTICOS BOOKS",
    description:
      "도서 검색 API를 활용하여 원하는 도서를 검색하고 상세 정보를 확인할 수 있습니다.",
    url: "/book-search",
  },
  twitter: {
    title: "도서 검색 | CERTICOS BOOKS",
    description:
      "도서 검색 API를 활용하여 원하는 도서를 검색하고 상세 정보를 확인할 수 있습니다.",
  },
  alternates: {
    canonical: "/book-search",
  },
};

export default function BookSearchPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-brand-dark">도서 검색</h1>
      </header>
      <BookSearchWidget />
    </div>
  );
}
