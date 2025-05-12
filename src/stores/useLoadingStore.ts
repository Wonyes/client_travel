import { create } from "zustand";

interface State {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<State>((set) => ({
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
