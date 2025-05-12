import React from "react";
import styled from "styled-components";
import radio from "@/assets/image/radio.svg";
import radioActive from "@/assets/image/radio_active.svg";
import check from "@/assets/image/check.svg";
import notChecked from "@/assets/image/notcheck.svg";
import { Text } from "@/assets/style/common/useCommonStyle";

const CheckRadio = styled.input.attrs({ type: "radio" })`
  padding: 1px 0 !important;
  width: 24px !important;
  height: 24px !important;
  margin: 0 !important;
  cursor: pointer;

  background: url(${radio}) no-repeat center;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[disabled] + label {
    opacity: 0.5;
  }

  &:checked {
    background: url(${radioActive}) no-repeat center;
  }
`;

const CheckInput = styled.input.attrs({ type: "checkbox" })`
  padding: 1px 0 !important;
  width: 24px !important;
  height: 24px !important;
  margin: 0 !important;
  cursor: pointer;

  background: url(${notChecked}) no-repeat center;

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[disabled] + label {
    opacity: 0.5;
  }

  &:checked {
    background: url(${check}) no-repeat center;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  width: 100%;

  border-radius: 8px;

  gap: 12px;
`;

interface BasicCheckProps {
  label?: string;
  checked?: boolean;
  meaning?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicRadio({ meaning, checked, onChange, label }: BasicCheckProps) {
  return (
    <>
      <Label
        className={checked ? "active" : ""}
        htmlFor={meaning}
      >
        <CheckRadio
          checked={checked}
          onChange={onChange}
          id={meaning}
          name={meaning}
          value={meaning}
        />
        {label && <Text>{label}</Text>}
      </Label>
    </>
  );
}

export function BasicCheck({ meaning, checked, onChange, label }: BasicCheckProps) {
  return (
    <>
      <Label
        className={checked ? "active" : ""}
        htmlFor={meaning}
      >
        <CheckInput
          checked={checked}
          onChange={onChange}
          id={meaning}
          name={meaning}
          value={meaning}
        />
        {label && <Text $mar="1px 0 0">{label}</Text>}
      </Label>
    </>
  );
}
