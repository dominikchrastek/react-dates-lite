/* @flow */
import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Calendar from '../src';

storiesOf('Calendar', module).add('default', () => (
  <Calendar
    visibleMonths={1}
    numberOfMonths={3}
    numberOfPastMonths={10}
    selectedDates={[]}
    disabledDates={[]}
    selectDates={action('click')}
  />
));

storiesOf('Calendar', module).add('range select', () => (
  <Calendar
    visibleMonths={1}
    numberOfMonths={3}
    numberOfPastMonths={10}
    selectedDates={[]}
    disabledDates={[]}
    selectDates={action('click')}
    rangeSelect
  />
));

storiesOf('Calendar', module).add('2 visibleMonths', () => (
  <Calendar
    visibleMonths={2}
    numberOfMonths={3}
    numberOfPastMonths={10}
    selectedDates={[]}
    disabledDates={[]}
    selectDates={action('click')}
  />
));
