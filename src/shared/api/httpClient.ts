import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY ?? ""}`,
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      error.response.data = {
        ...error.response.data,
        message:
          error.response.data?.message || "API 호출 중 오류가 발생했습니다.",
      };
    }
    return Promise.reject(error);
  }
);
