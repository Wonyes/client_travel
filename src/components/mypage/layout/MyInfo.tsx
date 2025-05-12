import { useState } from "react";

import { Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";
import { BlueBtn, LineBtn, WhiteBtn } from "@/hook/useButton";
import { useOverlay } from "@/hook/useOverlay";
import NameChange from "./infomodal/NameChange";
import NicknameChange from "./infomodal/NicknameChange";
import PhoneChange from "./infomodal/PhoneChange";
import { useInputStore } from "@/stores/useInputStore";
import { useExistNickname, useMyInfo } from "@/api/reactQuery/getQuery/useMy";
import Loading from "@/hook/Loading";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";

export default function MyInfo() {
  const { openAlert } = useOverlay();
  const {
    resetInput,
    change: { changeName, changeNick, changePhone },
  } = useInputStore();
  const { data: myData, isLoading, refetch } = useMyInfo();
  const { refetch: checkNick } = useExistNickname(changeNick);
  const [existNickRefetch, setExistNickRefetch] = useState(true);

  const optionNavigate = [
    { key: 1, enums: "name", title: "이름 변경", content: <NameChange /> },
    {
      key: 2,
      enums: "nickname",
      title: "닉네임 변경",
      content: (
        <NicknameChange
          openAlert={openAlert}
          checkNick={checkNick}
          setExistNickRefetch={setExistNickRefetch}
        />
      ),
    },
    { key: 3, enums: "phone", title: "전화번호 변경", content: <PhoneChange /> },
  ];
  const [getContent, setGetContent] = useState("");

  const { mutate: myChange } = useMutation({
    mutationFn: async (_enums: string) => {
      const body = {
        name: changeName === "" ? null : changeName,
        phone: changePhone === "" ? null : changePhone,
        nickname: changeNick === "" ? null : changeNick,
      };

      return await Post({ url: "my", body });
    },
    onSuccess: (_, variables) => {
      if (variables === "nickname") {
        openAlert({
          title: "닉네임이 변경되었습니다.",
          mainBtn: "확인",
          onFunc: () => {
            refetch();
            setGetContent("");
          },
        });
      } else if (variables === "phone") {
        openAlert({
          title: "전화번호가 변경되었습니다.",
          mainBtn: "확인",
          onFunc: () => {
            refetch();
            setGetContent("");
          },
        });
      } else {
        openAlert({
          title: "이름이 변경되었습니다.",
          mainBtn: "확인",
          onFunc: () => {
            refetch();
            setGetContent("");
          },
        });
      }
    },
  });

  const isChangeMutation = (enums: string) => {
    if (enums === "name") {
      if (changeName.length < 2 || changeName.length > 10) {
        openAlert({
          title: "2글자 이상 10글자 이하로 입력해주세요.",
          mainBtn: "확인",
        });
        return;
      }
    }

    myChange(enums);
  };

  const isContentOpen = (enums: string) => {
    resetInput();

    if (enums === getContent) {
      setGetContent("");
      return;
    }

    if (enums === "nickname") {
      setExistNickRefetch(true);
    }

    setGetContent(enums);
  };

  if (isLoading) return <Loading />;

  return (
    <Column $gap="12px">
      <MorphismBox>
        <Column>
          <Row>
            <Text
              $minW="80px"
              $class="subTitle"
            >
              닉네임
            </Text>
            <Text>{myData.nickname}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class="subTitle"
            >
              이름
            </Text>
            <Text>{myData.name ?? "미설정"}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class="subTitle"
            >
              휴대폰 번호
            </Text>
            <Text>{myData.phone ?? "미설정"}</Text>
          </Row>
          <Row>
            <Text
              $minW="80px"
              $class="subTitle"
            >
              가입경로
            </Text>
            <Text>{myData.providerType}</Text>
          </Row>
        </Column>
      </MorphismBox>
      <Column $gap="8px">
        {optionNavigate.map(({ key, title, enums, content }) => (
          <Column
            key={key}
            $gap="8px"
          >
            <WhiteBtn
              msg={title}
              $tAlign="left"
              $pad="12px 16px"
              className="change"
              onClick={() => isContentOpen(enums)}
            />
            {getContent === enums && (
              <MorphismBox>
                {content}
                <Row
                  $gap="12px"
                  $pad="12px 0"
                >
                  <LineBtn
                    $pad="8px"
                    msg="닫기"
                    onClick={() => setGetContent("")}
                  />
                  <BlueBtn
                    $pad="8px"
                    msg="완료"
                    disabled={enums === "nickname" && existNickRefetch}
                    onClick={() => isChangeMutation(enums)}
                  />
                </Row>
              </MorphismBox>
            )}
          </Column>
        ))}
      </Column>
    </Column>
  );
}
