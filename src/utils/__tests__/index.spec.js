/* @flow */
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';

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
      utils.daysFromPrevMonth(new Date(2017, 0, 1), new Date(2017, 0, 1)).length
    ).toEqual(0);
    expect(
      utils.daysFromPrevMonth(prevMonth, utils.lastDayOfPrevMonth(prevMonth))
        .length
    ).toEqual(4);
  });

  it('calendarDaysToRender', () => {
    expect(utils.calendarDaysToRender(month).length).toEqual(35);
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

  it('getCurrentMonthIndex', () => {
    expect(utils.getCurrentMonthIndex(10, 10, [], false, 3, date)).toBe(8);
    expect(utils.getCurrentMonthIndex(10, 10, [], true, 3, date)).toBe(10);
    expect(utils.getCurrentMonthIndex(10, 10, [month], true, 3, date)).toBe(9);
    expect(utils.getCurrentMonthIndex(10, 10, [prevMonth], true, 3, date)).toBe(
      8
    );
    expect(utils.getCurrentMonthIndex(10, 10, [prevMonth], true, 3, date)).toBe(
      8
    );
    expect(
      utils.getCurrentMonthIndex(
        10,
        10,
        [prevMonth],
        true,
        3,
        new Date(2017, 5, 3)
      )
    ).toBe(17);
  });

  it('calendarMonthsToRender', () => {
    expect(
      utils.calendarMonthsToRender(3, 0, utils.getMonths(2, 1, month)).length
    ).toBe(3);
    expect(
      utils.calendarMonthsToRender(5, 0, utils.getMonths(2, 1, month)).length
    ).toBe(3);
    expect(
      utils.calendarMonthsToRender(2, 0, utils.getMonths(2, 1, month)).length
    ).toBe(2);
    expect(
      utils.calendarMonthsToRender(1, 0, utils.getMonths(2, 1, month)).length
    ).toBe(1);
    expect(
      utils.calendarMonthsToRender(2, 0, utils.getMonths(2, 1, month))
    ).toEqual([subMonths(month, 2), subMonths(month, 1)]);
    expect(
      utils.calendarMonthsToRender(2, 1, utils.getMonths(2, 1, month))
    ).toEqual([subMonths(month, 1), subMonths(month, 0)]);
  });
});
