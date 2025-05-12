import Input from "@/hook/Input";
import { useInputStore } from "@/stores/useInputStore";

export default function PhoneChange() {
  const {
    change: { changePhone },
  } = useInputStore();
  return (
    <Input
      $maxW="100%"
      $pad="8px 12px"
      name="changePhone"
      value={changePhone}
      place="변경할 전화번호를 입력해주세요."
    />
  );
}
