import { Column, Row, Text } from "@/assets/style/common/useCommonStyle";
import { LineBtn } from "@/hook/useButton";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function FailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <Column
      $w="100%"
      $h="100vh"
      $backColor="var(--c-white)"
      $align="center"
      $jus="center"
    >
      <div className="result wrapper">
        <div className="box_section">
          <Text
            as="h2"
            $class={["title", "blue"]}
          >
            결제 실패되었습니다.
          </Text>
          <p>{`에러 코드: ${searchParams.get("code")}`}</p>
          <p>{`실패 사유: ${searchParams.get("message")}`}</p>
        </div>
      </div>
      <Row
        $pad="16px "
        $w="100%"
      >
        <LineBtn
          msg="홈으로 돌아가기"
          onClick={() => navigate("/")}
        />
      </Row>
    </Column>
  );
}
