import styled from "styled-components";

import { useImg } from "@/assets/style/common/useImg";
import {
  OptionA,
  Img,
  OptionLI,
  OptionUL,
  OptionWrap,
  Text,
  MorphismBox,
  Row,
  Column,
  LineSection,
} from "@/assets/style/common/useCommonStyle";
import { useMyInfo, usePurchaseCount } from "@/api/reactQuery/getQuery/useMy";
import Loading from "@/hook/Loading";
import { useNavigate } from "react-router-dom";

const MypageWrap = styled(Column)`
  gap: 16px;
`;

export default function MyPage() {
  const { rightArrow } = useImg();
  const navigate = useNavigate();
  const { data: myData, isLoading } = useMyInfo();
  const { data: count, isLoading: countLoading } = usePurchaseCount();

  const logout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    window.location.href = "/";
  };

  const optionNavigate = [
    { key: 0, title: "취소/반품 완료내역", href: "/my-page/order-service/claim" },
    { key: 1, title: "구매 내역", href: "/my-page/order-service/order" },
    { key: 2, title: "후기 작성", href: "/my-page/review" },
    { key: 3, title: "회원정보 수정", href: "/my-page/my-info" },
    { key: 4, title: "1:1 문의 내역", href: "/my-page/counsel" },
    { key: 5, title: "상품 문의 내역", href: "/my-page/qa" },
    { key: 6, title: "로그아웃", onClick: logout },
  ];

  if (isLoading || countLoading) return <Loading />;

  return (
    <MypageWrap>
      <Text as="h3">{myData?.nickname} 님</Text>
      <MorphismBox>
        <Row>
          <Column
            $flex="1"
            $cursor="pointer"
            onClick={() => navigate("/my-page/order-service/order")}
          >
            <Text $class={["gray888"]}>구매 내역</Text>
            <Text>{count?.purchaseCount}개</Text>
          </Column>
          <LineSection $borL="1px solid var(--c-line)" />
          <Column
            $flex="1"
            $cursor="pointer"
            $pad="0 0 0 12px"
            onClick={() => navigate("/my-page/review")}
          >
            <Text $class={["gray888"]}>후기 작성</Text>
            <Text>{count?.reviewCount}개</Text>
          </Column>
        </Row>
      </MorphismBox>

      <OptionWrap>
        <OptionUL>
          {optionNavigate.map(({ key, title, href, onClick }) => (
            <OptionLI key={key}>
              <OptionA
                href={href || "#"}
                target="_self"
                onClick={onClick}
              >
                <Text $class={title === "로그아웃" ? ["gray888"] : []}>{title}</Text>
                {key !== 6 && (
                  <Img
                    src={rightArrow}
                    alt="rightArrow"
                  />
                )}
              </OptionA>
            </OptionLI>
          ))}
        </OptionUL>
      </OptionWrap>
    </MypageWrap>
  );
}
