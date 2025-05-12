import React from "react";
import Input from "@/hook/Input";
import { useInputStore } from "@/stores/useInputStore";
import { Between, Column, Row, Text } from "@/assets/style/common/useCommonStyle";
import { BlueBtn } from "@/hook/useButton";

export default function NicknameChange({
  checkNick,
  openAlert,
  setExistNickRefetch,
}: {
  openAlert: any;
  checkNick: () => Promise<any>;
  setExistNickRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    change: { changeNick },
  } = useInputStore();

  const isExistNickname = () => {
    if (changeNick.length < 2 || changeNick.length > 14) {
      openAlert({
        title: "2글자 이상 14글자 이하로 입력해주세요.",
        mainBtn: "확인",
      });
      return;
    }
    checkNick()
      .then((res) => {
        if (res.data === false) {
          openAlert({
            title: "사용 가능한 아이디입니다.",
            mainBtn: "확인",
          });
          setExistNickRefetch(res.data);
        } else {
          openAlert({
            title: "이미 사용중인 아이디입니다.",
            mainBtn: "확인",
          });
        }
      })
      .catch(() => {
        openAlert({
          title: "중복 확인에 실패하였습니다.",
          message: "다시 시도해주세요.",
          mainBtn: "확인",
        });
      });
  };

  return (
    <Column $gap="8px">
      <Row $gap="8px">
        <Input
          $maxW="100%"
          $pad="8px 12px"
          name="changeNick"
          value={changeNick}
          place="변경할 닉네임을 입력해주세요."
        />
        <BlueBtn
          $w="120px"
          msg="중복확인"
          onClick={isExistNickname}
          disabled={changeNick?.length < 2 || changeNick?.length > 14}
        />
      </Row>
      <Between>
        <Text $class="captionB">2~14글자 이내로 입력해 주세요.</Text>
        <Text $class={["captionB", "blue"]}>{changeNick?.length} / 14</Text>
      </Between>
    </Column>
  );
}
