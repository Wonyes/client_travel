import {
  Column,
  Fix,
  Img,
  Row,
  Text,
  Thumbnail,
  ThumbnailBox,
  ThumbnailImg,
  ThumbnailWrap,
} from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import { BlueBtn } from "@/hook/useButton";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProductInfo from "./detail/ProductInfo";
import BottomSheet from "./detail/bottom/BottomSheet";
import ProductInquiry from "./detail/ProductInquiry";
import ProductReview from "./detail/review/ProductReview";
import { useDetail, useInquiryCount } from "@/api/reactQuery/getQuery/useProduct";
import Loading from "@/hook/Loading";
import { useHeart } from "@/hook/useHeart";
import NoItem from "../common/NoItem";
import { useEffect, useState } from "react";
import { useOverlay } from "@/hook/useOverlay";
import { useLoginStore } from "@/stores/useLoginStore";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Nav = styled.nav`
  width: 100%;
  border-bottom: 1px solid var(--c-line);
  padding: 4px 4px 0 4px;
  ul {
    width: 100%;
    display: flex;
  }
  ul li {
    width: 100%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px 0;
    position: relative;
    color: var(--c-gray888);
  }
  li .underline {
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    width: 100%;
    height: 3px;
    background: var(--c-blue);
  }

  li .underline.active {
    transform: none !important;
  }

  li.selected {
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;

    color: var(--c-blue);
    background-color: rgb(245, 245, 245);
  }
`;

const ShotBtn = styled.button`
  padding: 13px;
  border-radius: 8px;
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: 46px;
  background-color: var(--c-mainBack);
`;

const FixItem = styled(Row)`
  width: 100%;
  position: relative;
  padding-top: 12px;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: calc(env(safe-area-inset-bottom) + 12px);
  background-color: rgb(255, 255, 255);
`;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLogin } = useLoginStore();
  const { openConfirm } = useOverlay();
  const { blueShotgun, blackHeart } = useImg();

  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const purChase = () => {
    if (!isLogin) {
      openConfirm({
        title: "로그인이 필요한 서비스입니다.",
        message: "로그인 페이지로 이동하시겠습니까?",
        mainBtn: "로그인",
        subBtn: "취소",
        onFunc: () => {
          navigate("/login");
        },
      });
      return;
    }
    setPurchaseOpen((prev) => !prev);
  };

  const { data: count } = useInquiryCount({ id });
  const { data: detail, isLoading, refetch } = useDetail({ id });
  const { isFavoriteClick } = useHeart({ refetch });

  const { reviewCount, inquiryCount } = count || {};
  const {
    pri,
    pdi = [],
    isFavorite,
    productName,
    stock,
    price,
    discountPrice,
    discountRate,
    description,
  } = detail || {};

  const images = [pri, ...pdi];

  const initialTabs = [
    { name: "상품정보", key: 1 },
    { name: `리뷰 ${reviewCount}`, key: 2 },
    { name: `문의 ${inquiryCount}`, key: 3 },
  ];

  const [selectTab, setSelectTab] = useState(initialTabs[0].key);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (selectTab) {
      case 1:
        return (
          <ProductInfo
            pdi={pdi}
            description={description}
          />
        );
      case 2:
        return <ProductReview id={id} />;
      case 3:
        return <ProductInquiry id={id} />;
      default:
        return (
          <ProductInfo
            pdi={pdi}
            description={description}
          />
        );
    }
  };

  if (isLoading) return <Loading />;
  if (detail.productState === "DELETE") return <NoItem text="삭제된 상품입니다." />;
  return (
    <Column
      $bor="0 1px solid var(--c-blue)"
      $pad="0 0 70px"
      $minH="calc(100vh - 70px)"
      $backColor="var(--c-white)"
    >
      <Fix>
        <FixItem>
          <ShotBtn onClick={() => isFavoriteClick(id, isFavorite)}>
            <Img
              $w="20px"
              $h="20px"
              src={isFavorite ? blueShotgun : blackHeart}
              alt="heart"
            />
          </ShotBtn>
          <BlueBtn
            msg="구매하기"
            onClick={purChase}
            disabled={stock === 0}
          />
        </FixItem>
      </Fix>

      <Column as="section">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "600px",
            maxHeight: "600px",
          }}
          loop={true}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <ThumbnailWrap $mar="0 auto">
                <ThumbnailBox $aspect="1/1">
                  <Thumbnail>
                    <ThumbnailImg
                      src={src}
                      alt={`slide-${index}`}
                    />
                  </Thumbnail>
                </ThumbnailBox>
              </ThumbnailWrap>
            </SwiperSlide>
          ))}
        </Swiper>

        <Column
          $pad="16px"
          $backColor="var(--c-white)"
        >
          <Text>{productName}</Text>
          <Row
            $gap="4px"
            $align="center"
          >
            {discountRate && <Text $class={"red"}>{discountRate}%</Text>}
            <Text>{discountPrice?.toLocaleString()}원</Text>
            <Text
              $class={["captionB", "gray300"]}
              $textDeco="line-through"
            >
              {price?.toLocaleString()}원
            </Text>
          </Row>
        </Column>
      </Column>

      <Row
        as="section"
        $backColor="var(--c-white)"
        $gap="16px"
        $top="52px"
        $position="sticky"
      >
        <Nav>
          <ul>
            {initialTabs.map(({ name, key }) => (
              <li
                key={name}
                className={key === selectTab ? "selected" : ""}
                onClick={() => setSelectTab(key)}
              >
                {name}
                {key === selectTab ? (
                  <motion.div
                    className={`underline ${transition ? "active" : ""}`}
                    layoutId="underline"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </Nav>
      </Row>

      <AnimatePresence mode="wait">
        <motion.section
          key={selectTab ? selectTab : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.section>
      </AnimatePresence>

      <BottomSheet
        stock={stock}
        productId={id}
        purChase={purChase}
        productName={productName}
        purchaseOpen={purchaseOpen}
        discountPrice={discountPrice}
      />
    </Column>
  );
}
