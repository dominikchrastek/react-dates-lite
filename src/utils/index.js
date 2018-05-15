/* @flow */
/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';

import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import subDays from 'date-fns/subDays';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isSameMonth from 'date-fns/isSameMonth';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';

// TODO: separate util files
// CalendarMonth utils

// return days to prepend (these days are from previous month)
export const daysFromPrevMonth = (
  start: Date,
  lastDayOfPrevMonth: Date
): Date[] =>
  // if it's first day in the month, no need to prepend days
  getDay(start) === 0
    ? []
    : // otherwise prepend days from previous month
      eachDayOfInterval({
        start: subDays(lastDayOfPrevMonth, getDay(start) - 1),
        end: lastDayOfPrevMonth
      });

export const lastDayOfPrevMonth = (month: Date): Date =>
  lastDayOfMonth(subMonths(month, 1));

// render prepended days from previous month + days from current month
export const calendarDaysToRender = (month: Date): Date[] => {
  // start of month
  const start = startOfMonth(month);
  // end of month
  const end = endOfMonth(month);

  // concant days from previous month and days from current month
  return R.concat(
    daysFromPrevMonth(start, lastDayOfPrevMonth(month)),
    eachDayOfInterval({ start, end })
  );
};

export const calendarDayNames = (months: Date[]): Date[] => R.take(7, months);

// TODO: separate util files
// Calendar utils

/**
 * Will return months between `firstMonth` and `lastMonth`
 * @param {Date} firstMonth
 * @param {Date} lastMonth
 * @returns {Date[]}
 */
export function getMonths(firstMonth: Date, lastMonth: Date): Date[] {
  return R.compose(
    R.map(n => addMonths(startOfMonth(firstMonth), n)),
    R.times(R.identity)
    // add one month, because differenceInCalendarMonths will return n - 1
  )(differenceInCalendarMonths(addMonths(lastMonth, 1), firstMonth));
}

export const getCurrentMonthIndex = (
  firstMonth: Date,
  lastMonth: Date,
  dates: Date[],
  future: boolean,
  visibleMonths: number,
  today: Date = new Date()
): number => {
  const datesOrToday = R.isEmpty(dates) ? [today] : dates;
  const months = getMonths(firstMonth, lastMonth);
  const index = R.findIndex(
    // $FlowExpected
    month => isSameMonth(month, R.head(datesOrToday)),
    months
  );
  // without future and without preselect
  if (!future && R.isEmpty(dates)) {
    return index - (visibleMonths - 1);
  }
  // with preselect
  if (!R.isEmpty(dates)) {
    const toSubstract = index + visibleMonths - R.length(months);
    if (toSubstract >= 0) {
      return index - toSubstract;
    }
  }
  return index;
};

export const calendarMonthsToRender = (
  visibleMonths: number,
  currentMonth: number,
  months: Date[]
): Date[] => {
  if (visibleMonths >= months.length) {
    return months;
  }
  return R.compose(R.take(visibleMonths), R.drop(currentMonth))(months);
};

type CustomClasses = { [className: string]: Date[] };

export const filterCustomClasses = (
  from: Date,
  to?: Date
): (CustomClasses => CustomClasses) =>
  R.compose(
    R.pickBy(R.prop('length')),
    R.mapObjIndexed((dates: Date[]) =>
      dates.filter(
        date =>
          R.isNil(to)
            ? isSameDay(date, from)
            : isSameDay(date, from) ||
              isSameDay(date, to) ||
              (isBefore(date, to) && isAfter(date, from))
      )
    )
  );
