import { Between, Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import { format } from "date-fns";

export default function ClaimDetailInfo({ getDetail }: any) {
  return (
    <>
      {/* 예매정보 */}
      <MorphismBox $pad="12px">
        <Text $pad="0 0 8px">환불 신청 정보</Text>
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
                예매일
              </Text>
              <Text
                $minW="80px"
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
                관람일
              </Text>
              <Text
                $minW="80px"
                $class={["", "blue"]}
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
                발급상태
              </Text>
              <Text
                $minW="80px"
                $class={["subText", "red"]}
                $tAlign="right"
              >
                {getDetail.cancelOrReturnStateMeaning === "-"
                  ? getDetail.ticketStateMeaning
                  : getDetail.cancelOrReturnStateMeaning}
              </Text>
            </Between>
            <Between>
              <Text
                $minW="80px"
                $class={["subText", "gray300"]}
              >
                취소사유
              </Text>
              <Text
                $minW="80px"
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
                취소요청일
              </Text>
              <Text
                $minW="80px"
                $class={["", "red"]}
                $tAlign="right"
              >
                {getDetail.cancelRequestAt.slice(0, 10)}
              </Text>
            </Between>
          </Column>
        </Column>
      </MorphismBox>

      {/* 환불정보  */}
      <MorphismBox $pad="12px">
        <Text $pad="0 0 8px"> 환불 정보</Text>
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
                개별 상품금액
              </Text>
              <Text
                $minW="80px"
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
                예매수량
              </Text>
              <Text
                $minW="80px"
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
                할인금액
              </Text>
              <Text
                $minW="80px"
                $class={["", "blue"]}
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
                $tAlign="right"
              >
                {getDetail.totalProductPrice?.toLocaleString()}원
              </Text>
            </Between>

            <Between>
              <Text $minW="80px">환불 예정 금액</Text>
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

      <MorphismBox $pad="8px 12px">
        <Row $jus={"flex-start"}>
          <Text
            as="button"
            $class={["captionB", "red"]}
          >
            환불 심사가 완료된 후 영업일 기준 3일이내 환불이 완료됩니다.
          </Text>
        </Row>
      </MorphismBox>
    </>
  );
}
