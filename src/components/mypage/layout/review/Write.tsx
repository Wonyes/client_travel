import { useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
  Between,
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

import Star from "@/hook/Star";
import styled from "styled-components";
import { useDrag } from "@/utils/useDrag";
import { useOverlay } from "@/hook/useOverlay";
import { useMutation } from "@tanstack/react-query";
import { Delete } from "@/api/reactQuery/useMutations";

const ReviewImgWrap = styled(Row)`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StarOrDate = styled(Row)`
  @media (max-width: 400px) {
    flex-direction: column;
    gap: 0px;
    align-items: flex-start;
  }
`;

export default function Write({ data, refetch, unRefetch }: any) {
  const navigate = useNavigate();
  const dragRef = useRef<HTMLDivElement>(null);
  const { openConfirm, openToast } = useOverlay();
  const { mouseDownEvent, mouseMoveEvent, mouseUpEvent, mouseLeaveEvent } = useDrag({
    dragRef,
  });

  const { mutate: deeleteReview } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return Delete({ url: `client/review/${id}` });
    },
    onSuccess: () => {
      refetch();
      unRefetch();
      openToast({
        message: "리뷰가 삭제되었습니다.",
      });
    },
  });

  const deleteConfirm = (id: number) => {
    openConfirm({
      title: "리뷰 삭제",
      message: "리뷰를 삭제하시겠습니까?",
      mainBtn: "삭제",
      subBtn: "취소",
      onFunc: () => {
        deeleteReview({ id });
      },
    });
  };

  return (
    <Column $gap="12px">
      {data &&
        data.content.map(
          ({
            id,
            ri,
            rating,
            content,
            productId,
            createAt,
            productPri,
            productName,
            directOption,
          }) => (
            <MorphismBox
              $pad="12px"
              key={id}
            >
              <Column $gap="12px">
                <Row $gap="12px">
                  <ThumbnailWrap
                    $maxW="70px"
                    $maxH="70px"
                    $radius="8px"
                  >
                    <ThumbnailBox
                      $aspect="1/1"
                      onClick={() => navigate(`/product/${productId}`)}
                    >
                      <Img
                        src={productPri}
                        $w="100%"
                        $h="100%"
                        loading="lazy"
                        alt="상품 이미지"
                        $radius="8px"
                        $objectFit="cover"
                      />
                    </ThumbnailBox>
                  </ThumbnailWrap>
                  <Between
                    $w="100%"
                    $align="flex-start"
                  >
                    <Column>
                      <WrapperText>{productName}</WrapperText>
                      <Text>{directOption}</Text>
                      <StarOrDate
                        $gap="8px"
                        $align="center"
                      >
                        <Star
                          size="20px"
                          rating={rating}
                        />
                        <Text $class={["captionB", "gray888"]}>
                          {format(createAt, "yyyy-MM-dd hh:mm")}
                        </Text>
                      </StarOrDate>
                    </Column>
                    <Text
                      as="button"
                      $wSpace="nowrap"
                      onClick={() => deleteConfirm(id)}
                      $class={["captionB", "gray888"]}
                    >
                      삭제하기
                    </Text>
                  </Between>
                </Row>
                <LineSection
                  $borB="1px solid var(--c-line)"
                  $w="100%"
                  $h="1px"
                />
                <Column $gap="12px">
                  <ReviewImgWrap
                    $gap="8px"
                    ref={dragRef}
                    onMouseUp={mouseUpEvent}
                    onMouseDown={mouseDownEvent}
                    onMouseMove={mouseMoveEvent}
                    onMouseLeave={mouseLeaveEvent}
                  >
                    {ri &&
                      ri.map((item: string, index: string) => (
                        <ThumbnailWrap
                          key={index}
                          $w="120px"
                          $maxW="120px"
                          $radius="8px"
                        >
                          <ThumbnailBox $aspect="1/1.2">
                            <Img
                              src={item}
                              $w="100%"
                              $h="100%"
                              loading="lazy"
                              alt="상품 이미지"
                              $radius="8px"
                              $objectFit="cover"
                            />
                          </ThumbnailBox>
                        </ThumbnailWrap>
                      ))}
                  </ReviewImgWrap>
                  <Text
                    as="pre"
                    $wSpace="pre-wrap"
                  >
                    {content}
                  </Text>
                </Column>
              </Column>
            </MorphismBox>
          )
        )}
    </Column>
  );
}
