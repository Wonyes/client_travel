import ProductMore from "./more/ProductMore";
import { useHomeMore } from "@/api/reactQuery/getQuery/useProduct";
import { useHeart } from "@/hook/useHeart";
import { usePageStore } from "@/stores/usePageStore";

export default function AllProduct() {
  const { currentPage } = usePageStore();
  const { data: all, refetch } = useHomeMore({ page: currentPage, size: 12 });
  const { isFavoriteClick } = useHeart({ refetch });

  return (
    <ProductMore
      data={all}
      isFavoriteClick={isFavoriteClick}
    />
  );
}
