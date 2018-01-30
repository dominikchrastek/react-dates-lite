/* @flow */
import lastDayOfMonth from 'date-fns/last_day_of_month';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/sub_months';

import * as utils from '../';

describe('#dayHelpers', () => {
  const date = new Date(2018, 3, 3);
  const month = new Date(2018, 2, 2);
  const prevMonth = new Date(2018, 1, 1);

  it('lastDayOfPrevMonth', () => {
    expect(utils.lastDayOfPrevMonth(month)).toEqual(lastDayOfMonth(prevMonth));
    expect(utils.lastDayOfPrevMonth(month)).not.toEqual(lastDayOfMonth(month));
  });

  it('daysFromPrevMonth', () => {
    expect(
      utils.daysFromPrevMonth(month, utils.lastDayOfPrevMonth(month)).length
    ).toEqual(5);
    expect(
      utils.daysFromPrevMonth(prevMonth, utils.lastDayOfPrevMonth(prevMonth))
        .length
    ).toEqual(4);
  });

  it('calendarDaysToRender', () => {
    expect(
      utils.calendarDaysToRender(month, utils.lastDayOfPrevMonth(month)).length
    ).toEqual(35);
    expect(
      utils.calendarDaysToRender(prevMonth, utils.lastDayOfPrevMonth(prevMonth))
        .length
    ).toEqual(32);
  });

  it('calendarDayNames', () => {
    expect(
      utils.calendarDayNames([
        date,
        date,
        date,
        date,
        date,
        date,
        date,
        date,
        date,
        date
      ]).length
    ).toEqual(7);
  });

  it('getMonths', () => {
    expect(utils.getMonths(1, 2, month).length).toEqual(3);
    expect(utils.getMonths(2, 1, month).length).toEqual(3);
    expect(utils.getMonths(2, 2, month)).toEqual([
      subMonths(month, 2),
      subMonths(month, 1),
      month,
      addMonths(month, 1)
    ]);
  });

  it('getNumberOfFutureMonths', () => {
    expect(utils.getNumberOfFutureMonths(false, 3)).toBe(1);
    expect(utils.getNumberOfFutureMonths(false, 0)).toBe(1);
    expect(utils.getNumberOfFutureMonths(true, 3)).toBe(3);
  });
});
