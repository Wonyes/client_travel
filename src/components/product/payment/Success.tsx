import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { LineBtn } from "@/hook/useButton";
import { Post } from "@/api/reactQuery/useMutations";

import { Between, Column, Row, Text } from "@/assets/style/common/useCommonStyle";

export function PaymentSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const requestData = {
    orderId: searchParams.get("orderId"),
    amount: searchParams.get("amount"),
    paymentKey: searchParams.get("paymentKey"),
  };

  const { mutate: confirmPayment } = useMutation({
    mutationFn: async () => {
      const response = await Post({
        url: "client/payment/confirm",
        body: requestData,
      });
      return response;
    },

    onError: (error) => {
      const axiosError = error as any;

      if (axiosError.response) {
        const { code, message } = axiosError.response.data || {};
        navigate(`/payment/fail?code=${code}&message=${message}`);
      }
    },
  });

  useEffect(() => {
    confirmPayment();
  }, []);

  return (
    <Column
      $w="100%"
      $h="100vh"
      $pad="16px"
      $backColor="var(--c-white)"
      $align="center"
    >
      <Column
        $jus="center"
        $align="center"
        className="box_section"
      >
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <Column
          $pad="16px 0 0"
          $jus="center"
          $align="center"
        >
          <Row $gap="4px">
            <Text
              as="h2"
              $class={["title", "blue"]}
            >
              결제가 완료
            </Text>
            <Text
              as="h2"
              $class={["title"]}
            >
              되었습니다.
            </Text>
          </Row>
          <Text $class={["subText"]}>판매자의 승인 후 티켓이 발급됩니다.</Text>
        </Column>
        <Column
          $w="100%"
          $gap="10px"
          $pad="24px 0 0 "
        >
          <Between>
            <Text>결제금액</Text>
            <Text id="amount">{`${Number(searchParams.get("amount")).toLocaleString()}원`}</Text>
          </Between>
          <Between>
            <Text>주문번호</Text>
            <Text id="orderId">{`${searchParams.get("orderId")}`}</Text>
          </Between>
        </Column>
        <Row
          $w="100%"
          $gap="8px"
          $pad="24px 0 0 "
        >
          <LineBtn
            msg="주문 내역 보기"
            onClick={() => navigate("/my-page/order-service/order")}
          />
          <LineBtn
            msg="홈으로 이동"
            onClick={() => navigate("/")}
          />
        </Row>
      </Column>
    </Column>
  );
}
