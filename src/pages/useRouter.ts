import React from "react";

import Login from "@/components/login/Login";
import Index from "@/components/main/Index";

import OrderHistory from "@/components/mypage/layout/order/OrderHistory";
import ClaimHistory from "@/components/mypage/layout/order/ClaimHistory";
import HistoryDetail from "@/components/mypage/layout/order/HistoryDetail";

import MyInfo from "@/components/mypage/layout/MyInfo";
import MyPage from "@/components/mypage/MyPage";
import Search from "@/components/search/Search";

import OrderForm from "@/components/product/OrderForm";
import AllProduct from "@/components/product/AllProduct";
import ProductDetail from "@/components/product/ProductDetail";

import CartLayout from "@/components/cart/CartLayout";
import Favorite from "@/components/favorite/Favorite";
import Recommend from "@/components/product/Recommend";

import Counsel from "@/components/mypage/layout/Counsel";
import Inquriry from "@/components/mypage/layout/inquiry/Inquriry";

import { Oauth } from "@/components/login/oauth/Oauth";
import { FailPage } from "@/components/product/payment/Fail";
import { PaymentSuccessPage } from "@/components/product/payment/Success";
import Review from "@/components/mypage/layout/review/Review";
import QA from "@/components/mypage/layout/QA";
import Best from "@/components/product/Best";
import ReviewWrite from "@/components/mypage/layout/review/ReviewWrite";
export interface RouterProps {
  path: string;
  isPrivate?: boolean;
  component: React.ComponentType;
}

export function useRouter() {
  const routerList: RouterProps[] = [
    // main page
    { path: "/", component: Index },
    // login page
    { path: "/login", component: Login },
    { path: "/oauth/redirect", component: Oauth },

    // payment page
    { path: "/payment/fail", component: FailPage, isPrivate: true },
    { path: "/payment/success", component: PaymentSuccessPage, isPrivate: true },

    // cart page
    { path: "/order/cart", component: CartLayout, isPrivate: true },

    // more page
    { path: "/product/all", component: AllProduct },
    { path: "/product/recommend", component: Recommend },
    { path: "/product/best", component: Best },

    //product datail & end order page
    { path: "/product/:id", component: ProductDetail },
    { path: "/product/orderform", component: OrderForm, isPrivate: true },

    // bottom action page
    { path: "/search", component: Search },

    { path: "/my-page", component: MyPage, isPrivate: true },
    { path: "/favorite", component: Favorite, isPrivate: true },

    // mypage-option page
    { path: "/my-page/qa", component: QA, isPrivate: true },
    { path: "/my-page/review", component: Review, isPrivate: true },
    { path: "/my-page/my-info", component: MyInfo, isPrivate: true },
    { path: "/my-page/counsel", component: Counsel, isPrivate: true },
    { path: "/my-page/counsel/inquiry", component: Inquriry, isPrivate: true },
    { path: "/my-page/review/write/:id", component: ReviewWrite, isPrivate: true },
    // option-history page
    { path: "/my-page/order-service/order", component: OrderHistory, isPrivate: true },
    { path: "/my-page/order-service/claim", component: ClaimHistory, isPrivate: true },
    {
      path: "/my-page/order-service/order-detail/:orderId",
      component: HistoryDetail,
      isPrivate: true,
    },
    {
      path: "/my-page/order-service/claim-detail/:orderId",
      component: HistoryDetail,
      isPrivate: true,
    },
  ];
  return { routerList };
}
