import { Row } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import React from "react";
import styled from "styled-components";

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StarIcon = styled.img`
  width: 24px;
  height: 24px;
  transition: filter 0.3s ease-in-out;
  cursor: pointer;
`;

export default function StarClick({
  score,
  setScore,
}: {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { star, unStar } = useImg();

  const isStarClick = (index: number) => {
    setScore(index);
  };

  return (
    <StarContainer>
      <Row>
        {[1, 2, 3, 4, 5].map((el) => (
          <StarIcon
            key={el}
            id={`star-${el}`}
            src={el <= score ? star : unStar}
            alt={`별 ${el}`}
            onClick={() => isStarClick(el)}
          />
        ))}
      </Row>
    </StarContainer>
  );
}
