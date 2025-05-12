import { SelectBox } from "@/assets/style/common/useCommonStyle";
import CalendarBody from "./CalendarBody";
import DateView from "./DateView";
import { useCalendarStore } from "@/stores/useCalendarStore";

export default function Calendar() {
  const { isCalendarOpen } = useCalendarStore();

  return (
    <>
      <SelectBox>
        <DateView />
      </SelectBox>
      {isCalendarOpen && <CalendarBody />}
    </>
  );
}
