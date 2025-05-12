import ProductMore from "./more/ProductMore";
import { useRecommend } from "@/api/reactQuery/getQuery/useProduct";
import { usePageStore } from "@/stores/usePageStore";
import { useHeart } from "@/hook/useHeart";
import Loading from "@/hook/Loading";

export default function Recommend() {
  const { size } = usePageStore();
  const { data: recommend, refetch, isLoading } = useRecommend({ size });
  const { isFavoriteClick } = useHeart({ refetch });
  if (isLoading) return <Loading />;

  return (
    <ProductMore
      data={recommend}
      isFavoriteClick={isFavoriteClick}
    />
  );
}
