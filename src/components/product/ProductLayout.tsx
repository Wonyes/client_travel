import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  Column,
  Img,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";

import Heart from "../common/Heart";
import { useDrag } from "@/utils/useDrag";
import { useHeart } from "@/hook/useHeart";

const LayoutWrap = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  overflow-x: scroll;
  padding: 0px 16px;
  user-select: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LayoutGridItem = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 1fr;

  cursor: pointer;
`;

const ProductText = styled(Row)`
  gap: 4px;
`;

const ItemWrap = styled.div`
  width: 29.2vw;
  max-width: 175px;
  min-width: 175px;
  min-height: 222px;
  display: flex;
  flex-direction: column;
  background-color: var(--c-white);

  overflow: hidden;
  vertical-align: top;

  &:first-child {
    border-top-left-radius: 8px;
  }
  &:nth-child(2) {
    border-bottom-left-radius: 8px;
  }

  &:nth-last-child(2) {
    border-top-right-radius: 8px;
  }

  &:nth-last-child(1) {
    border-bottom-right-radius: 8px;
  }
`;

interface ProductLayoutProps {
  data: any;
  refetch: () => void;
}

export default function ProductLayout({ data, refetch }: ProductLayoutProps) {
  const navigate = useNavigate();
  const { isFavoriteClick } = useHeart({ refetch });

  const dragRef = React.useRef<HTMLDivElement>(null);
  const { mouseDownEvent, mouseMoveEvent, mouseUpEvent, mouseLeaveEvent, isDragging } = useDrag({
    dragRef,
  });

  return (
    <LayoutWrap
      ref={dragRef}
      onMouseUp={mouseUpEvent}
      onMouseDown={mouseDownEvent}
      onMouseMove={mouseMoveEvent}
      onMouseLeave={mouseLeaveEvent}
    >
      <LayoutGridItem>
        {data?.map(({ id, pri, isFavorite, productName, discountPrice, discountRate }: any) => (
          <ItemWrap
            key={id}
            onClick={() => {
              if (!isDragging) {
                navigate(`/product/${id}`);
              }
            }}
          >
            <ThumbnailWrap>
              <ThumbnailBox $aspect="1/1">
                <Img
                  src={pri}
                  $w="100%"
                  $h="100%"
                  $maxH="175px"
                  loading="lazy"
                  alt="상품 이미지"
                  $objectFit="cover"
                />
                <Heart
                  id={id}
                  favorites={isFavorite}
                  onFavorite={isFavoriteClick}
                />
              </ThumbnailBox>
            </ThumbnailWrap>
            <Column $pad="6px 8px">
              <WrapperText>{productName}</WrapperText>
              <ProductText>
                {discountRate && <Text $class={"red"}>{discountRate}%</Text>}
                <Text>{discountPrice?.toLocaleString()}원</Text>
              </ProductText>
            </Column>
          </ItemWrap>
        ))}
      </LayoutGridItem>
    </LayoutWrap>
  );
}
