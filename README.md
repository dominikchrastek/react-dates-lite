# react-dates-lite

[![Build Status](https://travis-ci.org/dominikchrastek/react-dates-lite.svg?branch=master)](https://travis-ci.org/dominikchrastek/react-dates-lite)
[![codecov](https://codecov.io/gh/dominikchrastek/react-dates-lite/branch/master/graph/badge.svg)](https://codecov.io/gh/dominikchrastek/react-dates-lite)

## Install

`yarn add styled-components` - peerDependency, also check that you have `react` and `react-dom`

`yarn add react-dates-lite`

## API

#### Example

```js
import Calendar from "react-dates-lite";

<Calendar
  visibleMonths={1}
  firstMonth={new Date(2018, 1, 1)}
  lastMonth={new Date(2018, 2, 1)}
  selectedDates={[new Date()]}
  selectDates={console.log}
/>;
```

see this [Example](https://github.com/dominikchrastek/react-dates-lite/blob/master/example/Example.jsx) or [Live demo](https://dominikchrastek.github.io/react-dates-lite)

### Props

- `visibleMonths?: number` - how many months will be visible (default `1`)
- `firstMonth: Date` - first month in calendar, months between first and last (included) will be in calendar
- `lastMonth: Date` - last month in calendar, months between first and last (included) will be in calendar
- `selectDates: Date[] => any` - will receive array of Dates that were selected
- `selectedDates: Date[]` - array of Dates that are selected
- `disabledDates: Date[]` - array of Dates that cannot be selected
- `allowedDates?: Date[]` - array of dates that are selectable (default `[]`) when it's empty, all dates are selectable (except disabled dates)
- `future?: boolean` - if future dates from today will be enabled (default `true`)
- `past?: boolean` - if past dates from today will be enabled (default `true`)
- `rangeSelect?: boolean` - if enabled, ranges can be selected, otherwise just one date (default `true`)
- `className?: string` - will provide class to the Calendar container (default `''`)
- `colors?: { [string]: number }` - will provide colors to these stuff:
  - `selected` - background-color of selected date
  - `selectedHover` - background-color of selected date that is hovered
  - `hover` - background-color of date that is hovered
  - `border` - border color
  - `background` - default background-color
  - `disabled` - color of disabled date
  - default values:
  ```js
  colors = {
    selected: "rgb(244, 114, 49)",
    selectedHover: "rgb(255, 141, 74)",
    border: "#e4e7e7",
    background: "white",
    hover: "#e4e7e7",
    disabled: "gray"
  };
  ```
- `classes?: { [string]: string }` - will provide colors to these stuff: \* `button` - class for buttons
  - `calendarWrapper` - class for calendar wrapper
  - `month` - class for single month wrapper
  - default value: `{}`
- `customClasses?: { [className: string]: Date[] }` - add `className` to specified dates
- `CustomTd?: React.ComponentType<CalendarDayProps>` - custom day component (original `CalendarDay`)
- `showMonthName: boolean` - show / hide month names
- `showWeekDayNames: boolean` - show / hide week day names
- `weekDayFormat?: string` - week day format, e.g. `E`
- `weekDayFormatter?: Date => string` - week day formatter function, e.g. `day => format(day, 'E')` (can be used to pass locale)
- `monthNameFormatter?: Date => string` - month name formatter function, e.g. `month => format(month, 'MMMM yyyy')` (can be used to pass locale)
- `width?: number` - custom base width of a single calendar (excluding margins)
- `buttonBack?: React.Node` - custom back button (will receive disabled prop)
- `buttonForward?: React.Node` - custom forwrad button (will receive disabled prop)
- `firstWeekDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6` - set day that will be displayed first (`0` is `sunday` and also default value)

## License

MIT
