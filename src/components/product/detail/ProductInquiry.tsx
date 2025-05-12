import { useState } from "react";
import styled from "styled-components";

import { Column, Row, Text } from "@/assets/style/common/useCommonStyle";

import { BlueBtn, LineBtn } from "@/hook/useButton";
import Loading from "@/hook/Loading";
import InquiryUi from "./inquiry/InquiryUi";
import TextFiled from "@/hook/TextFiled";
import { useTextStore } from "@/stores/useTextStore";
import { BasicCheck } from "@/hook/useCheck";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";
import { queryKeys } from "@/api/reactQuery/queryKeys";
import Paging from "@/hook/paging/Paging";
import { usePageStore } from "../../../stores/usePageStore";
import { useProductInquiry } from "@/api/reactQuery/getQuery/useProduct";
import { useEnumInquiry } from "@/api/reactQuery/getQuery/useEnums";
import NoItem from "@/components/common/NoItem";

const InquiryLine = styled.div`
  border-bottom: 1px solid var(--c-line);
  padding: 16px;
`;

const CategoryWrap = styled(Row)`
  gap: 8px;
`;

const Category = styled.li`
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--c-gray888);
  border: 1px solid var(--c-line);
  background-color: var(--c-white);

  cursor: pointer;

  &.active {
    color: var(--c-white);
    background-color: #444;
    border: 1px solid transparent;
  }
`;

export default function ProductInquiry({ id }: { id: string }) {
  const [filterTab, setFilterTab] = useState<string>("ALL");
  const [inquiryNum, setInquiryNum] = useState<number>(0);

  const [inquiryDetail, setInquiryDetail] = useState<boolean>(false);
  const [inquiryWriting, setInquiryWriting] = useState<boolean>(false);
  const [privateInquiry, setPrivateInquiry] = useState<boolean>(false);

  const { resetTextValues, productInquiry } = useTextStore();
  const { currentPage, setCurrentPage, size } = usePageStore();

  const queryClient = useQueryClient();

  const { data: filter, isLoading: isFilter } = useEnumInquiry();
  const { data: inquiry, isLoading: isInquiry } = useProductInquiry(id, {
    page: currentPage,
    size: size,
    filterClientInquiry: filterTab,
  });

  const body = {
    inquiry: productInquiry,
    isPrivate: privateInquiry,
  };

  const queryKey = [queryKeys.product.count];
  const queryKey2 = [queryKeys.product.inquiry];

  const { mutate: inquiryRegis } = useMutation({
    mutationFn: () => {
      return Post({
        url: `client/inquiry/product/${id}`,
        body: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: queryKey2 });
      resetTextValues();
    },
  });

  const isInquiryRegis = () => {
    inquiryRegis();
  };

  const isSingleCheck = () => {
    setPrivateInquiry((prev) => !prev);
  };

  const filterChange = (filter: string) => {
    setCurrentPage(0);
    setFilterTab(filter);
  };

  const inquiryMore = (id: number) => {
    if (inquiryNum === id) {
      setInquiryNum(0);
      setInquiryDetail(false);
    } else {
      setInquiryNum(id);
      setInquiryDetail(true);
    }
  };

  const isWriting = () => {
    setInquiryWriting((prev) => !prev);
  };

  if (isFilter || isInquiry) return <Loading />;

  return (
    <Column $backColor="var(--c-white)">
      <InquiryLine>
        <Column $gap="16px">
          <LineBtn
            $mar="16px"
            onClick={isWriting}
            msg={inquiryWriting ? "문의 작성닫기" : "문의 작성하기"}
          />
          {inquiryWriting && (
            <Column $gap="8px">
              <TextFiled
                name="productInquiry"
                value={productInquiry}
                place="문의 내용을 입력해주세요."
              />
              <Row $jus="space-between">
                <Text $class={["captionB", "blue"]}>최소 10글자 이상 작성해 주세요.</Text>
                <Text $class={["captionB"]}>{productInquiry.length} / 300</Text>
              </Row>
              <BasicCheck
                label="비공개로문의하기"
                onChange={() => isSingleCheck()}
              />
              <BlueBtn
                msg="등록하기"
                onClick={isInquiryRegis}
              />
            </Column>
          )}
        </Column>
      </InquiryLine>
      <InquiryLine>
        <CategoryWrap>
          {filter.map(({ meaning, enumValue }) => (
            <Category
              key={enumValue}
              className={filterTab === enumValue ? "active" : ""}
              onClick={() => filterChange(enumValue)}
            >
              {meaning}
            </Category>
          ))}
        </CategoryWrap>
      </InquiryLine>

      {!inquiry || (inquiry.content.length === 0 && <NoItem text="등록된 문의가 없습니다." />)}

      {inquiry && inquiry.totalElements !== 0 && (
        <InquiryUi
          inquiry={inquiry}
          inquiryNum={inquiryNum}
          inquiryMore={inquiryMore}
          inquiryDetail={inquiryDetail}
        />
      )}
      <Paging pageData={inquiry} />
    </Column>
  );
}
