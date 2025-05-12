import { useNavigate } from "react-router-dom";

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
import { LineBtn } from "@/hook/useButton";
import { format } from "date-fns";

export default function UnWrite({ data }: any) {
  const navigate = useNavigate();

  return (
    <Column $gap="12px">
      {data &&
        data.content.map(
          ({
            channelProductOrderId,
            directOption,
            id,
            productId,
            purchaseAt,
            ticketStateMeaning,
            productName,
            pri,
            ticketUsedStateMeaning,
            cancelOrReturnStateMeaning,
          }) => (
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
                    <WrapperText>{productName}</WrapperText>
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
                        {channelProductOrderId}
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
                        {format(purchaseAt, "yyyy-MM-dd hh:mm")}
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
                        {directOption}
                      </Text>
                    </Row>
                    <Row>
                      <Text
                        $minW="90px"
                        $class={["caption", "gray300"]}
                      >
                        상태
                      </Text>
                      <WrapperText $class={["captionB", "blue"]}>{ticketStateMeaning}</WrapperText>
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
                  </Column>
                </Column>
              </Row>
              <Row
                $gap="12px"
                $pad="12px 0 0"
              >
                <LineBtn
                  $pad="4px 0"
                  msg="후기 작성하기"
                  onClick={() => navigate(`/my-page/review/write/${id}`)}
                />
              </Row>
            </MorphismBox>
          )
        )}
    </Column>
  );
}
