import styled from "styled-components";
import { Between, Text } from "@/assets/style/common/useCommonStyle";

interface TitleHeaderProps {
  pad?: string;
  title: string;
  subTitle?: string;
  onClick?: () => void;
}

const MoreBtn = styled.button`
  font-size: 12px;
  color: var(--c-gray888);
`;

export default function TitleHeader({ pad, title, onClick, subTitle }: TitleHeaderProps) {
  return (
    <Between
      $pad={pad ? pad : "0 16px 12px"}
      as="header"
    >
      <Text $class="title">{title}</Text>
      <MoreBtn onClick={onClick}>{subTitle}</MoreBtn>
    </Between>
  );
}
