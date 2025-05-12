import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "../useQuerys";

export function useProductSearch(params: object) {
  const url = "client/search/product-search";

  return useQuery({
    queryKey: [queryKeys.search.product, params],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 0,
  });
}

export function useBestSearch() {
  const url = "client/search/popular";
  return useQuery({
    queryKey: [queryKeys.search.best],
    queryFn: () => {
      return fetchData({ url });
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useRecommendSearch(params: object) {
  const url = "client/search/recommended/review";
  return useQuery({
    queryKey: [queryKeys.search.recommend],
    queryFn: () => {
      return fetchData({ url, params });
    },
    staleTime: 1000 * 60 * 5,
  });
}
