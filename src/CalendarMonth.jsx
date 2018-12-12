/* @flow */
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import format from "date-fns/format";
import getDate from "date-fns/getDate";
import isSameMonth from "date-fns/isSameMonth";

import CalendarDay from "./CalendarDay";
import type { CalendarDayProps, WeekDay } from ".";

import * as utils from "./utils";
import * as dayHelpers from "./utils/dayHelpers";

type Props = {|
  selectDate: Date => void,
  onHover: Date => void,
  month: Date,
  selectedDates: Date[],
  disabledDates: Date[],
  allowedDates: Date[],
  hoveredDates: Date[],
  past: boolean,
  future: boolean,
  colors: {| [string]: string |},
  classes: {| [string]: string |},
  className: string,
  isFocused: boolean,
  showMonthName: boolean,
  showWeekDayNames: boolean,
  customClasses: { [key: string]: Date[] },
  CustomTd: React.ComponentType<CalendarDayProps>,
  weekDayFormat: string,
  weekDayFormatter: Date => string,
  monthNameFormatter: Date => string,
  width: number,
  firstWeekDay: WeekDay
|};

const Week = styled.div`
  display: table-row;
`;

const Month = styled.div`
  width: ${({ width }) => `${width}px`};
  display: table;
  border-collapse: collapse;
`;

const DayNameList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${props => (!props.showMonthName ? "70px" : "40px")} 0 10px;
`;

const DayName = styled.span`
  width: 43px;
  text-align: center;
`;

const MonthName = styled.span`
  height: 30px;
  margin-bottom: ${props => (!props.showWeekDayNames ? "30px" : "0")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarMonth = ({
  month,
  selectedDates,
  disabledDates,
  allowedDates,
  selectDate,
  onHover,
  hoveredDates,
  past,
  future,
  colors,
  classes,
  isFocused,
  className = "",
  showMonthName,
  showWeekDayNames,
  customClasses = {},
  CustomTd,
  weekDayFormat,
  weekDayFormatter,
  monthNameFormatter,
  width,
  firstWeekDay
}: Props) => {
  const toRender = utils.calendarDaysToRender(firstWeekDay, month);
  const Day = CustomTd || CalendarDay;

  return (
    <div className={`${classes.month && classes.month} ${className}`}>
      {showMonthName && (
        <MonthName
          className={classes.monthName}
          showWeekDayNames={showWeekDayNames}
        >
          {monthNameFormatter
            ? monthNameFormatter(month)
            : format(month, "MMMM yyyy")}
        </MonthName>
      )}
      {showWeekDayNames && (
        <DayNameList showMonthName={showMonthName}>
          {R.map(
            day => (
              <DayName key={day} className={classes.weekDay}>
                {weekDayFormatter
                  ? weekDayFormatter(day)
                  : format(day, weekDayFormat)}
              </DayName>
            ),
            utils.calendarDayNames(toRender)
          )}
        </DayNameList>
      )}

      <Month width={width}>
        {R.map(
          week => (
            <Week key={week}>
              {R.map(
                day => (
                  <Day
                    key={day}
                    isHidden={!isSameMonth(month, day)}
                    number={getDate(day)}
                    value={day}
                    selectDate={selectDate}
                    onHover={onHover}
                    isHovered={dayHelpers.isHovered(day, hoveredDates)}
                    isSelected={dayHelpers.isSelected(day, selectedDates)}
                    isDisabled={
                      dayHelpers.isDisabled(day, disabledDates) ||
                      (!R.isEmpty(allowedDates) &&
                        !dayHelpers.isDisabled(day, allowedDates))
                    }
                    isPast={dayHelpers.isPast(day, new Date()) && !past}
                    isFuture={dayHelpers.isFuture(day, new Date()) && !future}
                    isFocused={isFocused}
                    customClasses={R.keys(
                      utils.filterCustomClasses(day)(customClasses)
                    )}
                    colors={colors}
                    classes={classes}
                  />
                ),
                week
              )}
            </Week>
          ),
          R.splitEvery(7, toRender)
        )}
      </Month>
    </div>
  );
};

export default CalendarMonth;
