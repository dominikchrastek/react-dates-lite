/* @flow */
import React from "react";

import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";

import Calendar from "../example/Example";

storiesOf("Calendar - Example", module).add("default", () => (
  <Calendar
    showWeekDayNames={boolean("showWeekDayNames", true)}
    showMonthName={boolean("showMonthName", true)}
  />
));
storiesOf("Calendar - Example", module).add("with allowedDates", () => (
  <Calendar
    allowedDates
    showWeekDayNames={boolean("showWeekDayNames", true)}
    showMonthName={boolean("showMonthName", true)}
  />
));
