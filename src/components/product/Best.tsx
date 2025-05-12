import ProductMore from "./more/ProductMore";
import { useProductBest } from "@/api/reactQuery/getQuery/useProduct";
import { usePageStore } from "@/stores/usePageStore";
import { useHeart } from "@/hook/useHeart";

export default function Best() {
  const { currentPage } = usePageStore();
  const { data: best, refetch } = useProductBest({ page: currentPage, size: 12 });
  const { isFavoriteClick } = useHeart({ refetch });
  return (
    <ProductMore
      data={best}
      isFavoriteClick={isFavoriteClick}
    />
  );
}
