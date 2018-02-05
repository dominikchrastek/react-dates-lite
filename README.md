# react-dates-lite

**Calendar** component for maintaining selecting dates. Works with native Date API (no `Moment.js`)

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

see this [Example](https://github.com/dominikchrastek/react-dates-lite/blob/master/example/Example.jsx) usage

### Props

* `visibleMonths?: number` - how many months will be visible (default `1`)
* `numberOfMonths: number` - how many months will be in calendar in the future (from current month)
* `numberOfPastMonths?: number` - how many months will be in calendar in the past (from current month) (default `0`)
* `selectDays: ([Date]) => any` - will receive array of Dates that were selected
* `selectedDays: [Date]` - array of Dates that are selected
* `className?: string` - will provide class to the Calendar container (default `''`)
* `colors?: { [string]: number }` - will provide colors to these stuff:
  * `selected` - background-color of selected date
  * `borders` - borders color
  * `hover` - background-color of hovered date
  * example color object:


  ```js
  colors={{
   selected: 'rgb(244, 114, 49)',
   borders: '#D3D6DC',
   hover: 'red',
  }}
  ```
  * there are some default values

## License

MIT
