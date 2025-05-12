import { Between, Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import ReturnFun from "./ReturnFun";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function OrderDetailInfo({ getDetail }: any) {
  const navigate = useNavigate();
  let at = "";
  switch (getDetail.cancelOrReturnState) {
    case "CANCEL_DONE":
      at = getDetail.cancelRequestAt;
      break;
    case "RETURN_REQUEST":
      at = getDetail.returnRequestAt;
      break;
    default:
      at = "";
      break;
  }

  const { CancelFunc } = ReturnFun({ refetch: () => navigate("/my-page/order-service/order") });

  return (
    <>
      {/* 예매정보 */}
      <MorphismBox $pad="12px">
        <Text $pad="0 0 8px">예매정보</Text>
        <Column
          $w="100%"
          $gap="8px"
          $pad="12px"
          $radius="4px"
          $bor="1px solid var(--c-line)"
        >
          <Column>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                티켓번호
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.ticketKey ?? "-"}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                관람일
              </Text>
              <Text
                $minW="80px"
                $class={["subText", "blue"]}
                $tAlign="right"
              >
                {getDetail.directOption}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                예매일
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {format(getDetail.purchaseAt, "yyyy-MM-dd hh:mm")}
              </Text>
            </Between>

            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                예매자명
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.purchaseUserName ?? "없음"}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                예매자 번호
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.phoneNumber ?? "없음"}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                사용가능 상태
              </Text>
              <Text
                $minW="80px"
                $class={["subText", "red"]}
                $tAlign="right"
              >
                {getDetail.ticketUsedStateMeaning}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                발급상태
              </Text>
              <Text
                $minW="80px"
                $class={["", "red"]}
                $tAlign="right"
              >
                {getDetail.cancelOrReturnStateMeaning === "-"
                  ? getDetail.ticketStateMeaning
                  : getDetail.cancelOrReturnStateMeaning}
              </Text>
            </Between>

            {(getDetail.cancelOrReturnState === "RETURN_REJECT" ||
              getDetail.cancelOrReturnState === "CANCEL_DONE" ||
              getDetail.cancelOrReturnState === "RETURN_REQUEST") && (
              <>
                <Between>
                  <Text
                    $minW="80px"
                    $class={["subText", "gray300"]}
                  >
                    반품/취소 사유
                  </Text>
                  <Text
                    $minW="80px"
                    $class={["", "red"]}
                    $tAlign="right"
                  >
                    {getDetail.cancelOrReturnReason}
                  </Text>
                </Between>
                <Between>
                  <Text
                    $minW="80px"
                    $class={["subText", "gray300"]}
                  >
                    반품/취소일
                  </Text>
                  <Text
                    $minW="80px"
                    $class={["", "red"]}
                    $tAlign="right"
                  >
                    {at}
                  </Text>
                </Between>
              </>
            )}
          </Column>
        </Column>
      </MorphismBox>

      {/* 결제정보  */}
      <MorphismBox $pad="12px">
        <Text $pad="0 0 8px"> 결제정보</Text>
        <Column
          $w="100%"
          $gap="8px"
          $pad="12px"
          $radius="4px"
          $bor="1px solid var(--c-line)"
        >
          <Column>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                예매수량
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.purchaseQuantity} 매
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                결제수단
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.paymentMethod}
              </Text>
            </Between>

            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                상품금액
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.productPrice?.toLocaleString()}원
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                할인금액
              </Text>
              <Text
                $minW="80px"
                $class={["subText", "blue"]}
                $tAlign="right"
              >
                -{getDetail.totalProductDiscountAmount?.toLocaleString()}원
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                총 상품금액
              </Text>
              <Text
                $minW="80px"
                $class={"subText"}
                $tAlign="right"
              >
                {getDetail.totalProductPrice?.toLocaleString()}원
              </Text>
            </Between>

            <Between>
              <Text $minW="80px">총 결제 금액</Text>
              <Row $gap="4px">
                {getDetail.productDiscountRate && (
                  <Text
                    $tAlign="right"
                    $class="red"
                  >
                    {getDetail.productDiscountRate}%
                  </Text>
                )}
                <Text $tAlign="right">{getDetail.purchasePrice?.toLocaleString()}원</Text>
              </Row>
            </Between>
          </Column>
        </Column>
      </MorphismBox>

      {getDetail.availableCancelOrReturnState !== "NOTHING" && (
        <MorphismBox $pad="8px 12px">
          <Row
            $w="100%"
            as="button"
            $jus={"flex-end"}
            $cursor="pointer"
            onClick={() => CancelFunc(getDetail.id, getDetail.availableCancelOrReturnState)}
          >
            <Text $class={["captionB", "gray888"]}>
              {getDetail.availableCancelOrReturnStateMeaning}
            </Text>
          </Row>
        </MorphismBox>
      )}
    </>
  );
}
