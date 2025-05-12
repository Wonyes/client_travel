import Input from "@/hook/Input";
import { useInputStore } from "@/stores/useInputStore";

export default function RefundChange() {
  const {
    change: { changeRefund },
  } = useInputStore();
  return (
    <Input
      $maxW="100%"
      $pad="8px 12px"
      name="changeRefund"
      value={changeRefund}
      place="환불받을 계좌번호를 입력해주세요."
    />
  );
}
