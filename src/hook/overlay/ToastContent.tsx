import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0% { 
   opacity: 0;
  }

  50% { 
    opacity: 1;
  }
 
  100% {
    opacity: 0;
  }
`;

const ToastBox = styled.div<{ visible: boolean }>`
  position: fixed;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 10000;
  text-align: center;

  width: fit-content;
  max-width: 728px;

  display: flex;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  padding: 8px 16px;
  background: var(--c-blue);
  border-radius: 999px;
  animation: ${({ visible }) => (visible ? fadeInOut : "none")} 2.5s ease-in-out;
`;

const ToastText = styled.p`
  color: var(--c-white);
  font-size: var(--s-title);
  white-space: nowrap;
`;

interface OverlayContentProps {
  message?: string;
}

export default function ToastContent({ message }: OverlayContentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastBox visible={visible}>
      <ToastText>{message}</ToastText>
    </ToastBox>
  );
}
