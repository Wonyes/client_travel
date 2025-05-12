import { Between, Text } from "@/assets/style/common/useCommonStyle";
import Input from "@/hook/Input";
import { useInputStore } from "@/stores/useInputStore";

export default function NameChange() {
  const {
    change: { changeName },
  } = useInputStore();
  return (
    <>
      <Input
        $maxW="100%"
        $pad="8px 12px"
        name="changeName"
        value={changeName}
        place="변경할 이름을 입력해주세요."
      />
      <Between $pad="12px 0 0">
        <Text $class={["captionB"]}>2~10자 이내로 작성해 주세요.</Text>
        <Text $class={["captionB", "blue"]}>{changeName.length} / 10</Text>
      </Between>
    </>
  );
}
