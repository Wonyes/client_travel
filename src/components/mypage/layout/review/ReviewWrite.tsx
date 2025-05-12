import { useRef, useState } from "react";

import {
  Between,
  Column,
  Fix,
  Img,
  LineSection,
  MorphismBox,
  Row,
  Text,
  ThumbnailBox,
  ThumbnailWrap,
  WrapperText,
} from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import { LineBtn } from "@/hook/useButton";
import TextFiled from "@/hook/TextFiled";
import { useTextStore } from "@/stores/useTextStore";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { Post } from "@/api/reactQuery/useMutations";
import { useDrag } from "@/utils/useDrag";
import StarClick from "@/hook/StarClick";
import { useOrderDetail } from "@/api/reactQuery/getQuery/useMy";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/hook/Loading";
import { format } from "date-fns";
import { useOverlay } from "@/hook/useOverlay";
import heic2any from "heic2any";

const ImgAreaBox = styled.div`
  border-radius: 4px;
  height: 120px;
  width: 120px;
  min-width: 120px;
  min-height: 120px;
  cursor: pointer;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
`;

const AddImg = styled.div`
  border-radius: 4px;
  height: 120px;
  width: 120px;
  min-width: 120px;
  min-height: 120px;
  cursor: pointer;

  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);

  position: relative;
`;

