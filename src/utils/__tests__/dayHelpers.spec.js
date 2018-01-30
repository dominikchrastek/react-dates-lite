/* @flow */
import * as dayHelpers from '../dayHelpers';

describe('#dayHelpers', () => {
  const date = new Date(2018, 1, 1);
  const futureDate = new Date(2018, 2, 2);
  const pastDate = new Date(2017, 10, 10);

  it('isPast', () => {
    expect(dayHelpers.isPast(pastDate, date)).toBe(true);
    expect(dayHelpers.isPast(futureDate, date)).toBe(false);
  });

  it('isFuture', () => {
    expect(dayHelpers.isFuture(pastDate, date)).toBe(false);
    expect(dayHelpers.isFuture(futureDate, date)).toBe(true);
  });

  it('isSelected', () => {
    expect(dayHelpers.isSelected(date, [date])).toBe(true);
    expect(dayHelpers.isSelected(date, [futureDate])).toBe(false);
    expect(dayHelpers.isSelected(date, [])).toBe(false);
  });

  it('isHovered', () => {
    expect(dayHelpers.isHovered(date, [pastDate, date])).toBe(true);
    expect(dayHelpers.isHovered(date, [date, futureDate])).toBe(false);
    expect(dayHelpers.isHovered(date, [])).toBe(false);
  });
});
