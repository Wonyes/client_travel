import { create } from "zustand";

interface SearchState {
  search: string;
  recentKeyword: { id: number; name: string }[];
}

interface MemberState {
  memberName: string;
  memberPhone: string;
}

interface ChangeState {
  changeName: string;
  changeNick: string;
  changePhone: string;
  changeRefund: string;
  changePassword: string;
  changePasswordCheck: string;
}
interface State {
  search: SearchState;
  member: MemberState;
  change: ChangeState;
}

interface Actions {
  resetInput: () => void;
  setInitialInput: (data: Partial<State>) => void;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRecentKeyword: (data: { id: number; name: string }[]) => void;
}

const initialState: State = {
  search: {
    search: "",
    recentKeyword: [],
  },
  member: {
    memberName: "",
    memberPhone: "",
  },
  change: {
    changeName: "",
    changeNick: "",
    changePhone: "",
    changeRefund: "",
    changePassword: "",
    changePasswordCheck: "",
  },
};

export const useInputStore = create<Actions & State>((set) => ({
  ...initialState,

  setInitialInput: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  inputChange: (e) => {
    const { name, value } = e.target;

    set((state) => {
      const safeValue = value ?? "";
      // search 상태 업데이트
      if (name in state.search) {
        return { ...state, search: { ...state.search, [name]: safeValue } };
      }

      // member 상태 업데이트
      if (name in state.member) {
        if (name === "memberPhone") {
          const result = safeValue
            ?.replace(/[^0-9]/g, "")
            ?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            ?.replace(/(-{1,2})$/g, "");

          return {
            ...state,
            member: { ...state.member, [name]: result },
          };
        }
        return { ...state, member: { ...state.member, [name]: safeValue } };
      }

      // change 상태 업데이트
      if (name in state.change) {
        if (name === "changePhone") {
          const result = safeValue
            ?.replace(/[^0-9]/g, "")
            ?.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
            ?.replace(/(-{1,2})$/g, "");

          return {
            ...state,
            change: { ...state.change, [name]: result },
          };
        }
        return { ...state, change: { ...state.change, [name]: safeValue } };
      }

      return state;
    });
  },

  setRecentKeyword: (keywords) =>
    set((state) => ({
      ...state,
      search: { ...state.search, recentKeyword: keywords },
    })),

  resetInput: () =>
    set((state) => ({
      ...initialState,
      search: {
        ...initialState.search,
        recentKeyword: state.search.recentKeyword,
      },
    })),
}));
