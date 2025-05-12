import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Between,
  Column,
  Fix,
  Img,
  LineSection,
  MorphismBox,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";

import { usePageStore } from "@/stores/usePageStore";
import { useClaimList } from "@/api/reactQuery/getQuery/useMy";

import Loading from "@/hook/Loading";
import NoItem from "@/components/common/NoItem";
import { format } from "date-fns";
import Paging from "@/hook/paging/Paging";

const FilterText = styled(Text)`
  font-size: var(--s-captionB);
  color: var(--c-gray300);

  &.active {
    color: var(--c-black);
    text-decoration: underline;
  }
`;

export default function ClaimHistory() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>("ALL");

  const { currentPage, size } = usePageStore();
  const { data: ciaimData, isLoading } = useClaimList({
    size,
    page: currentPage,
    condition: filterType,
  });

  const filterSelect = (type: string) => {
    setFilterType(type);
  };

  const menuList = [
    { key: 0, title: "전체", type: "ALL" },
    { key: 1, title: "취소", type: "CANCEL" },
    { key: 2, title: "반품", type: "RETURN" },
  ];

  const noListTitle =
    filterType === "ALL"
      ? "취소/반품한 내역이 없습니다."
      : filterType === "CANCEL"
      ? "취소한 내역이 없습니다."
      : "반품한 내역이 없습니다.";

  if (isLoading) return <Loading />;
  return (
    <>
      <Row
        $gap="6px"
        $pad="0 0 12px"
      >
        {menuList.map(({ key, title, type }) => (
          <FilterText
            key={key}
            as="button"
            onClick={() => filterSelect(type)}
            className={filterType === type ? "active" : ""}
          >
            {title}
          </FilterText>
        ))}
      </Row>
      {ciaimData.content.length === 0 ? (
        <NoItem text={noListTitle} />
      ) : (
        <Column $gap="8px">
          {ciaimData.content.map(
            ({
              channelProductOrderId,
              directOption,
              id,
              productId,
              purchaseAt,
              cancelOrReturnStateMeaning,
              productName,
              pri,
              ticketStateMeaning,
              ticketUsedStateMeaning,
            }) => (
              <MorphismBox
                key={id}
                $pad="12px"
              >
                <Row $gap="12px">
                  <ThumbnailWrap
                    $h="auto"
                    $radius="8px"
                    $maxH="140px"
                    $maxW="140px"
                  >
                    <ThumbnailBox
                      $aspect="1/1"
                      onClick={() => navigate(`/product/${productId}`)}
                    >
                      <Img
                        src={pri}
                        $w="100%"
                        $h="100%"
                        $radius="8px"
                        loading="lazy"
                        alt="상품 이미지"
                        $objectFit="cover"
                      />
                    </ThumbnailBox>
                  </ThumbnailWrap>

                  <Column
                    $w="100%"
                    $gap="8px"
                    $flex="1 1 auto"
                  >
                    <Column $gap="4px">
                      <Between $gap="12px">
                        <WrapperText $class={"captionB"}>{productName}</WrapperText>
                        <Text
                          $wSpace="nowrap"
                          $cursor="pointer"
                          $class={["captionB", "blue"]}
                          onClick={() => navigate(`/my-page/order-service/claim-detail/${id}`)}
                        >
                          상세보기
                        </Text>
                      </Between>
                      <LineSection
                        $w="100%"
                        $borB="1px solid var(--c-line)"
                      />
                    </Column>

                    <Column>
                      <Row>
                        <Text
                          $minW="90px"
                          $class={["caption", "gray300"]}
                        >
                          예매번호
                        </Text>
                        <WrapperText
                          $minW="90px"
                          $class={"captionB"}
                        >
                          {channelProductOrderId}
                        </WrapperText>
                      </Row>
                      <Row>
                        <Text
                          $minW="90px"
                          $class={["caption", "gray300"]}
                        >
                          예매일
                        </Text>
                        <WrapperText
                          $minW="90px"
                          $class={"captionB"}
                        >
                          {format(purchaseAt, "yyyy-MM-dd hh:mm")}
                        </WrapperText>
                      </Row>
                      <Row>
                        <Text
                          $minW="90px"
                          $class={["caption", "gray300"]}
                        >
                          관람일
                        </Text>
                        <WrapperText
                          $minW="90px"
                          $class={"captionB"}
                        >
                          {directOption}
                        </WrapperText>
                      </Row>
                      <Row>
                        <Text
                          $minW="90px"
                          $class={["caption", "gray300"]}
                        >
                          상태
                        </Text>
                        <WrapperText $class={["captionB", "blue"]}>
                          {ticketStateMeaning}
                        </WrapperText>
                      </Row>

                      <Row>
                        <Text
                          $minW="90px"
                          $class={["caption", "gray300"]}
                        >
                          사용여부
                        </Text>
                        <Row $gap="4px">
                          <WrapperText
                            $class={[
                              "captionB",
                              ticketUsedStateMeaning === "사용 불가능" ? "red" : "blue",
                            ]}
                          >
                            {ticketUsedStateMeaning}
                          </WrapperText>
                        </Row>
                      </Row>
                      {cancelOrReturnStateMeaning !== "-" && (
                        <Row>
                          <Text
                            $minW="90px"
                            $class={["caption", "gray300"]}
                          >
                            취소/반품 상태
                          </Text>
                          <WrapperText $class={["captionB", "red"]}>
                            {cancelOrReturnStateMeaning}
                          </WrapperText>
                        </Row>
                      )}
                    </Column>
                  </Column>
                </Row>
              </MorphismBox>
            )
          )}
        </Column>
      )}
      <Fix $backColor="var(--c-white)">
        <Paging pageData={ciaimData} />
      </Fix>
    </>
  );
}
