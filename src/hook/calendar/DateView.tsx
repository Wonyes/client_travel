import { Between, Img, Text } from "@/assets/style/common/useCommonStyle";
import { useCalendarLogic } from "./useCalendarLogic";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { useImg } from "@/assets/style/common/useImg";

export default function DateView() {
  const { getFormattedDateRange } = useCalendarLogic();
  const { toggleCalendar } = useCalendarStore();

  const { upDownArrow } = useImg();
  return (
    <Between
      $gap="8px"
      $align="center"
      $cursor="pointer"
      onClick={toggleCalendar}
    >
      <Text $class="subText">
        {getFormattedDateRange() ? getFormattedDateRange() : "날짜 선택"}
      </Text>
      <Img src={upDownArrow} />
    </Between>
  );
}
