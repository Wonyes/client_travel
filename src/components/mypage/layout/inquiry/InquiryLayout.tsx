import { useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { LineBtn } from "@/hook/useButton";
import NoItem from "@/components/common/NoItem";

import { Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import Paging from "@/hook/paging/Paging";

const WrapperText = styled(Text)`
  position: relative;
  overflow: hidden;
`;

const ExpendingBtn = styled.button`
  cursor: pointer;
  padding-left: 4px;
  color: var(--c-gray888);
`;

export default function InquiryLayout({ inquiry }: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const path = "qa";
  const inquiryRegisPath = "/my-page/counsel/inquiry";

  const inquiryRegis = () => {
    navigate(inquiryRegisPath);
  };
  return (
    <>
      {inquiry.content.length !== 0 ? (
        <Column
          $gap="12px"
          $pad={!path && "0 0 68px"}
        >
          {inquiry &&
            inquiry.content.map(({ id, inquiry, answer, inquiryAt, answerAt, resolvedMeaning }) => {
              const isExpanded = expanded.includes(id);

              return (
                <Column
                  $gap="4px"
                  key={id}
                >
                  <MorphismBox>
                    <Row
                      $gap="8px"
                      $align="flex-start"
                    >
                      <Text $class={"title"}>Q.</Text>
                      <Column>
                        <Text
                          $class={"title"}
                          $color="var(--c-blue)"
                        >
                          {resolvedMeaning}
                        </Text>
                        <WrapperText>
                          <Text
                            as="pre"
                            $dis="inline"
                            $wSpace="pre-wrap"
                          >
                            {!isExpanded ? inquiry.slice(0, 10) : inquiry}
                          </Text>
                          {inquiry.length > 20 && (
                            <ExpendingBtn onClick={() => toggleExpand(id)}>
                              {isExpanded ? "접기" : "...더보기"}
                            </ExpendingBtn>
                          )}
                        </WrapperText>
                        <Text $class={["captionB", "gray888"]}>{inquiryAt}</Text>
                      </Column>
                    </Row>
                  </MorphismBox>

                  {answerAt && (
                    <MorphismBox>
                      <Row
                        $gap="8px"
                        $align="flex-start"
                      >
                        <Text $class={"title"}>A.</Text>
                        <Column>
                          <Text
                            $class={"title"}
                            $color="var(--c-blue)"
                          >
                            {answer ? "답변완료" : "미답변"}
                          </Text>
                          <WrapperText>
                            <Text
                              as="pre"
                              $dis="inline"
                              $wSpace="pre-wrap"
                            >
                              {answer || "답변이 아직 등록되지 않았습니다."}
                            </Text>
                          </WrapperText>
                          <Text $class={["captionB", "gray888"]}>{answerAt}</Text>
                        </Column>
                      </Row>
                    </MorphismBox>
                  )}
                </Column>
              );
            })}
        </Column>
      ) : (
        <NoItem text="문의 내역이 없습니다." />
      )}
      <Column
        $w="100%"
        $gap="12px"
        $right="50%"
        $maxW="600px"
        $bottom="0px"
        $pad="16px"
        $position="fixed"
        $trans="translateX(50%)"
        $backColor="var(--c-mainBack)"
      >
        <MorphismBox $pad="0px">
          <Paging pageData={inquiry} />
        </MorphismBox>
        {pathname === "/my-page/counsel" && (
          <LineBtn
            msg={"1:1 문의하기"}
            onClick={inquiryRegis}
          />
        )}
      </Column>
    </>
  );
}
