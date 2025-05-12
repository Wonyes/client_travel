import { useEffect } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;
const customerKey = import.meta.env.VITE_TOSS_CLIENT_KEY;

export function PaymentCheckoutPage({
  setPayment,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: any) {
  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        const payment = tossPayments.payment({
          customerKey,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, [clientKey, customerKey]);

  function selectPaymentMethod(method) {
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(method);
    }
  }

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-method">
          <button
            id="CARD"
            className={`button2 ${selectedPaymentMethod === "CARD" ? "active" : ""}`}
            onClick={() => selectPaymentMethod("CARD")}
          >
            카드
          </button>
          <button
            id="TRANSFER"
            className={`button2 ${selectedPaymentMethod === "TRANSFER" ? "active" : ""}`}
            onClick={() => selectPaymentMethod("TRANSFER")}
          >
            계좌이체
          </button>
          <button
            id="VIRTUAL_ACCOUNT"
            className={`button2 ${selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? "active" : ""}`}
            onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}
          >
            가상계좌
          </button>
          <button
            id="MOBILE_PHONE"
            className={`button2 ${selectedPaymentMethod === "MOBILE_PHONE" ? "active" : ""}`}
            onClick={() => selectPaymentMethod("MOBILE_PHONE")}
          >
            휴대폰
          </button>
          <button
            id="CULTURE_GIFT_CERTIFICATE"
            className={`button2 ${
              selectedPaymentMethod === "CULTURE_GIFT_CERTIFICATE" ? "active" : ""
            }`}
            onClick={() => selectPaymentMethod("CULTURE_GIFT_CERTIFICATE")}
          >
            문화상품권
          </button>
        </div>
      </div>
    </div>
  );
}
