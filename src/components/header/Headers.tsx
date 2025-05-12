import { useNavigate, useLocation, useMatch } from "react-router-dom";
import { BackSpaceHeader, LogoHeader, SearchHeader } from "./useHeader";
import { arrowHeaders, logoHeaders, searchHeaders } from "@/constant/useHeaderRoute";

export default function Headers() {
  const navigate = useNavigate();
  const location = useLocation();

  const productMatch = useMatch("/product/:id");
  const reviewMatch = useMatch("/my-page/review/write/:id");

  const orderDetailMatch = useMatch("/my-page/order-service/order-detail/:orderId");
  const claimDetailMatch = useMatch("/my-page/order-service/claim-detail/:orderId");

  const detailMatch = orderDetailMatch
    ? { type: "orderDetail", match: orderDetailMatch }
    : claimDetailMatch
    ? { type: "claimDetail", match: claimDetailMatch }
    : null;

  const logoHeader = logoHeaders.find((header) => header.path === location.pathname);
  const currentHeader = arrowHeaders.find((header) => {
    if (header.path === "/product/:id") {
      return productMatch;
    } else if (header.path === "/my-page/order-service/order-detail/:orderId") {
      return detailMatch?.type === "orderDetail";
    } else if (header.path === "/my-page/order-service/claim-detail/:orderId") {
      return detailMatch?.type === "claimDetail";
    } else if (header.path === "/my-page/review/write/:id") {
      return reviewMatch;
    }
    return header.path === location.pathname;
  });
  const searchHeader = searchHeaders.find((header) => {
    return header.path === location.pathname;
  });

  return currentHeader ? (
    <BackSpaceHeader
      msg={currentHeader.title}
      onClick={() => currentHeader.onClick(navigate)}
    />
  ) : logoHeader ? (
    <LogoHeader />
  ) : searchHeader ? (
    <SearchHeader />
  ) : null;
}
