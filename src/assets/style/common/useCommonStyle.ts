import { textStyles } from "@/constant/useClass";
import { CommonProps } from "@/types/styleInterface";
import styled, { css } from "styled-components";

const createTextBox = (props: Partial<CommonProps> = {}) => {
  const classes = Array.isArray(props.$class) ? props.$class : [props.$class];

  const combinedStyles = classes
    .map((cls) => textStyles[cls as keyof typeof textStyles] || "")
    .join(" ");

  return css`
    color: ${props.$color};

    font-size: ${props.$size};
    line-height: ${props.$line};
    font-family: ${props.$font};
    font-weight: ${props.$weight};

    width: ${props.$w};
    min-width: ${props.$minW};
    max-height: ${props.$maxH};

    text-align: ${props.$tAlign};
    white-space: ${props.$wSpace};
    opacity: ${props.$op};
    overflow: ${props.$over};
    overflow-y: ${props.$overY};
    text-decoration: ${props.$textDeco};

    margin: ${props.$mar};
    padding: ${props.$pad};
    border-radius: ${props.$radius};
    background-color: ${props.$backColor};
    border: ${props.$bor};
    cursor: ${props.$cursor};

    flex: ${props.$flex};
    word-break: break-all;
    display: ${props.$dis || "inline-block"};
    text-transform: ${props.$tTrans};
    text-shadow: ${props.$textShadow};

    ${combinedStyles}
  `;
};

const createFlexBox = (props: Partial<CommonProps> = {}) => css`
  gap: ${props.$gap};
  flex: ${props.$flex};
  align-items: ${props.$align};
  flex-wrap: ${props.$flexWrap};
  justify-content: ${props.$jus};
  flex-direction: ${props.$direct};

  width: ${props.$w};
  min-width: ${props.$minW};
  max-width: ${props.$maxW};

  height: ${props.$h};
  min-height: ${props.$minH};
  max-height: ${props.$maxH};

  margin: ${props.$mar};
  padding: ${props.$pad};

  border: ${props.$bor};
  border-top: ${props.$borT};
  border-left: ${props.$borL};
  border-bottom: ${props.$borB};
  border-radius: ${props.$radius};
  box-shadow: ${props.$shadow};

  text-align: ${props.$tAlign};
  background-color: ${props.$backColor};
  position: ${props.$position};

  top: ${props.$top};
  bottom: ${props.$bottom};
  left: ${props.$left};
  right: ${props.$right};
  transform: ${props.$trans};

  overflow: ${props.$over};
  overflow-x: ${props.$overX};
  overflow-y: ${props.$overY};
  z-index: ${props.$zIndex};

  cursor: ${props.$cursor};
  white-space: ${props.$wSpace};

  display: flex;
`;

const createPadBox = (props: Pick<CommonProps, "$pad" | "$w">) => css`
  padding: ${props.$pad};
  width: ${props.$w};
`;

const createPositionBox = (props: Partial<CommonProps> = {}) => css`
  position: ${props.$position};
  top: ${props.$top};
  bottom: ${props.$bottom};
  left: ${props.$left};
  right: ${props.$right};
  transform: ${props.$trans};
  z-index: ${props.$zIndex};
  width: ${props.$w};
  padding: ${props.$pad};
  height: ${props.$h};
  display: ${props.$dis};
  align-items: ${props.$align};
  justify-content: ${props.$jus};
  background-color: ${props.$backColor};
  overflow: ${props.$over};
  cursor: ${props.$cursor};

  &.movie-hover {
    display: none;
  }

  &:hover .movie-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--c-black-dim);
  }
`;

const FlexBox = styled.div<Partial<CommonProps>>`
  ${createFlexBox}
`;

const PadBox = styled.div<CommonProps>`
  ${createPadBox}
`;

const PositionBox = styled.div<Partial<CommonProps>>`
  ${createPositionBox}
`;

const Text = styled.span<Partial<CommonProps>>`
  ${createTextBox}
`;

const SectionBox = styled.section.attrs({ className: "section" })`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OverScroll = styled.div`
  overflow-y: auto;
  height: 100%;
  max-height: 245px;
  background: tomato;
