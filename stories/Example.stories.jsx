/* @flow */
import React from "react";

import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs/react";
import Calendar from "../example/Example";

const weekDays = [0, 1, 2, 3, 4, 5, 6];

storiesOf("Calendar - Example", module)
  .add("default", () => (
    <Calendar
      showWeekDayNames={boolean("showWeekDayNames", true)}
      showMonthName={boolean("showMonthName", true)}
      firstWeekDay={select("firstWeekDay", weekDays, weekDays[0])}
    />
  ))
  .add("2 visible months", () => (
    <Calendar
      showWeekDayNames={boolean("showWeekDayNames", true)}
      showMonthName={boolean("showMonthName", true)}
      firstWeekDay={select("firstWeekDay", weekDays, weekDays[0])}
      visibleMonths={2}
    />
  ))
  .add("range select", () => (
    <Calendar
      showWeekDayNames={boolean("showWeekDayNames", true)}
      showMonthName={boolean("showMonthName", true)}
      firstWeekDay={select("firstWeekDay", weekDays, weekDays[0])}
      rangeSelect
      visibleMonths={2}
    />
  ))
  .add("with allowedDates", () => (
    <Calendar
      allowedDates
      showWeekDayNames={boolean("showWeekDayNames", true)}
      showMonthName={boolean("showMonthName", true)}
      firstWeekDay={select("firstWeekDay", weekDays, weekDays[0])}
    />
  ));
