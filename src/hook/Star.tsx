import { Row, Text } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";
import styled from "styled-components";

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const StarIcon = styled.img<Pick<StarProps, "size">>`
  width: ${(props) => (props.size ? props.size : "24px")};
  height: ${(props) => (props.size ? props.size : "24px")};
  transition: filter 0.3s ease-in-out;
`;

interface StarProps {
  size?: string;
  rating: number;
  notScore?: boolean;
}

export default function Star({ size, rating, notScore }: StarProps) {
  const { star, unStar } = useImg();

  return (
    <StarContainer>
      <Row>
        {Array.from({ length: 5 }, (_, index) => {
          const starIndex = index + 1;
          return (
            <StarIcon
              key={starIndex}
              size={size}
              src={starIndex <= rating ? star : unStar}
              alt={`Star ${starIndex}`}
            />
          );
        })}
      </Row>
      {!notScore && (
        <Text
          $class={"captionB"}
          $mar="3px 0 0"
        >
          {rating + ".0"}
        </Text>
      )}
    </StarContainer>
  );
}
