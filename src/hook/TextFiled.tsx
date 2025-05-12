import styled from "styled-components";
import { useTextStore } from "@/stores/useTextStore";
import { Column } from "../assets/style/common/useCommonStyle";

interface TextFiledProps {
  id?: string;
  name: string;
  value?: string;
  title?: string;
  place?: string;
  h?: string;
}

const TextFiledBox = styled.div<{ $h?: string }>`
  padding: 8px 12px;

  height: ${({ $h }) => $h ?? "240px"};

  max-height: 200px;
  border-radius: 6px;

  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;

  border: none;
  resize: none;
  background-color: transparent;

  color: var(--c-black);
  font-size: var(--s-subText);
  line-height: var(--l-subText);
  font-family: var(--f-subText);

  &::placeholder {
    color: var(--c-subText1);
    font-size: var(--s-subText);
    line-height: var(--l-subText);
    font-family: var(--f-subText);
  }
`;

export default function TextFiled({ name, place, value, h }: TextFiledProps) {
  const { textChange } = useTextStore();
  return (
    <Column
      $gap="8px"
      $w="100%"
    >
      <TextFiledBox $h={h}>
        <TextArea
          id={name}
          name={name}
          value={value}
          placeholder={place}
          onChange={textChange}
        />
      </TextFiledBox>
    </Column>
  );
}
