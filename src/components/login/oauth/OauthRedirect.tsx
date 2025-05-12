import styled from "styled-components";

import { Google, Kakao, Naver } from "@/assets/style/common/IconCompo";
import { Column, Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

const Oauth = styled.div`
  display: flex;
  width: fit-content;
`;

const getOauthUrl = (provider: string) => {
  const serverUrl = `${import.meta.env.VITE_SERVER_IP}`;
  const currentUrl = new URL(window.location.href);
  const webUrl = `${currentUrl.protocol}//${currentUrl.host}`;
  return `${serverUrl}/oauth2/authorization/${provider}?redirect_uri=${webUrl}/oauth/redirect`;
};

export default function OauthLRedirect() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");

  const { logo } = useImg();

  return (
    <Row
      $w="100%"
      $gap="12px"
      $jus="center"
      $align="center"
      $h="calc(100vh - 200px)"
    >
      <Column
        $w="100%"
        $gap="8px"
        $pad="16px"
        $maxW="380px"
        $radius="8px"
        $align="center"
        className="morphism"
        $bor="1px solid var(--c-line)"
      >
        <Img
          src={logo}
          alt="logo"
          $w="150px"
          $pad="0 0 12px"
        />
        <MorphismBox
          $w="100%"
          $maxW="320px"
          $h="fit-content"
        >
          <Row
            as="a"
            $gap="12px"
            $align="center"
            $jus="center"
            $cursor="pointer"
            href={getOauthUrl("kakao")}
          >
            <Oauth>
              <Kakao size="24" />
            </Oauth>
            <Text $class="title">Kakao 로그인</Text>
          </Row>
        </MorphismBox>
        <MorphismBox
          $w="100%"
          $maxW="320px"
          $h="fit-content"
        >
          <Row
            as="a"
            $gap="12px"
            $align="center"
            $jus="center"
            $cursor="pointer"
            href={getOauthUrl("naver")}
          >
            <Oauth>
              <Naver size="24" />
            </Oauth>
            <Text $class="title">Naver 로그인</Text>
          </Row>
        </MorphismBox>
        <MorphismBox
          $w="100%"
          $maxW="320px"
          $h="fit-content"
        >
          <Row
            as="a"
            $gap="12px"
            $align="center"
            $jus="center"
            $cursor="pointer"
            href={getOauthUrl("google")}
          >
            <Oauth>
              <Google size="24" />
            </Oauth>
            <Text $class="title">Google 로그인</Text>
          </Row>
        </MorphismBox>
      </Column>
    </Row>
  );
}
