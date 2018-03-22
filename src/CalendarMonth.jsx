/* @flow */
import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import format from 'date-fns/format';
import getDate from 'date-fns/getDate';
import isSameMonth from 'date-fns/isSameMonth';

import CalendarDay from './CalendarDay';

import * as utils from './utils';
import * as dayHelpers from './utils/dayHelpers';

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
  isFocused: boolean
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
  className = ''
}: Props) => {
  const toRender = utils.calendarDaysToRender(month);
  return (
    <div className={`${classes.month && classes.month} ${className}`}>
      <MonthName>{format(month, 'MMMM YYYY')}</MonthName>

      <DayNameList>
        {R.map(
          day => <DayName key={day}>{format(day, 'dd')}</DayName>,
          utils.calendarDayNames(toRender)
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
                    isHovered={dayHelpers.isHovered(day, hoveredDates)}
                    isSelected={dayHelpers.isSelected(day, selectedDates)}
                    isDisabled={
                      dayHelpers.isDisabled(day, disabledDates) ||
                      (!R.isEmpty(allowedDates) &&
                        !dayHelpers.isDisabled(day, allowedDates))
                    }
                    isPast={dayHelpers.isPast(day, new Date()) && !past}
                    isFuture={dayHelpers.isFuture(day, new Date()) && !future}
                    colors={colors}
                    classes={classes}
                    isFocused={isFocused}
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
