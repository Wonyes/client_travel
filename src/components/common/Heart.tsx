import styled from "styled-components";

import { Img } from "@/assets/style/common/useCommonStyle";
import { useImg } from "@/assets/style/common/useImg";

const ShotGunBtn = styled.button`
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 20;
  width: 24px;
  height: 24px;
`;

export default function Heart({ favorites, onFavorite, id }) {
  const { shotgun, blueShotgun } = useImg();

  return (
    <ShotGunBtn
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onFavorite(id, favorites, event);
      }}
    >
      <Img
        $w="24px"
        src={favorites ? blueShotgun : shotgun}
        loading="lazy"
        alt="찜하기"
      />
    </ShotGunBtn>
  );
}
