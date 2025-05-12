const arrowHeaders = [
  { title: "로그인", path: "/login", onClick: (navigate: any) => navigate(-1) },
  {
    title: "회원정보 수정",
    path: "/my-page/my-info",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "구매상세내역",
    path: "/my-page/order-service/order-detail/:orderId",
    onClick: (navigate: any) => navigate("/my-page/order-service/order"),
  },
  {
    title: "환불상세내역",
    path: "/my-page/order-service/claim-detail/:orderId",
    onClick: (navigate: any) => navigate("/my-page/order-service/claim"),
  },
  {
    title: "구매내역",
    path: "/my-page/order-service/order",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "취소/반품 완료내역",
    path: "/my-page/order-service/claim",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "1:1 문의 내역",
    path: "/my-page/counsel",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "1:1 문의",
    path: "/my-page/counsel/inquiry",
    onClick: (navigate: any) => navigate("/my-page/counsel"),
  },
  {
    title: "상품 문의 내역",
    path: "/my-page/qa",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "주문서",
    path: "/product/orderform",
    onClick: (navigate: any) => navigate(-1),
  },
  {
    title: "추천 상품",
    path: "/product/recommend",
    onClick: (navigate: any) => navigate("/"),
  },
  {
    title: "일반 상품",
    path: "/product/all",
    onClick: (navigate: any) => navigate("/"),
  },
  {
    title: "베스트 상품",
    path: "/product/best",
    onClick: (navigate: any) => navigate("/"),
  },
  {
    title: "후기",
    path: "/my-page/review",
    onClick: (navigate: any) => navigate("/my-page"),
  },
  {
    title: "후기 작성",
    path: "/my-page/review/write/:id",
    onClick: (navigate: any) => navigate("/my-page/review"),
  },
  {
    title: "장바구니",
    path: "/order/cart",
    onClick: (navigate: any) => navigate(-1),
  },
  {
    title: "상품 상세",
    path: "/product/:id",
    onClick: (navigate: any) => navigate("/"),
  },
];

const logoHeaders = [{ path: "/" }, { path: "/favorite" }];

const searchHeaders = [{ path: "/search" }, { path: "/search/keyword/:keyword" }];

export { arrowHeaders, logoHeaders, searchHeaders };
