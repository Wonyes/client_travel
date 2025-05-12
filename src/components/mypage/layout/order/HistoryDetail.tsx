import { useLocation, useParams } from "react-router-dom";

import {
  Column,
  Img,
  LineSection,
  MorphismBox,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";
import { useOrderDetail } from "@/api/reactQuery/getQuery/useMy";
import Loading from "@/hook/Loading";
import OrderDetailInfo from "./OrderDetailInfo";
import ClaimDetailInfo from "./ClaimDetailInfo";
import { format } from "date-fns";

export default function HistoryDetail() {
  const { pathname } = useLocation();
  const { orderId } = useParams();

  const viewIf = pathname.includes("order-detail");

  const detailUrl = `client/product-order/detail/${orderId}`;
  const { data: getDetail, isLoading } = useOrderDetail(detailUrl);

  if (isLoading) return <Loading />;

  return (
    <Column $gap="12px">
      <MorphismBox $pad="12px">
        <Row $gap="12px">
          <ThumbnailWrap
            $h="auto"
            $radius="8px"
            $maxH="140px"
            $maxW="140px"
          >
            <ThumbnailBox $aspect="1/1">
              <Img
                src={getDetail.pri}
                $w="100%"
                $h="100%"
                loading="lazy"
                alt="상품 이미지"
                $objectFit="cover"
                $radius="8px"
              />
            </ThumbnailBox>
          </ThumbnailWrap>

          <Column
            $w="100%"
            $gap="8px"
          >
            <Column $gap="4px">
              <WrapperText $class="captionB">{getDetail.productName}</WrapperText>
              <LineSection
                $w="100%"
                $borB="1px solid var(--c-line)"
              />
            </Column>

            <Column>
              <Row>
                <Text
                  $minW="90px"
                  $class={["caption", "gray300"]}
                >
                  예매번호
                </Text>
                <Text
                  $minW="90px"
                  $class={"captionB"}
                >
                  {getDetail.channelProductOrderId}
                </Text>
              </Row>
              <Row>
                <Text
                  $minW="90px"
                  $class={["caption", "gray300"]}
                >
                  예매일
                </Text>
                <Text
                  $minW="90px"
                  $class={"captionB"}
                >
                  {format(getDetail.purchaseAt, "yyyy-MM-dd hh:mm")}
                </Text>
              </Row>
              <Row>
                <Text
                  $minW="90px"
                  $class={["caption", "gray300"]}
                >
                  관람일
                </Text>
                <Text
                  $minW="90px"
                  $class={"captionB"}
                >
                  {getDetail.directOption}
                </Text>
              </Row>
              <Row>
                <Text
                  $minW="90px"
                  $class={["caption", "gray300"]}
                >
                  상태
                </Text>
                <WrapperText $class={["captionB", "blue"]}>
                  {getDetail.ticketStateMeaning}
                </WrapperText>
              </Row>

              <Row>
                <Text
                  $minW="90px"
                  $class={["caption", "gray300"]}
                >
                  사용여부
                </Text>
                <Row $gap="4px">
                  <WrapperText
                    $class={[
                      "captionB",
                      getDetail.ticketUsedStateMeaning === "사용 불가능" ? "red" : "blue",
                    ]}
                  >
                    {getDetail.ticketUsedStateMeaning}
                  </WrapperText>
                </Row>
              </Row>

              {getDetail.cancelOrReturnStateMeaning !== "-" && (
                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    취소/반품 상태
                  </Text>
                  <WrapperText $class={["captionB", "red"]}>
                    {getDetail.cancelOrReturnStateMeaning}
                  </WrapperText>
                </Row>
              )}
            </Column>
          </Column>
        </Row>
      </MorphismBox>
      {viewIf ? (
        <OrderDetailInfo getDetail={getDetail} />
      ) : (
        <ClaimDetailInfo getDetail={getDetail} />
      )}
    </Column>
  );
}
