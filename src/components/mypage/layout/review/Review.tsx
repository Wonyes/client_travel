import { useState } from "react";
import styled from "styled-components";

import { Fix, Row, Text } from "@/assets/style/common/useCommonStyle";
import { useMyReviewUnWrite, useMyReviewWrite } from "@/api/reactQuery/getQuery/useMy";
import { usePageStore } from "@/stores/usePageStore";
import NoItem from "@/components/common/NoItem";
import Loading from "@/hook/Loading";
import Paging from "@/hook/paging/Paging";
import Write from "./Write";
import UnWrite from "./UnWrite";

const FilterText = styled(Text)`
  font-size: var(--s-subText);
  color: var(--c-gray300);

  &.active {
    color: var(--c-black);
    text-decoration: underline;
  }
`;

export default function Review() {
  const { currentPage, size } = usePageStore();

  const {
    data: write,
    refetch: refetchWrite,
    isLoading: writeLoading,
  } = useMyReviewWrite({ page: currentPage, size });
  const {
    data: unWritten,
    refetch: unRefetch,
    isLoading: unWriteloading,
  } = useMyReviewUnWrite({
    page: currentPage,
    size,
  });

  const [filterType, setFilterType] = useState<number>(1);

  const filterSelect = (key: number) => {
    setFilterType(key);
  };

  const menuList = [
    { key: 1, title: "작성가능" },
    { key: 2, title: "작성완료" },
  ];

  const data = filterType === 1 ? unWritten : write;
  const noWriteList =
    filterType === 1 ? "작성 가능한 리뷰가 없습니다. " : "작성한 리뷰가 없습니다.";

  if (writeLoading || unWriteloading) return <Loading />;
  return (
    <>
      <Row
        $gap="8px"
        $pad="0 0 12px"
      >
        {menuList.map(({ key, title }) => (
          <FilterText
            key={key}
            as="button"
            onClick={() => filterSelect(key)}
            className={filterType === key ? "active" : ""}
          >
            {title}
          </FilterText>
        ))}
      </Row>
      {data?.content?.length === 0 ? (
        <NoItem text={noWriteList} />
      ) : (
        <>
          {filterType === 2 ? (
            <Write
              data={write}
              unRefetch={unRefetch}
              refetch={refetchWrite}
            />
          ) : (
            <UnWrite data={unWritten} />
          )}
        </>
      )}
      <Fix $backColor="var(--c-mainBack)">
        <Paging pageData={data} />
      </Fix>
    </>
  );
}
