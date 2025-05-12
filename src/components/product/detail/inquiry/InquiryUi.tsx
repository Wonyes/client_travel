import styled from "styled-components";
import { useImg } from "@/assets/style/common/useImg";
import { Between, Column, Img, LineSection, Row, Text } from "@/assets/style/common/useCommonStyle";

const InquiryLayout = styled(Column)`
  height: 100%;
  gap: 12px;
  padding: 16px;
  background: var(--c-white);
`;

const InquiryList = styled(Column)`
  height: 100%;
  padding: 16px;
  border-radius: 8px;
  background: var(--c-mainBack);
`;

const RotateBtn = styled(Img)`
  transform: rotate(0deg);

  &.active {
    transform: rotate(180deg);
  }
`;

const AnswerBox = styled(Text)`
  overflow-y: auto;
  max-height: 150px;
  white-space: pre-wrap;
  &::-webkit-scrollbar {
    width: 4px !important;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--c-gray888);
    border-radius: 999px;
  }
`;

interface InquiryListProps {
  inquiry: any;
  inquiryNum: number;
  inquiryDetail: boolean;
  inquiryMore: (id: number) => void;
}

export default function InquiryUi({
  inquiry,
  inquiryNum,
  inquiryMore,
  inquiryDetail,
}: InquiryListProps) {
  const { upDownArrow } = useImg();

  return (
    <InquiryLayout>
      {inquiry &&
        inquiry.content.map(
          ({
            id,
            answer,
            answerAt,
            inquiry,
            inquiryAt,
            nickname,
            privateMeaning,
            resolvedMeaning,
            sellerName,
          }) => (
            <InquiryList
              $gap="12px"
              key={id}
            >
              <Between>
                <Row $gap="8px">
                  <Text $class={["captionB", "blue"]}>{resolvedMeaning}</Text>
                  <Text $class={["captionB", "gray888"]}>{nickname ? nickname : "익명"}</Text>
                  <Text $class={["captionB", "gray888"]}>{inquiryAt}</Text>
                </Row>
                {privateMeaning !== "비공개" && resolvedMeaning !== "미답변" && (
                  <RotateBtn
                    src={upDownArrow}
                    $cursor="pointer"
                    onClick={() => inquiryMore(id)}
                    className={inquiryNum === id ? "active" : ""}
                  />
                )}
              </Between>
              <Text $color={privateMeaning === "비공개" ? "var(--c-gray888)" : ""}>{inquiry}</Text>

              {resolvedMeaning === "답변완료" &&
                inquiryNum === id &&
                inquiryDetail &&
                privateMeaning !== "비공개" && (
                  <>
                    <LineSection $borB="1px solid var(--c-line)" />
                    <Column>
                      <Row $gap="8px">
                        <Text $class={["captionB", "blue"]}>{sellerName}</Text>
                        <Text $class={["captionB", "gray888"]}>{answerAt}</Text>
                      </Row>
                      <AnswerBox as="pre">{answer}</AnswerBox>
                    </Column>
                  </>
                )}
            </InquiryList>
          )
        )}
    </InquiryLayout>
  );
}
