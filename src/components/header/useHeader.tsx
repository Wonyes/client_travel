import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { CommonProps } from "@/types/styleInterface";
import { useImg } from "@/assets/style/common/useImg";
import { useLoginStore } from "@/stores/useLoginStore";
import { Arrow } from "@/assets/style/common/IconCompo";
import { Img, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useInputStore } from "@/stores/useInputStore";
import Input from "@/hook/Input";

interface BackSpaceHeaderProps {
  msg?: string;
  onClick?: () => void;
}

const StickyHeader = styled.header<Pick<CommonProps, "$jus">>`
  position: sticky;
  height: 52px;
  top: 0;
  left: 0;
  padding: 16px 14px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$jus ?? "center"};
  z-index: 900;
  background-color: var(--c-white);
  border-bottom: 1px solid var(--c-line);
`;

const ArrowBox = styled.div`
  max-width: 22px;
  width: 20px;
  height: 20px;
`;

export function BackSpaceHeader({ msg, onClick }: BackSpaceHeaderProps) {
  const navigate = useNavigate();
  const { headerHome } = useImg();

  return (
    <StickyHeader>
      <Row
        $w="100%"
        $align="center"
        $jus="space-between"
      >
        <ArrowBox onClick={onClick}>
          <Arrow />
        </ArrowBox>
        <Text
          as="h1"
          $class="title"
        >
          {msg}
        </Text>
        <Img
          src={headerHome}
          alt="home"
          $cursor="pointer"
          onClick={() => navigate("/")}
        />
      </Row>
    </StickyHeader>
  );
}

export function LogoHeader() {
  const { logo, headerCart, headerHome } = useImg();
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();
  return (
    <StickyHeader $jus="space-between">
      <Img
        src={logo}
        alt="logo"
        $cursor="pointer"
        onClick={() => navigate("/")}
      />

      <Row $gap="8px">
        {isLogin ? (
          <>
            <Img
              src={headerCart}
              alt="cart"
              $cursor="pointer"
              onClick={() => navigate("/order/cart")}
            />
            <Img
              src={headerHome}
              alt="home"
              $cursor="pointer"
              onClick={() => navigate("/")}
            />
          </>
        ) : (
          <Text
            as="button"
            onClick={() => navigate("/login")}
          >
            로그인
          </Text>
        )}
      </Row>
    </StickyHeader>
  );
}

export function SearchHeader() {
  const navigate = useNavigate();
  const { searchIcon } = useImg();
  const {
    resetInput,
    search: { search },
    setRecentKeyword,
  } = useInputStore();

  const searchSave = async () => {
    const newKeyword = {
      id: Date.now(),
      name: search,
    };

    if (search === "") {
      navigate("/search");
      return;
    }

    const storedKeywords = JSON.parse(localStorage.getItem("recentKeyword") || "[]");
    const updatedKeywords = [
      newKeyword,
      ...storedKeywords.filter((item: any) => item.name !== search),
    ];
    const limitedKeywords = updatedKeywords.slice(0, 10);

    setRecentKeyword(limitedKeywords);
    localStorage.setItem("recentKeyword", JSON.stringify(limitedKeywords));

    const queryParams = new URLSearchParams({
      keyword: search,
    });

    navigate(`/search?${queryParams.toString()}`);
  };

  const cancelSearch = () => {
    if (search === "") {
      navigate("/");
      return;
    } else {
      resetInput();
      navigate("/search");
    }
  };

  return (
    <StickyHeader $jus="space-between">
      <Row
        $w="100%"
        $gap="4px"
        $pad="0 12px 0 0"
        $align="center"
      >
        <Img
          src={searchIcon}
          alt="logo"
        />
        <Input
          $maxW="100%"
          name="search"
          value={search}
          onEnter={searchSave}
          place="검색어를 입력해주세요"
        />
      </Row>
      <Text
        as="button"
        $wSpace="nowrap"
        onClick={cancelSearch}
      >
        취소
      </Text>
    </StickyHeader>
  );
}
