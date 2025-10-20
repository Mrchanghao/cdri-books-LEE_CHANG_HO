import { FavoritesWidget } from "@/widgets/my-picks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내가 찜한 책",
  description:
    "개인 즐겨찾기 목록을 관리하고 저장된 도서들을 확인할 수 있습니다. 즐겨찾기 추가, 제거, 상세 정보 조회가 가능합니다.",
  keywords: [
    "즐겨찾기",
    "내가 찜한 책",
    "도서 관리",
    "개인 도서 목록",
    "저장된 책",
    "도서 컬렉션",
  ],
  openGraph: {
    title: "내가 찜한 책 | CERTICOS BOOKS",
    description:
      "개인 즐겨찾기 목록을 관리하고 저장된 도서들을 확인할 수 있습니다.",
    url: "/my-picks",
  },
  twitter: {
    title: "내가 찜한 책 | CERTICOS BOOKS",
    description:
      "개인 즐겨찾기 목록을 관리하고 저장된 도서들을 확인할 수 있습니다.",
  },
  alternates: {
    canonical: "/my-picks",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function MyPicksPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-brand-dark">내가 찜한 책</h1>
      </header>
      <FavoritesWidget />
    </div>
  );
}
