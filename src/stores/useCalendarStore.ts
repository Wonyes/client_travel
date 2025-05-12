import { create } from "zustand";

interface CalendarState {
  startDate: Date | null;
  pendingDate: Date | null;
  currentDate: Date;
  today: Date;

  isCalendarOpen: boolean;
}

interface CalendarActions {
  resetToggleCalendar: () => void;
  toggleCalendar: () => void;

  setToday: (date: Date) => void;
  setStartDate: (date: Date | null) => void;

  isDisabledDate: (date: Date) => boolean;
  isSameDate: (date1: Date | null, date2: Date | null) => boolean;
  updateDates: (newStartDate: Date | null, newEndDate: Date | null) => void;

  monthToggle: (newDate: Date) => void;
  dateClick: (clickedDateNumber: number) => void;
  moveMonth: (direction: "next" | "prev") => void;
  createClickedDate: (dayToRender: number) => Date;
  confirmSelection: () => void;
}

export const useCalendarStore = create<CalendarState & CalendarActions>((set, get) => ({
  startDate: null,
  pendingDate: null,
  currentDate: new Date(),
  today: new Date(),
  isCalendarOpen: false,

  setToday: (date) => set({ today: date }),
  setStartDate: (date) => set({ startDate: date }),

  isSameDate: (date1, date2) =>
    date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime(),

  isDisabledDate: (clickedDate) => {
    const { currentDate } = get();
    return clickedDate > currentDate;
  },

  updateDates: (newStartDate) => {
    set({
      startDate: newStartDate,
    });
  },

  moveMonth: (direction: "next" | "prev") => {
    const { today } = get();

    const newDate = new Date(
      today.getFullYear(),
      today.getMonth() + (direction === "next" ? 1 : -1),
      1
    );

    if (
      direction === "prev" &&
      today.getMonth() === new Date().getMonth() &&
      today.getFullYear() === new Date().getFullYear()
    ) {
      return;
    }

    set({ today: newDate });
  },
  createClickedDate: (dayToRender) => {
    const { today } = get();
    return new Date(today.getFullYear(), today.getMonth(), dayToRender);
  },

  dateClick: (clickedDateNumber) => {
    const { createClickedDate } = get();

    const clickedDate = createClickedDate(clickedDateNumber);

    // 선택된 날짜를 pendingDate에 저장
    set({ pendingDate: clickedDate });
  },

  monthToggle: (newDate) =>
    set((state) => {
      if (newDate >= state.currentDate && newDate <= state.currentDate) {
        return { today: newDate };
      }
      return state;
    }),

  resetToggleCalendar: () =>
    set(() => ({
      startDate: null,
      pendingDate: null,
      isCalendarOpen: false,
    })),

  toggleCalendar: () =>
    set((state) => ({
      pendingDate: null,
      isCalendarOpen: !state.isCalendarOpen,
    })),

  confirmSelection: () => {
    const { pendingDate } = get();
    if (pendingDate) {
      set({ startDate: pendingDate, isCalendarOpen: false });
    }
  },
}));
