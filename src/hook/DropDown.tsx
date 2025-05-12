import { useEffect, useRef, useState } from "react";

import { Between, SelectBox, Text } from "../assets/style/common/useCommonStyle";
import { Arrow } from "@/assets/style/common/IconCompo";
import { usePageStore } from "@/stores/usePageStore";
import DropMenu from "./DropMenu";
import styled from "styled-components";

interface DropDownProps {
  data?: MenuProps[];
  request?: () => void;
  name?: string;
}

interface MenuProps {
  meaning: string;
  enumValue: string;
}

const ArrowBox = styled.div`
  max-width: 20px;
  width: 20px;
  height: 20px;
  transform: rotate(-90deg);
`;

export default function DropDown({ name, data, request }: DropDownProps) {
  const { setState, selectMeaning, setSelectMeaning } = usePageStore();
  const stateRef = useRef<string>("");

  const [isDrop, setIsDrop] = useState(false);

  const toggleDrop = () => {
    setIsDrop(!isDrop);
  };

  const isState = (enumValue: string, meaning: string) => {
    setState(enumValue);
    stateRef.current = enumValue;
    setSelectMeaning({ [name]: meaning });

    setIsDrop(false);
  };

  useEffect(() => {
    if (request) request();
  }, []);

  const currentMeaning =
    selectMeaning[name] || (data && data[0]?.meaning === "전체" ? data[0]?.meaning : "");

  return (
    <SelectBox onClick={toggleDrop}>
      <Between>
        <Text $class="subText">{currentMeaning || "사유를 선택해 주세요."}</Text>
        <ArrowBox>
          <Arrow />
        </ArrowBox>
      </Between>
      {isDrop && (
        <DropMenu
          data={data}
          isState={isState}
        />
      )}
    </SelectBox>
  );
}
