"use client";

interface BookInfoProps {
  title: string;
  authors: string[];
  publisher?: string;
  contents?: string;
  showContents?: boolean;
  className?: string;
}

/**
 * 도서 기본 정보를 표시하는 컴포넌트
 *
 * @description
 * - 제목, 저자, 출판사 정보 표시
 * - 선택적으로 내용(contents) 표시
 * - 다양한 레이아웃에 재사용 가능
 */
export function BookInfo({
  title,
  authors,

  contents,
  showContents = false,
  className = "",
}: BookInfoProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2 min-w-0">
        <h3 className="text-lg font-semibold leading-tight text-brand-dark">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{authors.join(", ")}</p>
      </div>

      {showContents && contents && (
        <p className="line-clamp-2 text-sm text-gray-600">{contents}</p>
      )}
    </div>
  );
}
