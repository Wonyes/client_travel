import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../useQuerys";
import { queryKeys } from "../queryKeys";

export function useBest(params: object) {
  const url = "client/product/best";
  return useQuery({
    queryKey: [queryKeys.product.best],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useRecommend(params: object) {
  const url = "client/product/recommended";
  return useQuery({
    queryKey: [queryKeys.product.recommend],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useHome(params: object) {
  const url = "client/product/home";
  return useQuery({
    queryKey: [queryKeys.product.home],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useHomeMore(params: object) {
  const url = "client/product/more";
  return useQuery({
    queryKey: [queryKeys.product.homeMore, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
  });
}

export function useInquiryCount({ id }: { id: string }) {
  const url = `client/product/review-inquiry-count/${id}`;
  return useQuery({
    queryKey: [queryKeys.product.count],
    queryFn: () => {
      return fetchData({ url });
    },
    staleTime: 0,
  });
}

export function useDetail({ id }: { id: string }) {
  const url = `client/product/${id}`;
  return useQuery({
    queryKey: [queryKeys.product.detail],
    queryFn: () => {
      return fetchData({ url });
    },
    staleTime: 0,
  });
}

export function useCart(params: object) {
  const url = "cart";
  return useQuery({
    queryKey: [queryKeys.product.cart, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useFavorite(params: object) {
  const url = "client/favorite/my";
  return useQuery({
    queryKey: [queryKeys.product.favorite, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
  });
}

export function useFavoriteState(url: string) {
  return useQuery({
    queryKey: [queryKeys.product.favorite],
    queryFn: () => {
      return fetchData({ url });
    },
  });
}

export function useOrderForm() {
  const url = "/client/product-order/form";
  return useQuery({
    queryKey: [queryKeys.product.orderForm],
    queryFn: () => {
      return fetchData({ url });
    },
  });
}

export function useProductInquiry(id: string, params: object) {
  const url = `client/inquiry/product/${id}`;
  return useQuery({
    queryKey: [queryKeys.product.inquiry, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useProductBest(params: object) {
  const url = "client/product/best/more";
  return useQuery({
    queryKey: [queryKeys.product.best, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useProductReview(params: object, url: string) {
  return useQuery({
    queryKey: [queryKeys.product.review, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}
