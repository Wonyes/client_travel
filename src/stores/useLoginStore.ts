import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedData {
  exp: number;
  iat: number;
  nickname: string;
  role: string;
  sub: string;
}
interface LoginState {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  accessToken?: string;
  decoded: DecodedData | null;
}

const loginCheck = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const accessToken = localStorage.getItem("access-token");
  const refreshToken = localStorage.getItem("refresh-token");
  return !!(accessToken && refreshToken);
};

const getAccessToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem("access-token");
};

const getDecodedData = (token: string | null): DecodedData | null => {
  return token ? jwtDecode<DecodedData>(token) : null;
};

const initialState: LoginState = {
  isLogin: loginCheck(),
  setIsLogin: () => {},
  accessToken: getAccessToken(),
  decoded: getDecodedData(getAccessToken()),
};

export const useLoginStore = create<LoginState>((set) => ({
  ...initialState,
  setIsLogin: (isLogin) => set({ isLogin }),

  accessToken: getAccessToken(),
}));
