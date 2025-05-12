import styled from "styled-components";
import {
  Fix,
  ProductInfoText,
  Text,
  ThumbnailBox,
  ThumbnailImg,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";
import Heart from "@/components/common/Heart";
import Paging from "@/hook/paging/Paging";

const PageWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 57px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductListGrid = styled.div`
  display: grid;

  &::-webkit-scrollbar {
    display: none;
  }
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

export default function ProductMore({ data, isFavoriteClick }) {
  const productList = Array.isArray(data) ? data : data?.content;
  if (!data) return null;
  return (
    <PageWrap>
      <ProductListGrid>
        {data &&
          productList.map(({ id, pri, productName, isFavorite, discountRate, discountPrice }) => (
            <ProductBox key={id}>
              <ThumbnailBox
                $aspect="1/1"
                href={`/product/${id}`}
              >
                <ThumbnailWrap>
                  <ThumbnailImg
                    src={pri}
                    alt="pri"
                    $objectFit="cover"
                  />
                  <Heart
                    id={id}
                    favorites={isFavorite}
                    onFavorite={isFavoriteClick}
                  />
                </ThumbnailWrap>
              </ThumbnailBox>
              <ProductInfo>
                <WrapperText>{productName}</WrapperText>
                <ProductInfoText $gap="4px">
                  <Text $color="var(--c-red)">{discountRate && discountRate + "%"}</Text>
                  <Text>{discountPrice?.toLocaleString()}원</Text>
                </ProductInfoText>
              </ProductInfo>
            </ProductBox>
          ))}
      </ProductListGrid>
      <Fix $backColor="var(--c-white)">
        <Paging pageData={data} />
      </Fix>
    </PageWrap>
  );
}
