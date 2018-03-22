/* @flow */
import MockDate from 'mockdate';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import startOfMonth from 'date-fns/startOfMonth';

import * as utils from '../';

describe('#dayHelpers', () => {
  beforeEach(() => {
    MockDate.set('1/31/2018');
  });
  afterEach(() => {
    MockDate.reset();
  });
  const date = new Date(2018, 3, 3);
  const month = new Date(2018, 1, 2);
  const prevMonth = new Date(2018, 0, 1);
  const nextMonth = new Date(2018, 2, 3);

  it('lastDayOfPrevMonth', () => {
    expect(utils.lastDayOfPrevMonth(month)).toEqual(lastDayOfMonth(prevMonth));
    expect(utils.lastDayOfPrevMonth(month)).not.toEqual(lastDayOfMonth(month));
  });

  it('daysFromPrevMonth', () => {
    expect(
      utils.daysFromPrevMonth(month, utils.lastDayOfPrevMonth(month)).length
    ).toEqual(5);
    expect(
      utils.daysFromPrevMonth(new Date(2017, 0, 1), new Date(2017, 0, 1)).length
    ).toEqual(0);
    expect(
      utils.daysFromPrevMonth(prevMonth, utils.lastDayOfPrevMonth(prevMonth))
        .length
    ).toEqual(1);
  });

  it('calendarDaysToRender', () => {
    expect(utils.calendarDaysToRender(month).length).toEqual(32);
    expect(utils.calendarDaysToRender(prevMonth).length).toEqual(32);
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
    expect(utils.getMonths(prevMonth, month).length).toEqual(2);
    expect(utils.getMonths(prevMonth, nextMonth).length).toEqual(3);
    expect(utils.getMonths(prevMonth, nextMonth)).toEqual([
      startOfMonth(prevMonth),
      startOfMonth(month),
      startOfMonth(nextMonth)
    ]);
  });

  it('getCurrentMonthIndex', () => {
    expect(utils.getCurrentMonthIndex(prevMonth, nextMonth, [], false, 1)).toBe(
      0
    );
    expect(
      utils.getCurrentMonthIndex(prevMonth, nextMonth, [month], true, 1, date)
    ).toBe(1);
    expect(
      utils.getCurrentMonthIndex(
        prevMonth,
        nextMonth,
        [prevMonth],
        true,
        3,
        date
      )
    ).toBe(0);
    expect(
      utils.getCurrentMonthIndex(
        prevMonth,
        nextMonth,
        [prevMonth],
        true,
        3,
        date
      )
    ).toBe(0);
    expect(
      utils.getCurrentMonthIndex(
        prevMonth,
        nextMonth,
        [prevMonth],
        true,
        3,
        month
      )
    ).toBe(0);
  });

  it('calendarMonthsToRender', () => {
    expect(
      utils.calendarMonthsToRender(3, 0, utils.getMonths(prevMonth, nextMonth))
        .length
    ).toBe(3);
    expect(
      utils.calendarMonthsToRender(5, 0, utils.getMonths(prevMonth, nextMonth))
        .length
    ).toBe(3);
    expect(
      utils.calendarMonthsToRender(2, 0, utils.getMonths(prevMonth, nextMonth))
        .length
    ).toBe(2);
    expect(
      utils.calendarMonthsToRender(1, 0, utils.getMonths(prevMonth, nextMonth))
        .length
    ).toBe(1);
    expect(
      utils.calendarMonthsToRender(2, 0, utils.getMonths(prevMonth, nextMonth))
    ).toEqual([startOfMonth(prevMonth), startOfMonth(month)]);
    expect(
      utils.calendarMonthsToRender(2, 1, utils.getMonths(prevMonth, nextMonth))
    ).toEqual([startOfMonth(month), startOfMonth(nextMonth)]);
  });
});
