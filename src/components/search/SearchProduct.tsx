import styled from "styled-components";
import {
  ProductInfoText,
  Text,
  ThumbnailBox,
  ThumbnailImg,
  ThumbnailWrap,
} from "@/assets/style/common/useCommonStyle";
import Heart from "@/components/common/Heart";

const PageWrap = styled.div`
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductListGrid = styled.div`
  display: grid;
  height: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 53px;

  grid-template-columns: repeat(3, minmax(0px, 1fr));
`;

const ProductInfo = styled.div`
  display: flex;
  padding: 16px 8px;
  flex-direction: column;
`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--c-white);
`;

export default function SearchProduct({ data, isFavoriteClick }) {
  if (!data) return null;
  return (
    <PageWrap>
      <ProductListGrid>
        {data &&
          data?.map(({ id, pri, productName, isFavorite, discountRate, discountPrice }) => (
            <ProductBox key={id}>
              <ThumbnailBox
                $aspect="1/1"
                href={`/product/${id}`}
              >
                <ThumbnailWrap>
                  <ThumbnailImg
                    src={pri}
                    alt="pri"
                  />
                  <Heart
                    id={id}
                    favorites={isFavorite}
                    onFavorite={isFavoriteClick}
                  />
                </ThumbnailWrap>
              </ThumbnailBox>
              <ProductInfo>
                <Text>{productName}</Text>
                <ProductInfoText $gap="4px">
                  <Text $color="var(--c-red)">{discountRate && discountRate + "%"}</Text>
                  <Text>{discountPrice?.toLocaleString()}원</Text>
                </ProductInfoText>
              </ProductInfo>
            </ProductBox>
          ))}
      </ProductListGrid>
    </PageWrap>
  );
}
