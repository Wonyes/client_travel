import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled, { keyframes } from "styled-components";

import { useOverlay } from "@/hook/useOverlay";
import Calendar from "@/hook/calendar/Calendar";
import { BlueBtn, LineBtn } from "@/hook/useButton";
import { Post } from "@/api/reactQuery/useMutations";
import { useImg } from "@/assets/style/common/useImg";
import { useCalendarStore } from "@/stores/useCalendarStore";

import { Between, Column, Img, Row, SelectBox, Text } from "@/assets/style/common/useCommonStyle";

const dimFadeIn = keyframes`
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: .3;
    display: flex;
  }
`;

const dimFadeOut = keyframes`
 0% {
  opacity: .3;
  display: flex
;
}
100% {
  opacity: 0;
  display: none;
}
`;

const SheetContainer = styled.div`
  background-color: var(--c-black);
  z-index: 900;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0%;
  animation: 0.3s forwards ${dimFadeOut};
  display: none;
  &.active {
    justify-content: center;
    align-items: center;
    display: flex;

    animation: 0.3s forwards ${dimFadeIn};
  }
`;

const MotionSheetWrap = styled.section`
  background: white;
  border-radius: 24px 24px 0 0;
  min-height: 60vh;
  height: fit-content;

  justify-content: space-between;

  transform: translateY(200%);
  z-index: 920;
  flex-direction: column;
  min-width: 320px;
  max-width: 600px;
  transition: transform 0.3s cubic-bezier(0.3, 0, 0.7, 0.4);
  display: flex;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  &.active {
    box-sizing: border-box;

    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }
`;

const PurchaseBox = styled.div`
  border-top: 1px solid var(--c-line);
`;

const CloseBtn = styled.button`
  width: 24px;
  height: 24px;
`;

interface DetailProps {
  stock: number;
  productId?: string;
  productName?: string;
  discountPrice?: number;
  purchaseOpen?: boolean;
  purChase?: () => void;
}

export default function BottomSheet({
  stock,
  purChase,
  productId: id,
  productName,
  purchaseOpen,
  discountPrice,
}: DetailProps) {
  const navigate = useNavigate();
  const { minus, plus, close } = useImg();
  const { startDate, resetToggleCalendar } = useCalendarStore();
  const [purchaseNum, setPurchaseNum] = useState<number>(1);

  const { openConfirm } = useOverlay();
  const isPurchaseNum = (type: string) => {
    if (type === "plus") {
      setPurchaseNum((prev) => prev + 1);
    } else if (type === "minus") {
      setPurchaseNum((prev) => (prev > 1 ? prev - 1 : prev));
    }
  };

  useEffect(() => {
    setPurchaseNum(1);
    resetToggleCalendar();

    if (purchaseOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [purchaseOpen]);

  const purchaseMath = discountPrice * purchaseNum;
  const purchasePrice = `${purchaseMath?.toLocaleString()}원`;

  const closePurchase = () => {
    purChase();
    setPurchaseNum(1);
    resetToggleCalendar();
  };

  const deleteOrder = () => {
    setPurchaseNum(1);
    resetToggleCalendar();
  };

  const body = {
    productId: id,
    purchaseQuantity: purchaseNum,
    directOption: format(startDate, "yyyy-MM-dd"),
  };

  const { mutate: purchase } = useMutation({
    mutationFn: ({ type }: { type: "cart" | "purchase" }) => {
      const bodyWithType = { ...body, type };
      return Post({ url: "/cart", body: bodyWithType });
    },
    onSuccess: (_, variables) => {
      if (variables.type === "purchase") {
        document.body.style.overflow = "unset";
        navigate("/product/orderform");
      }
    },
    onError: (error) => {
      console.error("요청 실패:", error);
    },
  });

  const isPurchase = () => {
    purchase({ type: "purchase" });
  };

  const cartMove = () => {
    purchase({ type: "cart" });
    openConfirm({
      title: "장바구니에 담겼습니다.",
      message: "장바구니로 이동하시겠습니까?",
      mainBtn: "이동하기",
      subBtn: "계속 쇼핑하기",
      onFunc: () => {
        document.body.style.overflow = "unset";
        navigate("/order/cart");
      },
    });
  };

  const isDisabled = !startDate || stock === 0;

  return (
    <>
      <SheetContainer className={purchaseOpen ? "active" : ""}></SheetContainer>
      <MotionSheetWrap className={purchaseOpen ? "active" : ""}>
        <Column
          $gap="12px"
          $pad="16px"
        >
          <Row $jus="end">
            <CloseBtn onClick={closePurchase}>
              <Img
                $w="24px"
                src={close}
                alt="close"
              />
            </CloseBtn>
          </Row>
          <Calendar />
          {startDate && (
            <SelectBox $cursor="initial">
              <Column $gap="12px">
                <Between
                  $pad="4px"
                  $align="start"
                >
                  <Column
                    $gap="4px"
                    $align="start"
                  >
                    <Text $tAlign="left">{productName}</Text>
                    <Text> {format(startDate, "yyyy. MM. dd")}</Text>
                  </Column>
                  <CloseBtn>
                    <Img
                      src={close}
                      alt="close"
                      onClick={deleteOrder}
                    />
                  </CloseBtn>
                </Between>
                <Between>
                  <Row $gap="12px">
                    <Img
                      src={minus}
                      alt="minus"
                      $cursor="pointer"
                      onClick={() => isPurchaseNum("minus")}
                    />
                    <Text $class="title">{purchaseNum}</Text>
                    <Img
                      src={plus}
                      alt="plus"
                      $cursor="pointer"
                      onClick={() => isPurchaseNum("plus")}
                    />
                  </Row>
                  <Text $class="title">{purchasePrice}</Text>
                </Between>
              </Column>
            </SelectBox>
          )}
        </Column>
        <PurchaseBox>
          <Column
            $pad="16px"
            $gap="16px"
          >
            <Between>
              <Text
                $size="18px"
                $class={"red"}
              >
                남은재고
              </Text>
              <Text $size="18px">{stock}개</Text>
            </Between>
            <Between>
              <Text
                $size="18px"
                $class={"blue"}
              >
                총 결제금액
              </Text>
              <Text
                $size="18px"
                $class={"blue"}
              >
                {startDate ? purchasePrice : "0원"}
              </Text>
            </Between>
            <Row $gap="12px">
              <LineBtn
                msg="장바구니에 담기"
                onClick={cartMove}
                disabled={isDisabled}
              />
              <BlueBtn
                msg="결제하기"
                onClick={isPurchase}
                disabled={isDisabled}
              />
            </Row>
          </Column>
        </PurchaseBox>
      </MotionSheetWrap>
    </>
  );
}
