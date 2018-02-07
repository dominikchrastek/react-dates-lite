# react-dates-lite

**Calendar** component for maintaining selecting dates. Works with native Date API (no `Moment.js`) [https://dominikchrastek.github.io/react-dates-lite](https://dominikchrastek.github.io/react-dates-lite)

## API

#### Example

```js
import Calendar from 'react-dates-lite';

<Calendar
  visibleMonths={1}
  numberOfMonths={4}
  numberOfPastMonths={2}
  selectedDays={[new Date()]}
  selectDays={date => console.log(date)}
/>;
```

see this [Example](https://github.com/dominikchrastek/react-dates-lite/blob/master/example/Example.jsx) or [Live demo](https://dominikchrastek.github.io/react-dates-lite)

### Props

* `visibleMonths?: number` - how many months will be visible (default `1`)
* `numberOfMonths: number` - how many months will be in calendar in the future (from current month)
* `numberOfPastMonths?: number` - how many months will be in calendar in the past (from current month) (default `0`)
* `selectDays: Date[] => any` - will receive array of Dates that were selected
* `selectedDays: Date[]` - array of Dates that are selected
* `disabledDays: Date[]` - array of Dates that cannot be selected
* `future?: boolean` - if future dates from today will be enabled (default `true`)
* `className?: string` - will provide class to the Calendar container (default `''`)
* `colors?: { [string]: number }` - will provide colors to these stuff:
  * `selected` - background-color of selected date
  * `selectedHover` - background-color of selected date that is hovered
  * `hover` - background-color of date that is hovered
  * `border` - border color
  * `background` - default background-color
  * `hover` - background-color of hovered date
  * `disabled` - color of disabled date
  * default values:
  ```js
  colors = {
    selected: 'rgb(244, 114, 49)',
    selectedHover: 'rgb(255, 141, 74)',
    border: '#e4e7e7',
    background: 'white',
    hover: '#e4e7e7',
    disabled: 'gray',
  };
  ```
* `classes?: { [string]: string }` - will provide colors to these stuff: \* `button` - class for buttons
  * `calendarWrapper` - class for calendar wrapper
  * `month` - class for single month wrapper
  * default value: `{}`

## License

MIT
