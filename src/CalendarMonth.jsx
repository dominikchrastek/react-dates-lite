/* @flow */
import React from 'react';

import isSameDay from 'date-fns/is_same_day';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import format from 'date-fns/format';
import subMonths from 'date-fns/sub_months';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import getDate from 'date-fns/get_date';
import subDays from 'date-fns/sub_days';
import isSameMonth from 'date-fns/is_same_month';
import isBefore from 'date-fns/is_before';
import startOfDay from 'date-fns/start_of_day';
import getDay from 'date-fns/getDay';
import R from 'ramda';
import styled from 'styled-components';

import CalendarDay from './CalendarDay';

type Props = {|
  selectDate: Date => void,
  onHover: Date => void,
  month: Date,
  selectedDays: Date[],
  hoveredDates: Date[],
  allowedPastDates: boolean,
  colors: { [string]: string },
  classes: { [string]: string },
|};

const Week = styled.div`
  display: table-row;
`;

const Month = styled.div`
  width: 300px;
  display: table;
  border-collapse: collapse;
`;

const DayNameList = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0 10px;
`;

const DayName = styled.span`
  width: 43px;
  text-align: center;
`;

const MonthName = styled.span`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarMonth = (props: Props) => {
  const {
    month,
    selectedDays,
    selectDate,
    onHover,
    hoveredDates,
    allowedPastDates,
    colors,
    classes,
  } = props;

  // TODO: standalone function
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const listOfDays = eachDayOfInterval({ start, end });
  const monthName = format(month, 'MMMM YYYY');
  const monthBefore = subMonths(month, 1);
  const lastDayPrevMonth = lastDayOfMonth(monthBefore);
  const toPrepend =
    getDay(start) === 0
      ? []
      : eachDayOfInterval({
          start: subDays(lastDayPrevMonth, getDay(start) - 1),
          end: lastDayPrevMonth,
        });

  const toRender = R.concat(toPrepend, listOfDays);
  const dayNames = R.take(7, toRender);

  return (
    <div>
      <MonthName>{monthName}</MonthName>

      <DayNameList>
        {R.map(
          day => <DayName key={day}>{format(day, 'dd')}</DayName>,
          dayNames,
        )}
      </DayNameList>

      <Month>
        {R.map(
          week => (
            <Week key={week}>
              {R.map(
                day => (
                  <CalendarDay
                    key={day}
                    isHidden={!isSameMonth(month, day)}
                    number={getDate(day)}
                    value={day}
                    selectDate={selectDate}
                    onHover={onHover}
                    isHovered={R.find(
                      selected => isSameDay(selected, day),
                      R.drop(1, hoveredDates),
                    )}
                    isSelected={R.find(
                      selected => isSameDay(selected, day),
                      selectedDays,
                    )}
                    isPast={
                      isBefore(day, startOfDay(new Date())) && !allowedPastDates
                    }
                    colors={colors}
                    classes={classes}
                  />
                ),
                week,
              )}
            </Week>
          ),
          R.splitEvery(7, toRender),
        )}
      </Month>
    </div>
  );
};

export default CalendarMonth;
