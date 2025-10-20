import type { Book } from "@/shared/types/book";

// IndexedDB 설정
const DB_NAME = "BookFavoritesDB";
const DB_VERSION = 1;
const STORE_NAME = "favorites";

// 상태 변경을 구독하는 리스너 타입
type Listener = (favorites: Book[]) => void;

// 전역 상태 변수들
let favorites: Book[] = []; // 즐겨찾기 목록
const listeners = new Set<Listener>(); // 구독자 목록
let initialized = false; // 초기화 여부
let initPromise: Promise<void> | null = null; // 초기화 Promise

/**
 * IndexedDB를 열고 반환하는 함수
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

/**
 * IndexedDB에서 즐겨찾기 데이터를 읽어오는 함수
 * SSR 환경에서는 빈 배열을 반환
 */
async function readFromStorage(): Promise<Book[]> {
  if (typeof window === "undefined") {
    return favorites;
  }

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const result = request.result || [];
        // timestamp 필드 제거하고 Book 타입으로 변환
        const books = result.map((item: Book & { timestamp: number }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { timestamp, ...book } = item;
          return book;
        });
        resolve(books);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn(
      "인덱스 DB에서 즐겨찾기 데이터를 읽어오는 데 실패했습니다.",
      error
    );
    return favorites;
  }
}

/**
 * IndexedDB에 즐겨찾기 데이터를 저장하는 함수
 * SSR 환경에서는 아무것도 하지 않음
 */
async function writeToStorage(next: Book[]) {
  if (typeof window === "undefined") return;

  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // 기존 데이터 삭제
    await new Promise<void>((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
    });

    // 새 데이터 저장 (timestamp 추가)
    for (const book of next) {
      await new Promise<void>((resolve, reject) => {
        const addRequest = store.add({ ...book, timestamp: Date.now() });
        addRequest.onsuccess = () => resolve();
        addRequest.onerror = () => reject(addRequest.error);
      });
    }
  } catch (error) {
    console.warn(
      "즐겨찾기 정보를 IndexedDB에 저장하는 데 실패했습니다.",
      error
    );
  }
}

/**
 * 스토어를 초기화하는 함수
 * 한 번만 실행되도록 initialized 플래그로 제어
 */
async function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;

  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      favorites = await readFromStorage(); // IndexedDB에서 데이터 로드
      initialized = true;
    } catch (error) {
      console.error("즐겨찾기 스토어를 초기화하는 데 실패했습니다.", error);
      initialized = true; // 오류가 발생해도 초기화 완료로 처리
    }
  })();

  return initPromise;
}

/**
 * 모든 구독자에게 현재 상태를 알리는 함수
 */
function emit() {
  listeners.forEach((listener) => listener(favorites));
}

/**
 * 즐겨찾기 목록을 설정하고 IndexedDB에 저장한 후 구독자들에게 알림
 */
async function setFavorites(next: Book[]) {
  await ensureInitialized();
  favorites = next; // 상태 업데이트
  await writeToStorage(favorites); // IndexedDB에 저장
  emit(); // 구독자들에게 알림
}

/**
 * 즐겨찾기 스토어 객체
 * useSyncExternalStore와 호환되는 인터페이스를 제공
 */
export const favoritesStore = {
  _serverSnapshot: [] as Book[], // 서버 스냅샷 캐시
  _emptySnapshot: [] as Book[], // 빈 스냅샷 캐시
  /**
   * 상태 변경을 구독하는 함수
   * useSyncExternalStore의 subscribe 함수로 사용됨
   */
  subscribe(listener: Listener) {
    // 비동기 초기화를 시작하지만 구독은 즉시 등록
    ensureInitialized().then(() => {
      listener(favorites); // 초기화 완료 후 현재 상태 전달
    });

    listeners.add(listener); // 구독자 추가
    return () => {
      listeners.delete(listener); // 구독 해제 함수 반환
    };
  },

  /**
   * 현재 상태를 반환하는 함수
   * useSyncExternalStore의 getSnapshot 함수로 사용됨
   */
  getSnapshot() {
    // 초기화가 완료되지 않았으면 빈 배열 반환
    if (!initialized) {
      if (!favoritesStore._emptySnapshot) {
        favoritesStore._emptySnapshot = [];
      }
      return favoritesStore._emptySnapshot;
    }
    return favorites;
  },

  /**
   * 서버 사이드에서 사용할 스냅샷 함수
   * SSR 환경에서는 빈 배열을 반환
   */
  getServerSnapshot() {
    // 캐싱을 위해 항상 같은 빈 배열 참조를 반환
    if (!favoritesStore._serverSnapshot) {
      favoritesStore._serverSnapshot = [];
    }
    return favoritesStore._serverSnapshot;
  },

  /**
   * 즐겨찾기 상태를 토글하는 함수
   * 이미 즐겨찾기인 책이면 제거, 아니면 추가
   */
  async toggle(book: Book) {
    await ensureInitialized();
    const exists = favorites.some((item) => item.isbn === book.id);
    await setFavorites(
      exists
        ? favorites.filter((item) => item.isbn !== book.id) // 제거
        : [...favorites, book] // 추가
    );
  },

  /**
   * 모든 즐겨찾기를 초기화하는 함수
   */
  async clear() {
    await ensureInitialized();
    await setFavorites([]);
  },

  /**
   * 즐겨찾기 추가 함수
   */
  async add(book: Book) {
    await ensureInitialized();
    if (!favorites.some((item) => item.isbn === book.id)) {
      await setFavorites([...favorites, book]);
    }
  },

  /**
   * 즐겨찾기 제거 함수
   */
  async remove(bookIsbn: string) {
    await ensureInitialized();
    await setFavorites(favorites.filter((item) => item.isbn !== bookIsbn));
  },

  /**
   * 즐겨찾기 여부 확인 함수
   */
  async isFavorite(bookIsbn: string): Promise<boolean> {
    await ensureInitialized();
    return favorites.some((item) => item.isbn === bookIsbn);
  },

  /**
   * 즐겨찾기 개수 반환 함수
   */
  async getCount(): Promise<number> {
    await ensureInitialized();
    return favorites.length;
  },
};

// IndexedDB 초기화 함수
export const initializeFavoritesDB = async (): Promise<void> => {
  try {
    await openDB();
  } catch (error) {
    console.error("인덱스 DB 초기화 실패", error);
  }
};
