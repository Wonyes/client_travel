import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { fetchData } from "../useQuerys";

export const useEnumInquiry = () => {
  const url = "enums/client/inquiry/states";
  return useQuery({
    queryKey: [queryKeys.enums.inquiry],
    queryFn: () => fetchData({ url }),
    staleTime: 1000 * 60,
  });
};

// 취소 이유
export const useCancelReason = (params?: object) => {
  const url = "enums/product-order/cancel-reason";
  return useQuery({
    queryKey: [queryKeys.enums.cancelReason, url],
    queryFn: () => fetchData({ url, params }),
    staleTime: 1000 * 60,
  });
};

// 반품이유
export const useReturnReason = (params?: object) => {
  const url = "enums/product-order/return-reason";
  return useQuery({
    queryKey: [queryKeys.enums.returnReason, url],
    queryFn: () => fetchData({ url, params }),
    staleTime: 1000 * 60,
  });
};
