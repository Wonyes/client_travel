import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { CommonProps } from "@/types/styleInterface";
import { useInputStore } from "@/stores/useInputStore";
import { useImg } from "@/assets/style/common/useImg";
import { Img } from "@/assets/style/common/useCommonStyle";
import { useSearchParams } from "react-router-dom";

const createInput = (props: Partial<CommonProps> = {}) => css`
  width: 100%;
  text-align: ${props.$tAlign};
  height: fit-content;
  background-color: transparent;
  padding: 0;
  font-family: ${props.$font};
  font-size: ${props.$size ?? "var(--s-sub)"};
  color: var(--c-black);

  &::placeholder {
    color: ${props.$placeColor || "var(--c-subText1)"};
  }

  max-width: ${props.$maxW};

  outline: none;
  border: none !important;

  &:disabled {
    cursor: auto;
    color: var(--c-gray888);
  }
`;

const Inputs = styled.input`
  ${createInput}
`;

const createInputBox = (props: Pick<CommonProps, "$gap" | "$maxW" | "$jus" | "$pad"> = {}) => css`
  width: 100%;
  min-width: 240px;
  max-width: ${props.$maxW ?? "240px"};

  padding: ${props.$pad ?? "8px 20px"};

  display: flex;
  gap: ${props.$gap};
  align-items: center;
  justify-content: ${props.$jus};

  border-radius: 8px;
  border: 1px solid var(--c-line);

  background: rgba(255, 255, 255, 0.8);

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const InputBox = styled.div<Pick<CommonProps, "$gap" | "$maxW" | "$jus" | "$pad">>`
  ${createInputBox}
`;

interface InputProps {
  $pad?: string;
  $gap?: string;
  $maxW?: string;
  name?: string;
  type?: string;
  value?: string | number;
  place?: string;
  disabled?: boolean;
  onEnter?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  $gap,
  $pad,
  $maxW,
  name,
  type,
  value: propValue,
  place,
  onEnter,
  disabled,
  ...styleProps
}: InputProps) {
  const { passClose } = useImg();
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("keyword");

  const { inputChange } = useInputStore();
  const [typeChange, setTypeChange] = useState(false);

  const [localValue, setLocalValue] = useState<string | number | undefined>(propValue);

  const onTypeChange = () => {
    setTypeChange(!typeChange);
  };

  const onEnterKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && onEnter) {
      onEnter();
    }
  };

  useEffect(() => {
    if (paramValue !== undefined) {
      setLocalValue(paramValue);
      inputChange({
        target: {
          name: name ?? "",
          value: paramValue,
        } as EventTarget & HTMLInputElement,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [paramValue, name, inputChange]);

  useEffect(() => {
    setLocalValue(propValue);
  }, [propValue]);

  return (
    <InputBox
      $gap={$gap}
      $pad={$pad}
      $maxW={$maxW}
      $jus={type === "password" && "space-between"}
    >
      <Inputs
        type={typeChange ? "text" : type ?? "text"}
        name={name}
        value={localValue ?? ""}
        disabled={disabled}
        onKeyDown={onEnterKeydown}
        onChange={(e) => {
          setLocalValue(e.target.value);
          inputChange(e);
        }}
        placeholder={place}
        {...styleProps}
      />
      {type === "password" && (
        <Img
          alt="close"
          $cursor="pointer"
          src={passClose}
          onClick={onTypeChange}
        />
      )}
    </InputBox>
  );
}
