import DropDown from "@/hook/DropDown";
import TextFiled from "@/hook/TextFiled";
import { useTextStore } from "@/stores/useTextStore";
import { Column, Text } from "@/assets/style/common/useCommonStyle";

export default function Report() {
  const { report } = useTextStore();
  return (
    <Column $gap="8px">
      <DropDown />
      <TextFiled
        name="report"
        value={report}
        place="신고 사유를 입력해 주세요."
      />
      <Text $class={["caption", "red"]}>리뷰신고 사유를 자세히 작성해 주세요.</Text>
    </Column>
  );
}
