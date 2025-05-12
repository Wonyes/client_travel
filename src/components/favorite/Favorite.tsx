import ProductMore from "../product/more/ProductMore";
import { useFavorite } from "@/api/reactQuery/getQuery/useProduct";
import { useHeart } from "@/hook/useHeart";
import { usePageStore } from "@/stores/usePageStore";

export default function Favorite() {
  const { currentPage } = usePageStore();
  const { data: favorite, refetch } = useFavorite({ page: currentPage, size: 12 });

  const { isFavoriteClick } = useHeart({ refetch });

  return (
    <ProductMore
      data={favorite?.content}
      isFavoriteClick={isFavoriteClick}
    />
  );
}
