import axios from "axios-typescript";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_IP}/v1/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */

api.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.

    const accessToken = localStorage.getItem("access-token");
    const refreshToken = localStorage.getItem("refresh-token");

    try {
      if (accessToken) {
        config.headers.req = refreshToken;
        config.headers.Authorization = accessToken;
      }

      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err.response);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */

api.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["authorization"];

    if (accessToken) {
      localStorage.setItem("access-token", response.headers["authorization"]);
    }
    return response;
  },
  (error) => {
    // 전역 에러 처리
    if (error.response) {
      console.error("error", error.response);
    }

    return Promise.reject(error);
  }
);

export default api;
