/* @flow */
/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';

import isBefore from 'date-fns/is_before';
import isAfter from 'date-fns/is_after';
import isSameDay from 'date-fns/is_same_day';
import startOfDay from 'date-fns/start_of_day';

// return if date is in the past or not
export const isPast = (day: Date, date: Date): boolean =>
  isBefore(day, startOfDay(date));

// return if date is in the future or not
export const isFuture = (day: Date, date: Date): boolean =>
  isAfter(day, startOfDay(date));

// return if date is selected or not
export const isSelected = (day: Date, selectedDays: Date[]): boolean =>
  Boolean(R.find(selected => isSameDay(selected, day), selectedDays));

// return if date is hovered or not
export const isHovered = (day: Date, hoveredDates: Date[]): boolean =>
  Boolean(
    R.find(selected => isSameDay(selected, day), R.drop(1, hoveredDates))
  );
