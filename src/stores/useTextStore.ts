import { create } from "zustand";

export interface TextState {
  report: string;
  orderReject: string;
  productReview: string;
  counselInquiry: string;
  productInquiry: string;
}

interface TextActions {
  resetTextValues: () => void;
  setInitialText: (data: Partial<TextState>) => void;
  textChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const initialState: TextState = {
  report: "",
  orderReject: "",
  counselInquiry: "",
  productInquiry: "",
  productReview: "",
};

const MAX_LENGTH = 300;
const MAX_300 = ["productInquiry", "counselInquiry"];

export const useTextStore = create<TextState & TextActions>((set) => ({
  ...initialState,

  textChange: (e) => {
    const { name, value } = e.target;
    if (MAX_300.includes(name) && value.length > MAX_LENGTH) return;
    set((state) => ({
      ...state,
      [name]: value,
    }));
  },

  setInitialText: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  resetTextValues: () => set(initialState),
}));
