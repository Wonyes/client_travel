import Input from "@/hook/Input";
import TitleHeader from "../header/TitleHeader";
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
} from "@/assets/style/common/useCommonStyle";
import styled from "styled-components";
import { BlueBtn } from "@/hook/useButton";
import { PaymentCheckoutPage } from "./payment/Checkout";
import { useInputStore } from "@/stores/useInputStore";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";
import { useOrderForm } from "@/api/reactQuery/getQuery/useProduct";
import { useOverlay } from "@/hook/useOverlay";
import { useState } from "react";

const ProductCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--c-line);

  gap: 12px;
  display: flex;
  align-items: flex-start;
`;

export default function OrderForm() {
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { member } = useInputStore();
  const { memberName, memberPhone } = member;
  const { openAlert } = useOverlay();

  const { data = { result: {} } } = useOrderForm();
  const formData = data;

  const bodyData = {
    productId: formData.productId,
    directOption: formData.directOption,
    purchasePrice: formData.discountTotalPrice,
    purchaseQuantity: formData.purchaseQuantity,
    purchaseUserName: formData.memberName ?? memberName,
    phoneNumber: formData.memberPhoneNumber ?? memberPhone,
  };

  const { mutate: paymentData } = useMutation({
    mutationFn: () => {
      return Post({
        body: bodyData,
        url: "client/payment/saveAmount",
      });
    },
    onSuccess: async (data) => {
      try {
        const orderId = data.orderId;
        const amount = { value: data.amount, currency: "KRW" };

        switch (selectedPaymentMethod) {
          case "CARD":
            await payment.requestPayment({
              method: "CARD", // 카드 및 간편결제
              amount, // 결제 금액
              orderId, // 고유 주문번호
              orderName: formData.productName,
              successUrl: window.location.origin + "/payment/success", // 결제 요청이 성공하면 리다이렉트되는 URL
              failUrl: window.location.origin + "/payment/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
              customerEmail: "",
              customerName: formData.memberName ?? memberName,

              card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
              },
            });
            break;

          case "TRANSFER":
            await payment.requestPayment({
              method: "TRANSFER",
              amount,
              orderId,
              orderName: "토스 티셔츠 외 2건",
              successUrl: window.location.origin + "/payment/success",
              failUrl: window.location.origin + "/payment/fail",
              customerEmail: "",
              customerName: formData.memberName ?? memberName,

              transfer: {
                cashReceipt: {
                  type: "소득공제",
                },
                useEscrow: false,
              },
            });
            break;

          case "VIRTUAL_ACCOUNT":
            await payment.requestPayment({
              method: "VIRTUAL_ACCOUNT",
              amount,
              orderId: generateRandomString(),
              orderName: "토스 티셔츠 외 2건",
              successUrl: window.location.origin + "/payment/success",
              failUrl: window.location.origin + "/payment/fail",
              customerEmail: "",
              customerName: formData.memberName ?? memberName,

              virtualAccount: {
                cashReceipt: {
                  type: "소득공제",
                },
                useEscrow: false,
                validHours: 24,
              },
            });
            break;

          case "MOBILE_PHONE":
            await payment.requestPayment({
              method: "MOBILE_PHONE", // 휴대폰 결제
              amount,
              orderId: generateRandomString(),
              orderName: "토스 티셔츠 외 2건",
              successUrl: window.location.origin + "/payment/success",
              failUrl: window.location.origin + "/payment/fail",
              customerEmail: "",
              customerName: formData.memberName ?? memberName,
            });
            break;

          case "CULTURE_GIFT_CERTIFICATE":
            await payment.requestPayment({
              method: "CULTURE_GIFT_CERTIFICATE", // 문화상품권 결제
              amount,
              orderId: generateRandomString(),
              orderName: "토스 티셔츠 외 2건",
              successUrl: window.location.origin + "/payment/success",
              failUrl: window.location.origin + "/payment/fail",
              customerEmail: "",
              customerName: formData.memberName ?? memberName,
            });
            break;

          default:
            console.error("지원되지 않는 결제 방식입니다.");
        }
      } catch (error) {
        console.error("결제 요청 중 오류 발생:", error);
      }
    },
    onError: () => {
      openAlert({
        title: "구매자 정보를 입력해 주세요.",
        message: "다시 시도해 주세요.",
        mainBtn: "확인",
      });
    },
  });

  function requestPayment() {
    if ((formData?.memberPhoneNumber?.length || 0) !== 13 && (memberPhone.length || 0) !== 13) {
      return openAlert({
        title: "휴대폰 번호를 확인해 주세요.",
        message: "13자리 숫자만 입력 가능합니다.",
        mainBtn: "확인",
      });
    }

    if (
      (formData?.memberName?.length || memberName.length) < 2 ||
      (formData?.memberName?.length || memberName.length) > 10
    ) {
      return openAlert({
        title: "이름을 확인해 주세요.",
        message: "2~10자 이내로 입력 가능합니다.",
        mainBtn: "확인",
      });
    }

    paymentData();
  }

  const discountAmount = formData.price * (formData.discountRate / 100);
  const finalPrice = formData.price - discountAmount;

  const discountFinalPrice = formData.totalPrice * (formData.discountRate / 100);

  return (
    <Column
      $pad="16px 16px 78px"
      $gap="16px"
    >
      <Row
        $w="100%"
        $left="50%"
        $bottom="0px"
        $maxW="600px"
        $zIndex="100"
        $pad="12px 16px"
        $position="fixed"
        $backColor="var(--c-mainBack)"
        $trans="translate(-50%, 0)"
      >
        <BlueBtn
          onClick={requestPayment}
          disabled={!selectedPaymentMethod}
          msg={`${formData.discountTotalPrice?.toLocaleString()}원 결제하기`}
        />
      </Row>

      <MorphismBox>
        <TitleHeader
          pad="0"
          title="구매자 정보"
        />
        <Column
          $gap="8px"
          $pad="12px 0 0"
        >
          <Input
            $maxW="100%"
            place="이름"
            name="memberName"
            disabled={formData.memberName}
            value={formData.memberName ?? memberName}
          />

          <Input
            $maxW="100%"
            place="010-0000-0000"
            name="memberPhone"
            disabled={formData.memberPhoneNumber}
            value={formData.memberPhoneNumber ?? memberPhone}
          />
        </Column>
      </MorphismBox>

      <MorphismBox>
        <Column $gap="12px">
          <TitleHeader
            pad="0"
            title="상품 정보"
          />
          <ProductCard>
            <ThumbnailWrap
              $radius="8px"
              $maxW="86px"
            >
              <ThumbnailBox $aspect="1/1">
                <Img
                  src={formData.pri}
                  $w="100%"
                  $h="100%"
                  $radius="8px"
                  loading="lazy"
                  alt="상품 이미지"
                  $objectFit="cover"
                />
              </ThumbnailBox>
            </ThumbnailWrap>

            <Column $jus="space-between">
              <Text $class={"title"}>{formData.productName}</Text>
              <Row $gap="8px">
                <Text $class={["captionB", "gray888"]}>옵션</Text>
                <Text $class={["captionB", "gray888"]}>- {formData.directOption}</Text>
                <Text $class={["captionB", "gray888"]}>- {formData.purchaseQuantity}개</Text>
              </Row>
              <Text
                $textDeco="line-through"
                $color="var(--c-gray888)"
              >
                {formData.price?.toLocaleString()}원
              </Text>
              <Text>{finalPrice?.toLocaleString()}원</Text>
            </Column>
          </ProductCard>
        </Column>
      </MorphismBox>

      <MorphismBox>
        <Column>
          <TitleHeader
            pad="0"
            title="결제 수단"
          />
          <PaymentCheckoutPage
            setPayment={setPayment}
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
          />
        </Column>
      </MorphismBox>

      <MorphismBox>
        <Column $gap="12px">
          <TitleHeader
            pad="0"
            title="최종 결제금액"
          />
          <Column $gap="12px">
            <Column $gap="2px">
              <Between>
                <Text $class="subText">상품금액</Text>
                <Text $class="subText">{formData.totalPrice?.toLocaleString()}원</Text>
              </Between>
              <Between>
                <Text $class="subText">할인금액</Text>
                <Text $class={["subText", "blue"]}>-{discountFinalPrice?.toLocaleString()}원</Text>
              </Between>
            </Column>

            <LineSection
              $h="1px"
              $borB="1px solid var(--c-line)"
            />
            <Between>
              <Text>총 결제금액</Text>
              <Row $gap="4px">
                <Text $class={"red"}>{formData.discountRate}%</Text>
                <Text $class={"blue"}>{formData.discountTotalPrice?.toLocaleString()}원</Text>
              </Row>
            </Between>
          </Column>
        </Column>
      </MorphismBox>

      <MorphismBox>
        <Text $class={["captionB", "red"]}>
          ※ 이름 2~10자, 휴대폰 번호 13자리 숫자만 입력 가능합니다.
        </Text>
        <Text $class={["captionB", "red"]}>
          ※ 이름과 휴대폰번호는 마이페이지에서 등록 후 결제페이지에서 입력이 불가합니다.
        </Text>
        <Text $class={["captionB", "red"]}>
          ※ 해당 상품의 결제는 tossPayment 테스트 결제로 진행됩니다.
        </Text>
        <Text $class={["captionB", "red"]}>
          ※ 실제 결제방식과 동일하지만 결제금액은 지불이 되지 않습니다.
        </Text>
      </MorphismBox>
    </Column>
  );
}

function generateRandomString() {
  return window.btoa(Math.random().toString()).slice(0, 20);
}
