import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "@/api/reactQuery/useMutations";
import { useMutation } from "@tanstack/react-query";

import { Between, Column, MorphismBox, Row, Text } from "@/assets/style/common/useCommonStyle";

import TextFiled from "@/hook/TextFiled";
import { LineBtn } from "@/hook/useButton";
import { useOverlay } from "@/hook/useOverlay";
import { useTextStore } from "@/stores/useTextStore";
import { queryKeys } from "@/api/reactQuery/queryKeys";
import { queryClient } from "@/api/reactQuery/queryClient";
import { usePageStore } from "@/stores/usePageStore";

export default function Inquriry() {
  const navigate = useNavigate();
  const { openAlert } = useOverlay();
  const { setCurrentPage } = usePageStore();
  const { resetTextValues, counselInquiry } = useTextStore();

  const queryKey = [queryKeys.mypage, "/client/inquiry", { page: 0, size: 10 }];

  const { mutate: inquiry } = useMutation({
    mutationFn: () => {
      return Post({ url: "/client/inquiry", body: { inquiry: counselInquiry } });
    },
    onSuccess: () => {
      setCurrentPage(0);
      queryClient.invalidateQueries({ queryKey });
      openAlert({
        title: "문의 등록이 완료되었습니다.",
        mainBtn: "확인",
        onFunc: () => {
          navigate("/my-page/counsel");
        },
      });
    },
  });

  const inquiryRegis = () => {
    inquiry();
  };

  useEffect(() => {
    resetTextValues();
  }, []);

  return (
    <>
      <MorphismBox>
        <Column $gap="8px">
          <Row
            $gap="4px"
            $align="center"
          >
            <Text>문의내용</Text>
            <Text $class={["captionB", "red"]}>(필수)</Text>
          </Row>
          <TextFiled
            name="counselInquiry"
            value={counselInquiry}
            place="문의내용을 입력해 주세요."
          />
          <Between>
            <Text $class={["captionB", "gray888"]}>10자 이상</Text>
            <Text $class={["captionB", "gray888"]}>{counselInquiry.length} / 300</Text>
          </Between>
        </Column>
      </MorphismBox>

      <Row
        $w="100%"
        $gap="8px"
        $right="50%"
        $maxW="600px"
        $bottom="0px"
        $pad="16px 20px"
        $position="fixed"
        $trans="translateX(50%)"
      >
        <LineBtn
          msg="취소하기"
          onClick={() => navigate("/my-page/counsel")}
        />
        <LineBtn
          msg="문의 등록하기"
          onClick={inquiryRegis}
        />
      </Row>
    </>
  );
}
