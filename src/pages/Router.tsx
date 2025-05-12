import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { useRouter } from "./useRouter";
import Headers from "@/components/header/Headers";
import { Img, Text } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import Loading from "@/hook/Loading";
import { CommonProps } from "@/types/styleInterface";
import { useLoginStore } from "@/stores/useLoginStore";
import PrivateRoute from "./PrivateRoute";
import { useOverlay } from "@/hook/useOverlay";

const WrapLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaxLayout = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  background-color: var(--c-mainBack);
`;

const ContentLayout = styled.div<Pick<CommonProps, "$pad">>`
  position: relative;
  overflow-x: hidden;
  padding: ${(props) => props.$pad};
`;

const NavigateFix = styled.div<Pick<CommonProps, "$backColor">>`
  position: fixed;
  width: 100%;
  left: 50%;
  bottom: env(safe-area-inset-bottom);
  transform: translate(-50%, 0%);
  padding: 0 16px 16px;
  max-width: 600px;
  z-index: 999;
  background-color: ${(props) => (props.$backColor ? props.$backColor : "var(--c-mainBack)")};
`;

const NavigateWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 54px;
  border-radius: 8px;
  background-color: transparent;
`;

const NavigateItem = styled.a`
  min-width: 54px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export default function Router() {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
}

const RouterContent = () => {
  const navigate = useNavigate();
  const { routerList: route } = useRouter();
  const {
    searchIcon,
    activeSearch,

    cart,
    activeCart,

    home,
    activeHome,

    heart,
    activeHeart,

    mypage,
    activeMypage,
  } = useImg();
  const { search, pathname } = useLocation();
  const { isLogin } = useLoginStore();
  const { openConfirm, alertComponent, confirmComponent, modalComponent, toastComponent } =
    useOverlay();

  const navigateItem = [
    {
      key: 1,
      src: cart,
      active: activeCart,
      alt: "search",
      text: "장바구니",
      path: "/order/cart",
      privateLogin: true,
    },
    {
      key: 2,
      src: searchIcon,
      active: activeSearch,
      alt: "search",
      text: "검색",
      path: "/search",
      privateLogin: false,
    },
    {
      key: 3,
      src: home,
      path: "/",
      text: "홈",
      alt: "home",
      active: activeHome,
      privateLogin: false,
    },
    {
      key: 4,
      src: heart,
      alt: "heart",
      text: "관심상품",
      path: "/favorite",
      privateLogin: true,
      active: activeHeart,
    },
    {
      key: 5,
      text: "MY",
      src: mypage,
      alt: "mypage",
      path: "/my-page",
      privateLogin: true,
      active: activeMypage,
    },
  ];

  const pathMatch = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname.startsWith(path);
  };

  const pathPad = (path: string) => {
    if (path === "/") return "16px 0 70px";
    if (["/product", "/order/cart", "/payment", "/login"].some((prefix) => path.startsWith(prefix)))
      return "0px";
    if (path === "/favorite") return "0px 0px 70px";
    if (["/search"].some((prefix) => path.startsWith(prefix))) {
      if (path === "/search" && search.includes("keyword=")) return "0px";
    }

    return "16px 16px 100px";
  };

  const hideNavi = (pathname: string): boolean => {
    const hiddenPaths = ["/product", "/sendbox", "/my-page/", "/payment", "/fail"];

    if (pathname.startsWith("/search") && search.includes("keyword=")) {
      return true;
    }

    return hiddenPaths.some((path) => pathname.startsWith(path));
  };

  return (
    <WrapLayout>
      <React.Suspense fallback={<Loading />}>
        <MaxLayout>
          <Headers />
          <ContentLayout $pad={pathPad(pathname)}>
            <Routes>
              {route.map(({ path, component: Component, isPrivate }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ) : (
                      <Component />
                    )
                  }
                />
              ))}
            </Routes>
          </ContentLayout>
        </MaxLayout>

        {!hideNavi(pathname) && (
          <NavigateFix>
            <NavigateWrap className="morphism">
              {navigateItem.map(({ key, src, alt, text, path, privateLogin, active }) => (
                <NavigateItem
                  key={key}
                  onClick={(event) => {
                    event.preventDefault();
                    if (privateLogin && !isLogin) {
                      openConfirm({
                        title: "로그인이 필요한 서비스입니다.",
                        message: "로그인 페이지로 이동하시겠습니까?",
                        mainBtn: "로그인",
                        subBtn: "취소",
                        onFunc: () => {
                          navigate("/login");
                        },
                      });
                    } else {
                      navigate(path);
                    }
                  }}
                >
                  <Img
                    src={pathMatch(path) ? active : src}
                    alt={alt}
                  />
                  <Text $class={["captionB", pathMatch(path) ? "blue" : "gray888"]}>{text}</Text>
                </NavigateItem>
              ))}
            </NavigateWrap>
          </NavigateFix>
        )}
      </React.Suspense>

      {alertComponent}
      {modalComponent}
      {toastComponent}
      {confirmComponent}
    </WrapLayout>
  );
};