const LayoutWrap = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function ReviewWrite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openAlert } = useOverlay();
  const { productReview } = useTextStore();
  const { deleteIcon, fileUpload } = useImg();
  const detailUrl = `client/product-order/detail/${id}`;
  const { data: getDetail, isLoading } = useOrderDetail(detailUrl);

  const dragRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLInputElement | null>(null);
  const { mouseDownEvent, mouseMoveEvent, mouseUpEvent, mouseLeaveEvent } = useDrag({
    dragRef,
  });
  const [fileState, setFileState] = useState({
    addFiles: [],
    addFileURLs: [],
  });
  const [score, setScore] = useState(0);

  const { mutate: postReview } = useMutation({
    mutationFn: () => {
      const formData = new FormData();

      const jsonData = JSON.stringify({
        content: productReview,
        rating: score,
      });
      formData.append("data", jsonData);

      fileState.addFiles.forEach((file) => {
        formData.append("files", file);
      });

      return Post({
        url: `client/review/${id}`,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate("/my-page/review");
    },
  });

  const onSubmit = () => {
    if (productReview.length < 10) {
      openAlert({
        title: "상품후기는 10자 이상 입력해 주세요.",
        message: "10자 이상 입력 후 재시도해 주세요.",
        mainBtn: "확인",
      });
      return;
    }
    postReview();
  };

  const imgload = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const onChangeAddImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const remainingSlots = 5 - fileState.addFiles.length;

      if (remainingSlots <= 0) {
        openAlert({
          title: "최대 업로드 개수를 초과하였습니다.",
          message: "최대 5개의 파일만 업로드할 수 있습니다.",
          mainBtn: "확인",
        });
        return;
      }

      const newFiles = Array.from(e.target.files).slice(0, remainingSlots);

      const maxFileSize = 5 * 1024 * 1024;
      const oversizedFiles = newFiles.filter((file) => file.size > maxFileSize);

      if (oversizedFiles.length > 0) {
        openAlert({
          title: "최대 업로드 용량을 초과하였습니다.",
          message: "5MB 이하의 이미지만 업로드할 수 있습니다.",
          mainBtn: "확인",
        });
        return;
      }

      const heicMimeTypes = ["image/heic", "image/heif", "image/HEIC", "image/HEIF"];
      const heicExtensions = ["heic", "heif"];

      const isHeicFile = (file: File) => {
        const fileType = file.type.toLowerCase();
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return heicMimeTypes.includes(fileType) || heicExtensions.includes(fileExtension || "");
      };

      // 사용 예시
      const convertedFiles = await Promise.all(
        newFiles.map(async (file) => {
          if (isHeicFile(file)) {
            try {
              const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });

              // Blob[]일 경우 첫 번째 요소를 사용
              const validBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

              // 타입이 비어 있으면 강제로 설정
              const blobWithType = validBlob.type
                ? validBlob
                : new Blob([validBlob], { type: "image/jpeg" });

              const newFile = new File([blobWithType], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                type: "image/jpeg",
              });

              return newFile;
            } catch (error) {
              console.error("HEIC 변환 실패:", error);
              openAlert({
                title: "HEIC 파일 변환 실패",
                message: "HEIC 파일을 업로드할 수 없습니다.",
                mainBtn: "확인",
              });
              return null;
            }
          }
          return file;
        })
      );

      const validFiles = convertedFiles.filter((file) => file !== null);

      setFileState((prev) => ({
        ...prev,
        addFiles: [...prev.addFiles, ...validFiles],
        addFileURLs: [
          ...prev.addFileURLs,
          ...validFiles.map((file) => {
            const blobUrl = URL.createObjectURL(file);
            return blobUrl;
          }),
        ],
      }));
    }
  };

  const onRemoveAddImg = (index: number) => {
    URL.revokeObjectURL(fileState.addFileURLs[index]);

    setFileState((prev) => ({
      ...prev,
      addFiles: prev.addFiles.filter((_, i) => i !== index),
      addFileURLs: prev.addFileURLs.filter((_, i) => i !== index),
    }));
  };

  if (isLoading) return <Loading />;

  return (
    <Column>
      <MorphismBox $pad="12px">
        <Column $gap="12px">
          <Row $gap="12px">
            <ThumbnailWrap
              $h="auto"
              $radius="8px"
              $maxH="140px"
              $maxW="140px"
            >
              <ThumbnailBox $aspect="1/1">
                <Img
                  src={getDetail.pri}
                  $w="100%"
                  $h="100%"
                  loading="lazy"
                  alt="상품 이미지"
                  $objectFit="cover"
                  $radius="8px"
                />
              </ThumbnailBox>
            </ThumbnailWrap>

            <Column
              $w="100%"
              $gap="8px"
            >
              <Column $gap="4px">
                <WrapperText>{getDetail.productName}</WrapperText>
                <LineSection
                  $w="100%"
                  $borB="1px solid var(--c-line)"
                />
              </Column>

              <Column>
                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    예매번호
                  </Text>
                  <Text
                    $minW="90px"
                    $class={"captionB"}
                  >
                    {getDetail.channelProductOrderId}
                  </Text>
                </Row>
                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    예매일
                  </Text>
                  <Text
                    $minW="90px"
                    $class={"captionB"}
                  >
                    {format(getDetail.purchaseAt, "yyyy-MM-dd hh:mm")}
                  </Text>
                </Row>
                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    관람일
                  </Text>
                  <Text
                    $minW="90px"
                    $class={"captionB"}
                  >
                    {getDetail.directOption}
                  </Text>
                </Row>
                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    상태
                  </Text>
                  <WrapperText $class={["captionB", "blue"]}>
                    {getDetail.ticketStateMeaning}
                  </WrapperText>
                </Row>

                <Row>
                  <Text
                    $minW="90px"
                    $class={["caption", "gray300"]}
                  >
                    사용여부
                  </Text>
                  <Row $gap="4px">
                    <WrapperText
                      $class={[
                        "captionB",
                        getDetail.ticketUsedStateMeaning === "사용 불가능" ? "red" : "blue",
                      ]}
                    >
                      {getDetail.ticketUsedStateMeaning}
                    </WrapperText>
                  </Row>
                </Row>
              </Column>
            </Column>
          </Row>

          <StarClick
            score={score}
            setScore={setScore}
          />

          <LineSection
            $w="100%"
            $borB="1px solid var(--c-line)"
          />

          <Row
            $align="center"
            $gap="8px"
          >
            <Text>이 상품 어떠셨나요 ?</Text>
            <Text $class={["captionB", "red"]}>(필수)</Text>
          </Row>

          <Column $gap="4px">
            <TextFiled
              h="160px"
              name="productReview"
              value={productReview}
              place="내용을 입력해 주세요."
            />
          </Column>

          <Between>
            <Text $class={["captionB", "gray888"]}>최소 10자 이상 작성해 주세요.</Text>
            <Text $class={["captionB", "gray888"]}>{productReview.length} /300</Text>
          </Between>

          <Text>사진 업로드</Text>
          <Row $gap=" 8px">
            <ImgAreaBox>
              <input
                name="pri"
                type="file"
                ref={uploadRef}
                onChange={onChangeAddImg}
                style={{ display: "none" }}
                accept="image/*"
              />
              <Img
                $w="100%"
                $h="100%"
                $radius="4px"
                alt="img-upload"
                src={fileUpload}
                className="img-clear"
                onClick={() => imgload(uploadRef)}
              />
            </ImgAreaBox>
            <LayoutWrap
              ref={dragRef}
              onMouseUp={mouseUpEvent}
              onMouseDown={mouseDownEvent}
              onMouseMove={mouseMoveEvent}
              onMouseLeave={mouseLeaveEvent}
            >
              {fileState.addFileURLs.map((url, index) => (
                <AddImg key={index}>
                  <Img
                    $w="120px"
                    $h="120px"
                    src={url}
                    $radius="4px"
                    alt="img-upload"
                    className="img-clear"
                  />

                  <Img
                    $position="absolute"
                    $top="-1px"
                    $right="0"
                    $w="24px"
                    $h="24px"
                    src={deleteIcon}
                    onClick={() => onRemoveAddImg(index)}
                  />
                </AddImg>
              ))}
            </LayoutWrap>
          </Row>

          <Between>
            <Text $class={["captionB", "gray888"]}>작성된 후기는 상품 리뷰에 노출됩니다.</Text>
            <Text $class={["captionB", "gray888"]}>{fileState.addFileURLs.length}/5</Text>
          </Between>
        </Column>
      </MorphismBox>
      <Fix
        $pad="16px"
        $backColor="var(--c-mainBack)"
      >
        <LineBtn
          msg="등록하기"
          onClick={onSubmit}
        />
      </Fix>
    </Column>
  );
}
