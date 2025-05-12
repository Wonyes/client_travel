import { useCancelReason, useReturnReason } from "@/api/reactQuery/getQuery/useEnums";
import { Post } from "@/api/reactQuery/useMutations";
import DropDown from "@/hook/DropDown";
import { useOverlay } from "@/hook/useOverlay";
import { usePageStore } from "@/stores/usePageStore";
import { useMutation } from "@tanstack/react-query";

type AvailableCancelOrReturnState = "CANCEL_REQUEST" | "RETURN_REQUEST" | "RETURN_REJECT";

export default function ReturnFun({ refetch }: { refetch: () => void }) {
  const { getState } = usePageStore;
  const { data: returnData } = useReturnReason();
  const { data: cancelData } = useCancelReason();
  const { openConfirm, openModal } = useOverlay();

  const { mutate: orderClaim } = useMutation({
    mutationFn: ({ url, reason }: { url: string; reason?: { [x: string]: string } }) => {
      return Post({
        url: url,
        params: reason,
      });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const CancelFunc = (id: string, availableCancelOrReturnState: AvailableCancelOrReturnState) => {
    let paramState: string;
    let url: string;
    let reason: any;
    let title: string;

    switch (availableCancelOrReturnState) {
      case "CANCEL_REQUEST":
        paramState = "cancelReason";
        url = `client/product-order/${id}/cancel/request`;
        reason = cancelData;
        title = "취소 사유";
        break;

      case "RETURN_REQUEST":
        paramState = "returnReason";
        url = `client/product-order/${id}/return/request`;
        reason = returnData;
        title = "반품 사유";
        break;

      case "RETURN_REJECT":
        return openConfirm({
          title: "반품 철회를 하시겠습니까?",
          mainBtn: "확인",
          subBtn: "취소",
          onFunc() {
            orderClaim({
              url: `/client/product-order/${id}/return/cancel`,
            });
          },
        });

      default:
        throw new Error("Invalid state");
    }

    // 반품 요청 / 상품 취소
    openModal({
      title: title,
      content: (
        <DropDown
          name="reason"
          data={reason}
        />
      ),
      subBtn: "취소",
      mainBtn: "확인",
      onFunc() {
        const currentState = getState().state;
        orderClaim({
          url: url,
          reason: { [paramState]: currentState },
        });
      },
    });
  };

  return { CancelFunc };
}
