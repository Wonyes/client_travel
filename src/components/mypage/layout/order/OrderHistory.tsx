import { useNavigate } from "react-router-dom";

import {
  Between,
  Column,
  Fix,
  Img,
  LineSection,
  MorphismBox,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";

import { LineBtn } from "@/hook/useButton";
import { usePageStore } from "@/stores/usePageStore";
import { useOrderList } from "@/api/reactQuery/getQuery/useMy";
import Loading from "@/hook/Loading";
import NoItem from "@/components/common/NoItem";
import { format } from "date-fns";
import Paging from "@/hook/paging/Paging";
import ReturnFun from "./ReturnFun";

export default function OrderHistory() {
  const navigate = useNavigate();
  const { currentPage, size } = usePageStore();
  const { data: getOrder, refetch, isLoading } = useOrderList({ page: currentPage, size });

  const { CancelFunc } = ReturnFun({ refetch });

  if (isLoading) return <Loading />;

  return (
    <>
      {getOrder.content.length === 0 ? (
        <NoItem text="구매내역이 없습니다." />
      ) : (
        <Column $gap="8px">
          {getOrder &&
            getOrder.content.map(
              ({
                id,
                pri,
                productId,
                purchaseAt,
                productName,
                directOption,
                ticketStateMeaning,
                channelProductOrderId,
                ticketUsedStateMeaning,
                cancelOrReturnStateMeaning,
                availableCancelOrReturnState,
                availableCancelOrReturnStateMeaning,
              }) => {
                return (
                  <MorphismBox
                    key={id}
                    $pad="12px"
                  >
                    <Row $gap="12px">
                      <ThumbnailWrap
                        $h="auto"
                        $radius="8px"
                        $maxH="140px"
                        $maxW="140px"
                      >
                        <ThumbnailBox
                          $aspect="1/1"
                          onClick={() => navigate(`/product/${productId}`)}
                        >
                          <Img
                            src={pri}
                            $w="100%"
                            $h="100%"
                            $radius="8px"
                            loading="lazy"
                            alt="상품 이미지"
                            $objectFit="cover"
                          />
                        </ThumbnailBox>
                      </ThumbnailWrap>

                      <Column
                        $w="100%"
                        $gap="8px"
                      >
                        <Column $gap="4px">
                          <Between $gap="12px">
                            <WrapperText $class={["captionB"]}>{productName}</WrapperText>
                            <Text
                              $wSpace="nowrap"
                              $cursor="pointer"
                              $class={["captionB", "blue"]}
                              onClick={() => navigate(`/my-page/order-service/order-detail/${id}`)}
                            >
                              상세보기
                            </Text>
                          </Between>
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
                            <WrapperText
                              $minW="90px"
                              $class={"captionB"}
                            >
                              {channelProductOrderId}
                            </WrapperText>
                          </Row>
                          <Row>
                            <Text
                              $minW="90px"
                              $class={["caption", "gray300"]}
                            >
                              예매일
                            </Text>
                            <WrapperText
                              $minW="90px"
                              $class={"captionB"}
                            >
                              {format(purchaseAt, "yyyy-MM-dd hh:mm")}
                            </WrapperText>
                          </Row>
                          <Row>
                            <Text
                              $minW="90px"
                              $class={["caption", "gray300"]}
                            >
                              관람일
                            </Text>
                            <WrapperText
                              $minW="90px"
                              $class={"captionB"}
                            >
                              {directOption}
                            </WrapperText>
                          </Row>

                          <Row>
                            <Text
                              $minW="90px"
                              $class={["caption", "gray300"]}
                            >
                              상태
                            </Text>
                            <WrapperText $class={["captionB", "blue"]}>
                              {ticketStateMeaning}
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
                                  ticketUsedStateMeaning === "사용 불가능" ? "red" : "blue",
                                ]}
                              >
                                {ticketUsedStateMeaning}
                              </WrapperText>
                            </Row>
                          </Row>
                          {cancelOrReturnStateMeaning !== "-" && (
                            <Row>
                              <Text
                                $minW="90px"
                                $class={["caption", "gray300"]}
                              >
                                취소/반품 상태
                              </Text>
                              <WrapperText $class={["captionB", "red"]}>
                                {cancelOrReturnStateMeaning}
                              </WrapperText>
                            </Row>
                          )}
                        </Column>
                      </Column>
                    </Row>

                    <Row
                      $gap="12px"
                      $pad="12px 0 0"
                    >
                      <LineBtn
                        $pad="4px 0"
                        disabled={availableCancelOrReturnState === "NOTHING"}
                        msg={
                          availableCancelOrReturnStateMeaning === "-"
                            ? "사용완료"
                            : availableCancelOrReturnStateMeaning
                        }
                        onClick={() => CancelFunc(id, availableCancelOrReturnState)}
                      />
                    </Row>
                  </MorphismBox>
                );
              }
            )}
        </Column>
      )}
      <Fix $backColor="var(--c-white)">
        <Paging pageData={getOrder} />
      </Fix>
    </>
  );
}
