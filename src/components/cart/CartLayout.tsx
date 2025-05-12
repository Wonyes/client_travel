import styled from "styled-components";

import {
  Between,
  Column,
  Fix,
  Img,
  MorphismBox,
  Row,
  Text,
  Thumbnail,
  ThumbnailImg,
  ThumbnailWrap,
} from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import { LineBtn } from "@/hook/useButton";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/api/reactQuery/getQuery/useProduct";
import Paging from "@/hook/paging/Paging";
import { usePageStore } from "@/stores/usePageStore";
import NoItem from "../common/NoItem";

const CartLayoutWrap = styled.div`
  min-height: calc(100vh - 52px);
  padding: 16px 16px 88px 16px;

  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
`;

export default function CartLayout() {
  const { close } = useImg();
  const navigate = useNavigate();
  const { currentPage, size } = usePageStore();
  const { data: cart, refetch } = useCart({ page: currentPage, size });

  const { mutate: deleteCart } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return Post({ url: `cart/${id}` });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const isDelete = (id: number) => {
    deleteCart({ id });
  };

  const { mutate: purchase } = useMutation({
    mutationFn: ({ option, Quantity, id }: { option: string; Quantity: number; id: number }) => {
      const body = {
        productId: id,
        purchaseQuantity: Quantity,
        directOption: option,
      };
      return Post({ url: "/cart", body: body });
    },
    onSuccess: () => {
      navigate("/product/orderform");
    },
  });

  const isPurchase = ({
    id,
    option,
    Quantity,
  }: {
    id: number;
    option: string;
    Quantity: number;
  }) => {
    purchase({ option, Quantity, id });
  };

  return (
    <>
      {!cart || (cart?.content.length === 0 && <NoItem text="찜한 상품이 없습니다." />)}
      {cart && (
        <CartLayoutWrap>
          {cart?.content.map(
            ({
              directOption,
              discountTotalPrice,
              id,
              pri,
              price,
              productName,
              productId,
              purchaseQuantity,
            }) => {
              return (
                <MorphismBox
                  key={id}
                  $dis="flex"
                  $gap="12px"
                  $direct="column"
                >
                  <Between
                    $pad="4px"
                    $align="start"
                  >
                    <Row
                      $w="100%"
                      $gap="12px"
                    >
                      <ThumbnailWrap
                        $radius="8px"
                        $maxW="80px"
                        $cursor="pointer"
                        onClick={() => navigate(`/product/${productId}`)}
                      >
                        <Thumbnail>
                          <ThumbnailImg
                            src={pri}
                            $radius="8px"
                          />
                        </Thumbnail>
                      </ThumbnailWrap>
                      <Column $align="start">
                        <Text $font="var(--f-neoR)">{productName}</Text>
                        <Row $gap="8px">
                          <Text $class={["captionB", "gray888"]}>옵션 : {directOption}</Text>
                          <Text $class={["captionB", "gray888"]}>
                            / 갯수 : {purchaseQuantity}개
                          </Text>
                        </Row>
                        <Text
                          $textDeco="line-through"
                          $class={["captionB", "gray888"]}
                        >
                          {price?.toLocaleString()}원
                        </Text>
                        <Text>{discountTotalPrice?.toLocaleString()}원</Text>
                      </Column>
                    </Row>
                    <CloseBtn>
                      <Img
                        src={close}
                        alt="close"
                        onClick={() => isDelete(id)}
                      />
                    </CloseBtn>
                  </Between>
                  <LineBtn
                    $pad="8px 0"
                    msg="구매하기"
                    onClick={() =>
                      isPurchase({
                        option: directOption,
                        Quantity: purchaseQuantity,
                        id: productId,
                      })
                    }
                  />
                </MorphismBox>
              );
            }
          )}
          <Fix
            $bottom="72px"
            $backColor="var(--c-mainBack)"
          >
            <Paging pageData={cart} />
          </Fix>
        </CartLayoutWrap>
      )}
    </>
  );
}
