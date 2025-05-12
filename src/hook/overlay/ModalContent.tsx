import React from "react";
import styled, { keyframes } from "styled-components";

import { Row } from "@/assets/style/common/useCommonStyle";

import TitleHeader from "@/components/header/TitleHeader";

const dimFadeIn = keyframes`
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: .3;
    display: flex;
  }
`;

const dimFadeOut = keyframes`
 0% {
  opacity: .3;
  display: flex
;
}
100% {
  opacity: 0;
  display: none;
}
`;

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: 1;
    display: flex;
  }
`;

const modalFadeOut = keyframes`
 0% {
  opacity: 1;
  display: flex
;
}
100% {
  opacity: 0;
  display: none;
}
`;

const Dimmed = styled.div`
  background-color: var(--c-black);
  z-index: 9990;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  animation: 0.3s forwards ${dimFadeOut};
  display: none;

  &.active {
    justify-content: center;
    align-items: center;
    display: flex;

    animation: 0.3s forwards ${dimFadeIn};
  }
`;

const DimmedBox = styled.div`
  display: none;
  padding: 16px;
  height: fit-content;

  z-index: 9998;
  border-radius: 8px;
  background: var(--c-white);
  box-shadow: 0 4px 30px rgba(255, 255, 255, 0.15);
  animation: 0.3s forwards ${modalFadeOut};

  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, 500%);

  min-width: 320px;
  max-width: 560px;

  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &.active {
    transform: translate(-50%, -50%);
    animation: 0.3s forwards ${modalFadeIn};
  }
`;

const ModalBody = styled.div``;

interface ModalContentProps {
  show: boolean;
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
}

export default function ModalContent({ show, title, children, buttons }: ModalContentProps) {
  return (
    <>
      <Dimmed className={show ? "active" : ""} />
      <DimmedBox className={show ? "active" : ""}>
        <TitleHeader
          pad="0"
          title={title}
        />
        <ModalBody>{children}</ModalBody>
        <Row
          $w="100%"
          $gap="8px"
          $jus="center"
          $align="center"
        >
          {buttons}
        </Row>
      </DimmedBox>
    </>
  );
}
