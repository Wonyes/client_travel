import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProductLayout from "../product/ProductLayout";

import TitleHeader from "../header/TitleHeader";

import NoItem from "../common/NoItem";
import { useBest, useHome, useRecommend } from "@/api/reactQuery/getQuery/useProduct";

const Section = styled.section`
  padding-top: 0;
  padding-bottom: 24px;
`;

interface ProductSectionProps {
  title: string;
  subTitle: string;
  data: any;
  onClick: () => void;
  refetch: () => void;
  noItemText: string;
}

const ProductSection = ({
  title,
  subTitle,
  data,
  onClick,
  refetch,
  noItemText,
}: ProductSectionProps) => (
  <Section>
    <TitleHeader
      title={title}
      subTitle={subTitle}
      onClick={onClick}
    />
    {!data && <NoItem text={noItemText} />}
    {data && data.length > 0 && (
      <ProductLayout
        data={data}
        refetch={refetch}
      />
    )}
  </Section>
);

export default function Index() {
  const navigate = useNavigate();

  const { data: best, refetch: bestRefetch } = useBest({ size: 20 });
  const { data: general, refetch: generalRefetch } = useHome({ size: 20 });
  const { data: recommend, refetch: recommendRefetch } = useRecommend({ size: 20 });

  const refetchAll = () => {
    bestRefetch();
    generalRefetch();
    recommendRefetch();
  };

  const productLink = (type: string) => {
    const routes: Record<string, string> = {
      recommend: "product/recommend",
      all: "/product/all",
      best: "/product/best",
    };
    navigate(routes[type]);
  };

  return (
    <>
      <ProductSection
        title="추천 상품"
        subTitle={recommend ? "더보기" : ""}
        data={recommend}
        onClick={() => productLink("recommend")}
        refetch={refetchAll}
        noItemText="추천 상품이 없습니다."
      />
      <ProductSection
        title="베스트 상품"
        subTitle={best ? "더보기" : ""}
        data={best}
        onClick={() => productLink("best")}
        refetch={refetchAll}
        noItemText="베스트 상품이 없습니다."
      />
      <ProductSection
        title="일반 상품"
        subTitle={general ? "더보기" : ""}
        data={general}
        onClick={() => productLink("all")}
        refetch={refetchAll}
        noItemText="일반 상품이 없습니다."
      />
    </>
  );
}
