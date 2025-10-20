export interface BookSearchDocument {
  authors: string[];
  contents: string;
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
}

// isbn을 id로 사용
export interface Book extends BookSearchDocument {
  id: string;
}

export interface BookSearchResponse {
  documents: BookSearchDocument[];
  meta: BookSearchMeta;
}

export interface BookSearchData {
  books: Book[];
  meta: BookSearchMeta;
}

export interface BookSearchMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

// 책 검색 쿼리 파라미터
export interface BookSearchParams {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}
