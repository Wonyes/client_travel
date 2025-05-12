import { useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import parse from "html-react-parser";

import { Column, Img, Row, Text } from "@/assets/style/common/useCommonStyle";

interface InfoProps {
  pdi: string[];
  description: string;
}

const InfoWrapper = styled.div`
  overflow: hidden;
`;

const MoreViewButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  background-color: var(--c-white);
  padding: 12px;
  gap: 8px;
  cursor: pointer;
`;

const DecodedInfo = styled(Text)`
  width: 100%;
  font-size: initial;
  & > * > * > * > * {
    all: unset;
  }
  & img {
    display: block;
  }

  & span,
  & p,
  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
  }
`;

export default function ProductInfo({ pdi, description }: InfoProps) {
  const [isMoreView, setIsMoreView] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(400);

  const moreView = () => {
    if (contentRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      setContentHeight(isMoreView ? 400 : fullHeight);
    }
    setIsMoreView(!isMoreView);
  };

  return (
    <>
      <InfoWrapper>
        <motion.div
          ref={contentRef}
          animate={{ maxHeight: contentHeight }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
        >
          <Column $gap="2px">
            {pdi &&
              pdi.map((src, index) => (
                <Img
                  src={src}
                  key={index}
                  $maxH="400px"
                  alt={`Product image ${index + 1}`}
                />
              ))}
          </Column>
          <Row $pad="16px">
            <DecodedInfo
              as="div"
              $wSpace="pre-wrap"
            >
              {parse(description, {
                replace: (domNode) => {
                  if (domNode.type === "tag" && domNode.tagName === "img") {
                    return (
                      <Img
                        $w="100%"
                        $maxH="400px"
                        $objectFit="contain"
                        src={domNode.attribs?.src}
                        alt={domNode.attribs?.alt || "image"}
                      />
                    );
                  }
                  return domNode;
                },
              })}
            </DecodedInfo>
          </Row>
        </motion.div>
      </InfoWrapper>

      <MoreViewButtonWrapper onClick={moreView}>
        <Text $color="var(--c-blue)">{isMoreView ? "접기" : "더보기"}</Text>
      </MoreViewButtonWrapper>
    </>
  );
}
