import { useSearchParams } from "react-router-dom";

import Loading from "@/hook/Loading";
import { useProductSearch } from "@/api/reactQuery/getQuery/useSearch";
import SearchProduct from "./SearchProduct";
import { useHeart } from "@/hook/useHeart";
import { Fix } from "@/assets/style/common/useCommonStyle";
import Paging from "@/hook/paging/Paging";
import { usePageStore } from "@/stores/usePageStore";
import NoItem from "../common/NoItem";

export default function SearchContent() {
  const { currentPage } = usePageStore();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const {
    data: searchData,
    refetch,
    isLoading,
  } = useProductSearch({ page: currentPage, size: 11, keyword: keyword });
  const { isFavoriteClick } = useHeart({ refetch });

  if (isLoading) return <Loading />;

  return (
    <>
      {!searchData || (searchData?.content?.length === 0 && <NoItem />)}
      {searchData && (
        <>
          <SearchProduct
            data={searchData?.content}
            isFavoriteClick={isFavoriteClick}
          />
          <Fix
            $bottom="0px"
            $backColor="var(--c-mainBack)"
          >
            <Paging pageData={searchData} />
          </Fix>
        </>
      )}
    </>
  );
}
