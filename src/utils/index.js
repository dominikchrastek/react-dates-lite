/* @flow */
/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';

import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import subDays from 'date-fns/subDays';
import getDay from 'date-fns/getDay';
import startOfDay from 'date-fns/startOfDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import isSameMonth from 'date-fns/isSameMonth';

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

// get array of months of size n, where n = pastMonths + futureMonths
export const getMonths = (
  pastMonths: number,
  futureMonths: number,
  today: Date
): Date[] => [
  ...R.compose(
    R.map(month => subMonths(startOfDay(today), month + 1)),
    R.sort((a, b) => b - a),
    R.times(R.identity)
  )(pastMonths),
  ...R.compose(
    R.map(month => addMonths(startOfDay(today), month)),
    R.times(R.identity)
  )(futureMonths)
];

export const getNumberOfFutureMonths = (
  future: boolean,
  futureMonthsNumber: number
): number => (future ? futureMonthsNumber : 1);

export const getCurrentMonthIndex = (
  pastMonths: number,
  futureMonths: number,
  dates: Date[],
  future: boolean,
  visibleMonths: number
): number => {
  const datesOrToday = R.isEmpty(dates) ? [new Date()] : dates;
  const months = getMonths(
    pastMonths,
    getNumberOfFutureMonths(future, futureMonths),
    new Date()
  );
  const index = R.findIndex(
    // $FlowExpected
    month => isSameMonth(month, R.head([datesOrToday])),
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
