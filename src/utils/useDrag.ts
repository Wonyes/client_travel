import { useState } from "react";

interface UseDragProps {
  dragRef: React.RefObject<HTMLDivElement>;
}

export const useDrag = ({ dragRef }: UseDragProps) => {
  const [clickPoint, setClickPoint] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const mouseDownEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setIsDragging(false);

    if (dragRef.current) {
      setClickPoint(e.clientX);
      setScrollLeft(dragRef.current.scrollLeft);
    }
  };

  const mouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    setIsDragging(true);

    if (dragRef.current) {
      const walk = e.clientX - clickPoint;
      dragRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const mouseUpEvent = () => {
    setDragging(false);

    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const mouseLeaveEvent = () => {
    setDragging(false);
    setIsDragging(false);
  };

  return {
    mouseLeaveEvent,
    mouseDownEvent,
    mouseMoveEvent,
    mouseUpEvent,
    isDragging,
  };
};
