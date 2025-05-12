import React from "react";
import styled from "styled-components";
import { useProductReview } from "@/api/reactQuery/getQuery/useProduct";
import {
  Between,
  Column,
  Img,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
} from "@/assets/style/common/useCommonStyle";
import Star from "@/hook/Star";
import { usePageStore } from "@/stores/usePageStore";
import { format } from "date-fns";
import { useDrag } from "@/utils/useDrag";
import NoItem from "@/components/common/NoItem";
import Paging from "@/hook/paging/Paging";
import { useOverlay } from "@/hook/useOverlay";
import Report from "./Report";
import { useLoginStore } from "@/stores/useLoginStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";
import { useTextStore } from "@/stores/useTextStore";

const ReviewContainer = styled(Column)`
  gap: 8px;

  padding: 16px 0 16px 16px;
  border-bottom: 1px solid var(--c-line);
`;

const ReviewImgWrap = styled(Row)`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function ProductReview({ id }) {
  const url = `client/review/${id}`;
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { report } = useTextStore();
  const { currentPage, size } = usePageStore();
  const { openModal, openConfirm, openAlert } = useOverlay();
  const { data: review } = useProductReview({ page: currentPage, size }, url);

  const dragRef = React.useRef<HTMLDivElement>(null);
  const { mouseDownEvent, mouseMoveEvent, mouseUpEvent, mouseLeaveEvent } = useDrag({
    dragRef,
  });

  const { mutate: reportMutate } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return Post({ url: `client/report/${id}`, body: { title: "REVIEW", reason: report } });
    },
    onSuccess: () => {
      openAlert({
        title: "신고가 완료되었습니다.",
        mainBtn: "확인",
      });
    },
  });

  const reportReview = () => {
    if (!isLogin) {
      openConfirm({
        title: "로그인이 필요한 서비스입니다.",
        message: "로그인 페이지로 이동하시겠습니까?",
        mainBtn: "로그인",
        subBtn: "취소",
        onFunc: () => {
          navigate("/login");
        },
      });
      return;
    }
    openModal({
      title: "리뷰 신고",
      content: <Report />,
      mainBtn: "신고하기",
      subBtn: "취소",
      onFunc: () => {
        reportMutate({ id });
      },
    });
  };

  return (
    <>
      {!review || (review.content.length === 0 && <NoItem text="등록된 리뷰가 없습니다." />)}
      {review &&
        review.content.map(({ id, rating, memberNickname, createAt, content, ri }) => (
          <Column
            key={id}
            $backColor="var(--c-white)"
          >
            <ReviewContainer>
              <Between $pad="0 16px 0 0">
                <Row
                  $align="center"
                  $gap="8px"
                >
                  <Text>{memberNickname}</Text>
                  <Text $class={["caption", "gray888"]}>
                    {format(createAt, "yyyy-MM-dd hh:mm")}
                  </Text>
                </Row>
                <Text
                  as="button"
                  $class={["caption", "gray888"]}
                  onClick={reportReview}
                >
                  신고하기
                </Text>
              </Between>
              <Star
                rating={rating}
                notScore={true}
              />

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
                          $radius="8px"
                          loading="lazy"
                          alt="상품 이미지"
                          $objectFit="cover"
                        />
                      </ThumbnailBox>
                    </ThumbnailWrap>
                  ))}
              </ReviewImgWrap>
              <Text>{content}</Text>
            </ReviewContainer>
          </Column>
        ))}
      <Paging pageData={review} />
    </>
  );
}
