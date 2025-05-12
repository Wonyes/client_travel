import styled from "styled-components";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Star from "@/hook/Star";
import SearchContent from "./SearchContent";
import TitleHeader from "../header/TitleHeader";

import { useDrag } from "@/utils/useDrag";
import { useImg } from "@/assets/style/common/useImg";
import { useInputStore } from "@/stores/useInputStore";
import { useBestSearch, useRecommendSearch } from "@/api/reactQuery/getQuery/useSearch";

import { Between, Column, Img, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import NoItem from "../common/NoItem";

const RecentSearch = styled.button<{ bgImage?: string }>`
  padding: 4px 10px;
  border-radius: 999px;
  min-width: 80px;
  max-width: 80px;
  font-family: var(--f-caption);
  font-size: var(--s-caption);
`;

const RecentSearchWrap = styled(Row)`
  gap: 12px;
  overflow: auto;
  padding: 6px 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HotSearchWrap = styled.ol`
  gap: 12px;
  overflow: hidden;
  display: grid;
  grid-auto-flow: column;
  grid-template: repeat(5, auto) / repeat(5, 50%);
`;

const HotSearch = styled.li`
  gap: 8px;
  display: flex;
  align-items: center;

  overflow: hidden;
`;

const RecommnedList = styled(Between)`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #ebf3ff;
`;

const TruncatedText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { rightArrow, deleteIcon } = useImg();

  const { data: best, refetch } = useBestSearch();
  const { data: recommend, refetch: recommendRefetch } = useRecommendSearch({ size: 5 });

  const dragRef = React.useRef<HTMLDivElement>(null);

  const { mouseDownEvent, mouseMoveEvent, mouseUpEvent, mouseLeaveEvent } = useDrag({
    dragRef,
  });
  const {
    search: { recentKeyword },
    setRecentKeyword,
  } = useInputStore();

  // 개별삭제
  const recentKeyDelete = (id: number) => {
    const nextKeyword = recentKeyword.filter((keyword) => keyword.id !== id);
    setRecentKeyword(nextKeyword);
    localStorage.setItem("recentKeyword", JSON.stringify(nextKeyword));
  };

  // 전체삭제
  const recentAllClear = () => {
    setRecentKeyword([]);
    localStorage.removeItem("recentKeyword");
  };

  useEffect(() => {
    const localKey = JSON.parse(localStorage.getItem("recentKeyword") || "[]");
    setRecentKeyword(localKey);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([refetch(), recommendRefetch()]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      refetch();
    }
  }, [searchParams, refetch]);

  return (
    <Column
      $h="100%"
      $gap="12px"
    >
      {searchParams.get("keyword") && <SearchContent />}
      {!searchParams.get("keyword") && (
        <>
          <MorphismBox
            $pad="0"
            $backColor="rgba(255, 255, 255, 0.5)"
          >
            <Column
              $gap="6px"
              $pad="12px 0px 6px 12px"
            >
              <TitleHeader
                pad="0 12px 0 0"
                title="최근 검색어"
                subTitle="전체삭제"
                onClick={recentAllClear}
              />
              <RecentSearchWrap
                ref={dragRef}
                onMouseUp={mouseUpEvent}
                onMouseDown={mouseDownEvent}
                onMouseMove={mouseMoveEvent}
                onMouseLeave={mouseLeaveEvent}
              >
                {recentKeyword.length !== 0 ? (
                  recentKeyword.map(({ name, id }) => (
                    <RecentSearch
                      key={id}
                      className="morphism"
                      onClick={() => navigate(`/search?keyword=${name}`)}
                    >
                      <Row
                        $jus="center"
                        $align="center"
                        $position="relative"
                      >
                        <TruncatedText $class="caption">{name}</TruncatedText>
                        <Img
                          $w="14px"
                          $h="14px"
                          $top="-10%"
                          $right="-4px"
                          src={deleteIcon}
                          $position="absolute"
                          onClick={(e) => {
                            recentKeyDelete(id);
                            e.stopPropagation();
                          }}
                        />
                      </Row>
                    </RecentSearch>
                  ))
                ) : (
                  <Row
                    $w="100%"
                    $pad="12px 0"
                    $jus="center"
                  >
                    <Text $class={"gray888"}>최근 검색어가 없습니다.</Text>
                  </Row>
                )}
              </RecentSearchWrap>
            </Column>
          </MorphismBox>

          <MorphismBox>
            <Column $gap="12px">
              <TitleHeader
                pad="0"
                title="인기 검색어"
              />
              <HotSearchWrap>
                {best &&
                  best.map(({ keyword, rank }) => (
                    <HotSearch key={rank}>
                      <Text
                        $minW="20px"
                        $class={["blue"]}
                      >
                        {rank}
                      </Text>
                      <TruncatedText
                        $class={["subText"]}
                        onClick={() => navigate(`/search?keyword=${keyword}`)}
                      >
                        {keyword}
                      </TruncatedText>
                    </HotSearch>
                  ))}
              </HotSearchWrap>
            </Column>
          </MorphismBox>

          <MorphismBox>
            <Column $gap="12px">
              <TitleHeader
                pad="0"
                title="추천 상품"
              />
              {!recommend && <NoItem text="추천 상품이 없습니다." />}
              {recommend && (
                <Column $gap="12px">
                  {recommend &&
                    recommend.map(({ productName, averageRate, id }) => (
                      <RecommnedList
                        key={id}
                        onClick={() => navigate(`/product/${id}`)}
                      >
                        <Column $over="hidden">
                          <TruncatedText $color="var(--c-blue)">{productName}</TruncatedText>
                          <Star rating={Number(averageRate)} />
                        </Column>
                        <Img
                          src={rightArrow}
                          alt="right"
                          $w="24px"
                          $cursor="pointer"
                        />
                      </RecommnedList>
                    ))}
                </Column>
              )}
            </Column>
          </MorphismBox>
        </>
      )}
    </Column>
  );
}
