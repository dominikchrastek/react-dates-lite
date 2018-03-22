# 0.0.32 (2018-03-22)

### BREAKING CHANGES

* new prop **past** - allow/disable past date selection (default `true`)
* new prop **allowedDates** - array of dates that are selectable (default `[]`) when it's empty, all dates are selectable (except disabled dates)
* new prop **rangeSelect** - if enabled, ranges can be selected, otherwise just one date (default `true`)

### BREAKING CHANGES

**numberOfMonths** and **numberOfPastMonths** were removed, use **firstMonth** and **lastMonth**

```js
numberOfMonths={1} -> firstMonth={new Date(2018, 1, 1)} // some month
numberOfPastMonths={1} -> lastMonth={new Date(2018, 2, 1)}  // some month
```
