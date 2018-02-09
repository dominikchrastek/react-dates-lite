/* @flow */
/* eslint-disable import/prefer-default-export */
import * as R from 'ramda';

import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import isSameDay from 'date-fns/isSameDay';
import startOfDay from 'date-fns/startOfDay';

export const isPast = (day: Date, date: Date): boolean =>
  isBefore(day, startOfDay(date));

export const isFuture = (day: Date, date: Date): boolean =>
  isAfter(day, startOfDay(date));

export const isSelected = (day: Date, selectedDates: Date[]): boolean =>
  Boolean(R.find(selected => isSameDay(selected, day), selectedDates));

export const isDisabled = (day: Date, disabledDates: Date[]): boolean =>
  Boolean(R.find(disabled => isSameDay(disabled, day), disabledDates));

export const isHovered = (day: Date, hoveredDates: Date[]): boolean =>
  Boolean(R.find(hovered => isSameDay(hovered, day), hoveredDates));
