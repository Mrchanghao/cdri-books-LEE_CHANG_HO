export const queryKeys = {
  books: {
    search: (params: {
      query: string;
      sort?: "accuracy" | "latest";
      page?: number;
      size?: number;
      target?: "title" | "isbn" | "publisher" | "person";
    }) => ["books", "search", params] as const,
  },
  favorites: () => ["books", "favorites"] as const,
};
