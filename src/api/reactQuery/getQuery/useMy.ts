import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "../useQuerys";

export const useCounsel = (params?: object) => {
  const url = "client/inquiry";

  return useQuery({
    queryKey: [queryKeys.mypage.counsel, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};
export const useQa = (params?: object) => {
  const url = "client/inquiry/product";

  return useQuery({
    queryKey: [queryKeys.mypage.qa, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};

export const useMyInfo = () => {
  const url = "my";

  return useQuery({
    queryKey: [queryKeys.mypage.my],
    queryFn: () => fetchData({ url }),
    staleTime: 0,
  });
};

export const usePurchaseCount = () => {
  const url = "my/purchase-review-count";

  return useQuery({
    queryKey: [queryKeys.mypage.purchaseCount],
    queryFn: () => fetchData({ url }),
    staleTime: 0,
  });
};

export const useExistNickname = (nickname: string) => {
  const url = "my/exist-nickname";

  return useQuery({
    queryKey: [queryKeys.mypage.existNick],
    queryFn: () => fetchData({ url, params: { nickname } }),
    staleTime: 1000 * 60 * 5,

    enabled: false,
  });
};

export const useOrderList = (params: object) => {
  const url = "client/product-order";

  return useQuery({
    queryKey: [queryKeys.mypage.order, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};

export const useClaimList = (params: object) => {
  const url = "client/product-order/cancel-return";
  return useQuery({
    queryKey: [queryKeys.mypage.claim, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};

export const useOrderDetail = (url: string) => {
  return useQuery({
    queryKey: [queryKeys.mypage.orderDetail],
    queryFn: () => fetchData({ url }),
    staleTime: 0,
  });
};

export const useMyInquiryList = (params) => {
  const url = "client/inquiry/product";
  return useQuery({
    queryKey: [queryKeys.mypage.inquiry, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};
export const useMyReviewWrite = (params) => {
  const url = "client/review/my";
  return useQuery({
    queryKey: [queryKeys.mypage.review, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};

export const useMyReviewUnWrite = (params) => {
  const url = "client/review/my/unwritten";
  return useQuery({
    queryKey: [queryKeys.mypage.unReview, params],
    queryFn: () => fetchData({ url, params }),
    staleTime: 0,
  });
};
