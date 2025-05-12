import { Between, Column, Row, Text } from "@/assets/style/common/useCommonStyle";
import styled from "styled-components";
import { useImg } from "@/assets/style/common/useImg";
import { BlueBtn } from "../useButton";
import { useCalendarStore } from "@/stores/useCalendarStore";
import { useCalendarLogic } from "./useCalendarLogic";

const CalendarBox = styled.div`
  padding: 20px;
  border-radius: 8px;
  background: var(--c-white);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin-top: 8px;
  z-index: 999;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const CalendarMonthMove = styled.div<{ sidearrow: string }>`
  background: url(${(props) => props.sidearrow}) no-repeat center;
  width: 24px;
  height: 24px;

  &:hover {
    background-color: var(--c-input);
    border-radius: 4px;
  }

  &.prev-month {
    rotate: 180deg;
  }
  &.not-found-day:hover {
    background-color: transparent;
  }
  &.not-found-day {
    cursor: initial;
    opacity: 0.5;
  }
`;

export default function CalendarBody() {
  const { rightArrow } = useImg();
  const { currentMonth, createCalendar } = useCalendarLogic();
  const { today, moveMonth, confirmSelection } = useCalendarStore();

  return (
    <CalendarBox>
      <Column $gap="16px">
        <Between>
          <Text
            className="month"
            key={currentMonth.id}
            $class="title"
          >
            {`${today.getFullYear()}년 ${currentMonth.name}`}
          </Text>
          <Row
            $gap="8px"
            $align="center"
          >
            <CalendarMonthMove
              className={`prev-month ${
                today.getMonth() === new Date().getMonth() &&
                today.getFullYear() === new Date().getFullYear()
                  ? "not-found-day"
                  : ""
              }`}
              onClick={() => moveMonth("prev")}
              sidearrow={rightArrow}
            />
            <CalendarMonthMove
              sidearrow={rightArrow}
              onClick={() => moveMonth("next")}
            />
          </Row>
        </Between>
      </Column>
      <Column $gap="8px">
        {createCalendar()}
        <Row $gap="12px">
          <BlueBtn
            msg="선택완료"
            onClick={confirmSelection}
          />
        </Row>
      </Column>
    </CalendarBox>
  );
}