`;

interface ImgProps extends Partial<CommonProps> {
  src: string;
  alt?: string;
}

const Img = styled.img.attrs<ImgProps>((props) => ({
  src: props.src || "",
  alt: props.alt || "",
}))<ImgProps>`
  position: ${(props) => props.$position};
  top: ${(props) => props.$top};
  left: ${(props) => props.$left};
  right: ${(props) => props.$right};
  bottom: ${(props) => props.$bottom};
  transform: ${(props) => props.$trans};

  padding: ${(props) => props.$pad};

  width: ${(props) => props.$w || "auto"};
  height: ${(props) => props.$h || "auto"};
  max-width: ${(props) => props.$maxW};
  max-height: ${(props) => props.$maxH};
  border-radius: ${(props) => props.$radius || "0"};
  min-width: ${(props) => props.$minW};
  margin: ${(props) => props.$mar};
  cursor: ${(props) => props.$cursor};

  object-fit: ${(props) => props.$objectFit || "contain"};

  &.img-clear {
    object-fit: cover;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    -ms-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -moz-backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
`;

const createLineSection = (props: Partial<CommonProps> = {}) => css`
  padding: ${props.$pad};
  border-top: ${props.$borT};
  border-left: ${props.$borL};
  border-right: ${props.$borR};
  border-bottom: ${props.$borB};
  border-radius: ${props.$radius};
  height: ${props.$h};
  width: ${props.$w};
`;

const LineSection = styled.div<Partial<CommonProps>>`
  ${createLineSection}
`;

const Row = styled(FlexBox)<Partial<CommonProps>>`
  align-items: ${(props) => props.$align};
`;

const Column = styled(FlexBox)<Partial<CommonProps>>`
  flex-direction: column;
`;

const Between = styled(FlexBox)<Partial<CommonProps>>`
  align-items: ${(props) => (props.$align ? props.$align : "center")};
  justify-content: space-between;
`;

const ErrorMsg = styled.span`
  color: var(--c-red);
  font-size: var(--s-caption);
  line-height: var(--l-caption);
  font-family: var(--f-caption);
  white-space: nowrap;
`;

const createTableRows = (props: Partial<CommonProps> = {}) => css`
  color: ${props.$color};

  padding: ${props.$pad};
  width: ${props.$w ?? "auto"};
  min-width: ${props.$w};
  max-width: ${props.$w};
  height: ${props.$h ? props.$h : "48px"};
  min-height: ${props.$minH ? props.$minH : "48px"};

  font-size: var(--s-subText);
  font-family: var(--f-subText);
  line-height: var(--l-subText);
  text-decoration: ${props.$textDeco};
  vertical-align: middle;

  cursor: ${props.$cursor};

  border-right: 1px solid rgba(170, 170, 170, 0.4);
  border-bottom: 1px solid rgba(170, 170, 170, 0.4);

  tr:only-child &,
  tr:last-child & {
    border-bottom: none;
  }

  &.text-blue {
    cursor: pointer;
    color: var(--c-blue);
    text-decoration: underline;
  }

  &:last-child {
    border-right: none;
  }
`;

const TableCell = styled.td<Partial<CommonProps>>`
  ${createTableRows}
`;

const createMorphism = (props: Partial<CommonProps> = {}) => css`
  position: ${props.$position ?? "relative"};
  top: ${props.$top};
  left: ${props.$left};
  bottom: ${props.$bottom};
  width: ${props.$w ?? "100%"};
  max-width: ${props.$maxW};
  max-height: ${props.$maxH};
  height: ${props.$h ?? "100%"};

  margin: ${props.$mar};
  border-radius: ${props.$radius ?? "8px"};
  padding: ${props.$pad ?? "12px"};

  z-index: ${props.$zIndex};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: ${props.$backColor ?? "rgba(255, 255, 255)"};

  display: ${props.$dis};
  gap: ${props.$gap};
  align-items: ${props.$align};
  flex-direction: ${props.$direct};
  transform: ${props.$trans};

  &.red-line {
    border: 1px solid var(--c-red);
  }
`;

const MorphismBox = styled.section<Partial<CommonProps>>`
  ${createMorphism}
`;

const RegisTitle = styled.div`
  gap: 4px;
  width: 200px;
  min-width: 200px;
  display: flex;
  align-items: center;
`;

const InfoLineBox = styled.div`
  padding: 20px 0;
  border-top: 1px solid var(--c-line);

  gap: 14px;
  display: flex;
  align-items: flex-start;
`;

const Dimmed = styled.div`
  background-color: var(--dim);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const SelectBox = styled.div<Partial<CommonProps>>`
  position: relative;

  text-align: center;
  vertical-align: middle;

  cursor: ${(props) => props.$cursor ?? "pointer"};
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 120px;

  padding: 10px 12px;
  border-radius: 8px;
  z-index: 999;
`;

const OptionWrap = styled.div``;

const OptionUL = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionLI = styled.li``;

const OptionA = styled.a`
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--c-white);

  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`;

const ThumbnailImg = styled(Img)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.$objectFit || "contain"};
  mix-blend-mode: multiply;
`;

const ThumbnailWrap = styled.div<Partial<CommonProps>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.$w || "100%"};
  min-width: ${(props) => props.$w};
  max-width: ${(props) => props.$maxW || "600px"};
  max-height: ${(props) => props.$maxH || "720px"};
  height: ${(props) => props.$h ?? "100%"};
  margin: ${(props) => props.$mar};
  border-radius: ${(props) => props.$radius};
  background: var(--c-input);
  border-radius: ${(props) => props.$radius};
  cursor: ${(props) => props.$cursor};
`;

const ThumbnailBox = styled.a<Pick<CommonProps, "$aspect">>`
  display: flex;
  cursor: pointer;
  position: relative;
  aspect-ratio: ${(props) => (props.$aspect ? props.$aspect : 5 / 6)};

  width: 100%;
  height: 100%;
  &:before {
    background-color: #00000005;
    content: "";
    position: absolute;
    inset: 0;
    z-index: 5;
  }

  & > * img {
    inset: 0;
    margin: auto;
  }
`;

const Fix = styled.div<Partial<CommonProps>>`
  position: fixed;
  bottom: calc(${(props) => props.$bottom || "0px"} + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  z-index: 900;
  border-top: 1px solid rgba(138, 138, 138, 0.1);

  background-color: ${(props) => props.$backColor};
  padding: ${(props) => props.$pad};
`;

const WrapperText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ProductInfoText = styled(Row)`
  @media (max-width: 340px) {
    flex-direction: column;
    gap: 0px;
  }
`;

export {
  Img,
  Fix,
  Row,
  Text,
  Column,
  Dimmed,
  PadBox,
  FlexBox,
  Between,
  ErrorMsg,
  TableCell,
  SelectBox,
  RegisTitle,
  OverScroll,
  SectionBox,
  InfoLineBox,
  PositionBox,
  MorphismBox,
  LineSection,
  OptionWrap,
  OptionUL,
  OptionLI,
  OptionA,
  Thumbnail,
  ThumbnailImg,
  ThumbnailWrap,
  ThumbnailBox,
  WrapperText,
  ProductInfoText,
};
