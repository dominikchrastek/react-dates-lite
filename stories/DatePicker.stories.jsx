// @flow strict
import React from "react";
import styled from "styled-components";
import addMonths from "date-fns/addMonths";
import addDays from "date-fns/addDays";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DatePicker from "../example/DatePicker";

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  background-color: lightgray;
`;

const stories = storiesOf("DatePicker", module);

stories.add("default", () => {
  const today = new Date();
  const minDate = addDays(today, 1);
  const maxDate = addMonths(minDate, 1);

  const disabledDates: Date[] = [
    ...eachDayOfInterval({ start: startOfMonth(minDate), end: today }),
    ...eachDayOfInterval({ start: maxDate, end: endOfMonth(maxDate) })
  ];

  return (
    <StyledFlex justifyContent="center">
      <DatePicker
        date={minDate}
        minDate={today}
        maxDate={maxDate}
        disabledDates={disabledDates}
        placeholder="Select a date"
        onChangeDate={action("click")}
      />
    </StyledFlex>
  );
});
