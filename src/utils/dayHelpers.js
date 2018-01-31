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

export const isSelected = (day: Date, selectedDays: Date[]): boolean =>
  Boolean(R.find(selected => isSameDay(selected, day), selectedDays));

export const isDisabled = (day: Date, disabledDays: Date[]): boolean =>
  Boolean(R.find(disabled => isSameDay(disabled, day), disabledDays));

export const isHovered = (day: Date, hoveredDates: Date[]): boolean =>
  Boolean(R.find(hovered => isSameDay(hovered, day), R.drop(1, hoveredDates)));
