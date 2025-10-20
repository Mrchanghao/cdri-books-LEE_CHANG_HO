# 📚 Book Search - 도서 검색

> Feature-Sliced Design(FSD) 아키텍처를 기반으로 구축된 현대적인 도서 검색 및 즐겨찾기 웹

## 🎯 프로젝트 개요

해당 프로젝트는 카카오 도서 검색 API를 활용하여 사용자가 원하는 도서를 검색하고, 관심 있는 도서를 즐겨찾기로 관리할 수 있는 프로젝트입니다.

### 주요 기능

- 도서 검색 기능: 다음 카카오 API를 통한 빠른 도서 검색
- 고급 검색 기능: 제목, 출판사, 저자명별 상세 검색 옵션
- 검색 기록 관리: 최대 8개의 검색 기록 자동 저장 및 관리
- 즐겨찾기 시스템: 관심 있는 도서를 즐겨찾기로 저장
- UI/UX: Tailwind CSS와 shadcn/ui를 활용 디자인

## 실행 방법 및 환경 설정

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저

### 설치 및 실행

1. 저장소 클론

```bash
git clone <repository-url>
cd cdri
```

2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

3. 환경 변수 설정
   `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_KAKAO_API_KEY=your_kakao_api_key_here
```

4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

5. 브라우저에서 확인

```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 📁 폴더 구조 및 주요 코드 설명

### Feature-Sliced Design (FSD) 아키텍처

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── book-search/       # 도서 검색 페이지
│   ├── my-picks/          # 즐겨찾기 페이지
│   └── layout.tsx         # 루트 레이아웃
├── entities/              # 비즈니스 엔티티
│   └── book/              # 도서 관련 로직
│       ├── api/           # API 호출 함수
│       ├── model/         # 비즈니스 로직 훅
│       └── ui/            # 도서 관련 UI 컴포넌트
├── features/              # 기능 단위
│   ├── book-search/       # 도서 검색 기능
│   └── favorites/         # 즐겨찾기 기능
├── widgets/               # 복합 UI 위젯
│   ├── book-search/       # 도서 검색 위젯
│   └── my-picks/          # 즐겨찾기 위젯
├── shared/                # 공유 리소스
│   ├── api/               # HTTP 클라이언트
│   ├── config/            # 설정 파일
│   ├── lib/               # 유틸리티 함수
│   ├── types/             # TypeScript 타입 정의
│   └── ui/                # 공통 UI 컴포넌트
└── processes/             # 비즈니스 프로세스 (향후 확장)
```

### 주요 코드 설명

#### 1. 도서 검색 기능 (`features/book-search/`)

- `useBookSearchForm.ts`: 검색 폼 상태 관리
- `useSearchHistory.ts`: 검색 기록 관리 (localStorage 기반)
- `BookSearchForm.tsx`: 검색 입력 폼 컴포넌트
- `SearchHistoryDropdown.tsx`: 검색 기록 드롭다운

#### 2. 즐겨찾기 기능 (`features/favorites/`)

- `useFavorites.ts`: 즐겨찾기 상태 관리 훅
- `favoritesStore.ts`: 즐겨찾기 전역 상태 스토어
- `FavoriteList.tsx`: 즐겨찾기 목록 컴포넌트

#### 3. 도서 엔티티 (`entities/book/`)

- `searchBooks.ts`: 카카오 API 호출 함수
- `useBookSearch.ts`: 도서 검색 React Query 훅
- `BookCard.tsx`: 도서 카드 컴포넌트 (아코디언 기능 포함)

#### 4. 공유 리소스 (`shared/`)

- `httpClient.ts`: Axios 기반 HTTP 클라이언트
- `queryKeys.ts`: React Query 키 관리
- `ui/`: 재사용 가능한 UI 컴포넌트들

## 라이브러리 선택 이유

### 사용 프레임워크 및 라이브러리

- Next.js 14: App Router를 통한 React 프레임워크
- React 18: 최신 React 기능과 성능 최적화

### 상태 관리 및 데이터 페칭

- @tanstack/react-query: 서버 상태 관리 및 캐싱
- use-sync-external-store: SSR 호환 클라이언트 상태 관리

### UI 및 스타일링

- Tailwind CSS: CSS 프레임워크
- shadcn/ui: 고품질 재사용 가능한 컴포넌트
- Lucide React: 일관된 아이콘 시스템

### 이미지 최적화

- @svgr/webpack: SVG를 React 컴포넌트로 변환

### 개발 도구

- Axios: HTTP 클라이언트
- tailwind-merge: Tailwind의 클래스 병합하기 위해 사용

### 1. 검색 기록 관리

```typescript
// 최대 8개 검색 기록 자동 관리
const { history, addQuery, removeQuery, clearHistory } = useSearchHistory();
```

- 자동 저장: 검색 시 자동으로 기록 저장
- 중복 제거: 동일한 검색어는 최신으로 이동
- 브라우저 동기화: localStorage 기반 영속화
- 직관적 UI: 드롭다운으로 검색 기록 표시

### 2. 아코디언 도서 카드

