"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib";

interface NavigationItem {
  href: string;
  label: string;
}

const navigationItems: NavigationItem[] = [
  { href: "/book-search", label: "도서 검색" },
  { href: "/my-picks", label: "내가 찜한 책" },
];

/**
 * Header 컴포넌트
 *
 * @description
 * - 브랜드 로고와 네비게이션 메뉴를 포함한 헤더
 * - 현재 페이지에 따른 활성 상태 표시
 * - 반응형 디자인 지원
 */
export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full  bg-brand-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 브랜드 로고 */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[24px] font-bold text-brand-dark transition-colors"
          >
            CERTICOS BOOKS
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center space-x-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative py-2 text-xl font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                )}
              >
                {item.label}
                {/* 활성 상태 하단 보더 */}
                {isActive && (
                  <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-brand-primary rounded-t-sm" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 오른쪽 공간 (향후 사용자 메뉴 등) */}
        <div className="flex items-center">
          {/* 향후 사용자 메뉴나 기타 액션 버튼들을 위한 공간 */}
        </div>
      </div>
    </header>
  );
}