```tsx
<BookCard
  book={book}
  onToggleFavorite={handleToggle}
  onPurchase={handlePurchase}
  showDetailsButton={true}
/>
```

- 3컬럼 레이아웃: 썸네일, 정보, 액션 버튼
- 아코디언 상세보기: 클릭 시 상세 정보 확장
- 구매/즐겨찾기: 원클릭 액션 버튼
- 반응형 디자인: 모바일 최적화

### 3. SSR 호환 상태 관리

```typescript
// useSyncExternalStore를 활용한 SSR 안전 상태 관리
const favorites = useSyncExternalStore(
  favoritesStore.subscribe,
  favoritesStore.getSnapshot,
  favoritesStore.getServerSnapshot
);
```

- 하이드레이션 안전: 서버-클라이언트 상태 일치
- 탭 동기화: 다른 탭에서의 변경사항 실시간 동기화
- 에러 복구: localStorage 오류 시 안전한 폴백

### 4. Feature-Sliced Design 아키텍처

- 계층 분리: 명확한 책임 분리로 유지보수성 향상
- 재사용성: 컴포넌트와 로직의 높은 재사용성
- 확장성: 새로운 기능 추가 시 기존 코드 영향 최소화
- 테스트 용이성: 각 계층별 독립적 테스트 가능

### 5. 이미지 최적화 시스템

```typescript
// Intersection Observer를 활용한 지연 로딩
const { shouldShowImage, shouldShowSkeleton } = useImageLazyLoading({
  src: book.thumbnail,
  priority: false,
  placeholder: "blur",
  blurDataURL: createBlurDataURLBySize("sm"),
});
```

- 지연 로딩: 뷰포트에 들어올 때만 이미지 로드
- Next.js Image: 자동 WebP 변환 및 크기 최적화
- 성능 최적화: 불필요한 이미지 로드 방지

### 6. 타입 안전성

```typescript
interface BookSearchParams {
  query: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
}
```

- 완전한 타입 정의: API부터 UI까지 전체 타입 체크
- 런타임 안전성: 컴파일 타임 오류 방지

### 이미지 최적화 전략

#### 1. **지연 로딩 (Lazy Loading)**

```typescript
// Intersection Observer를 활용한 성능 최적화
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      setIsInView(true);
      observer.disconnect();
    }
  },
  { threshold: 0.1, rootMargin: "50px" }
);
```

- 뷰포트 감지: 이미지가 화면에 보일 때만 로드
- 대역폭 절약: 불필요한 이미지 로드 방지

#### 2. Blur Placeholder 시스템

```typescript
// Canvas API를 활용한 동적 blur 생성
const createBlurDataURL = (options: BlurDataURLOptions) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // 그라디언트 기반 blur placeholder 생성
  return canvas.toDataURL();
};
```

- Skeleton UI: 로딩 중 시각적 피드백 제공
- 동적 생성: 크기별 맞춤형 placeholder
- 부드러운 전환: 이미지 로드 시 자연스러운 애니메이션

#### 3. Next.js Image 최적화

```typescript
<Image
  src={book.thumbnail}
  alt={book.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isPriority}
  placeholder="blur"
  blurDataURL={blurDataURL}
/>
```

### 데이터 캐싱

#### 1. React Query 캐싱

```typescript
// 검색 결과 5분간 캐싱
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분
    },
  },
});
```

- 검색 결과 캐싱: 동일한 검색어 재검색 시 즉시 응답
- 메모리 효율성: 사용하지 않는 데이터 자동 정리
- 오프라인 지원: 캐시된 데이터로 오프라인 검색 가능

#### 2. 즐겨 찾기 기능 IndexedDB에 저장

```typescript
// 즐겨찾기 데이터 영구 저장
const favoritesStore = {
  add: async (book: Book) => {
    await db.favorites.add(book);
    notifyListeners();
  },
};
```

## 개발 가이드라인

### 컴포넌트 개발

- 재사용성 우선: 공통 UI 컴포넌트 활용
- Props 인터페이스: 명확한 타입 정의

### 상태 관리

- React Query: 서버 상태 관리
- Custom Hooks: 클라이언트 상태 캡슐화
- useSyncExternalStore: 전역 상태 관리

### 이미지 최적화 가이드라인

- 지연 로딩 필수: 모든 이미지에 Intersection Observer 적용
- Blur Placeholder: 로딩 상태에 대한 시각적 피드백 제공
- 반응형 이미지: 다양한 화면 크기에 최적화된 이미지 제공
- WebP 우선: 최신 브라우저에서 WebP 포맷 사용

## 고급 검색 사용법

### 검색 조건 선택

1. 제목 검색: 도서 제목에서 검색어 포함 검색
2. 출판사 검색: 출판사명으로 도서 검색
3. 저자명 검색: 저자 이름으로 도서 검색

### 사용 방법

1. "상세 검색" 버튼 클릭
2. 검색 조건 선택 (제목/출판사/저자명)
3. 검색어 입력
4. "검색하기" 버튼 클릭 또는 Enter 키
