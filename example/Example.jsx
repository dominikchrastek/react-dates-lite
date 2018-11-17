/* @flow */
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import startOfDay from "date-fns/startOfDay";
import addMonths from "date-fns/addMonths";
import type { WeekDay } from "../src";
import Calendar from "../src";
// import CalendarDay from '../src/CustomDay';

const Container = styled.div`
  & .class1 > button {
    background-color: #8bc34a;
  }
  & .class2 > button {
    text-decoration: line-through;
  }
`;

const Column = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

type Props = {|
  allowedDates?: boolean,
  showMonthName?: boolean,
  showWeekDayNames?: boolean,
  firstWeekDay?: WeekDay,
  rangeSelect?: boolean,
  visibleMonths?: number
|};

type State = {|
  selectedDates: Date[],
  disabledDates: Date[]
|};

export default class Example extends React.PureComponent<Props, State> {
  static defaultProps = {
    allowedDates: false,
    showMonthName: true,
    showWeekDayNames: true,
    firstWeekDay: 0,
    rangeSelect: false,
    visibleMonths: 1
  };

  state = {
    selectedDates: [],
    disabledDates: [startOfDay(addDays(new Date(), 1))]
  };

  handleSelectDates = (selectedDates: Date[]) => {
    this.setState({ selectedDates });
  };

  handleSetToday = () => {
    this.setState({ selectedDates: [new Date()] });
  };

  handleSetLastMonth = () => {
    this.setState({
      selectedDates: eachDayOfInterval({
        start: startOfMonth(subMonths(new Date(), 1)),
        end: endOfMonth(subMonths(new Date(), 1))
      })
    });
  };

  render() {
    const {
      allowedDates,
      showWeekDayNames,
      showMonthName,
      firstWeekDay,
      rangeSelect,
      visibleMonths
    } = this.props;
    const { selectedDates, disabledDates } = this.state;
    return (
      <Container>
        <button type="button" onClick={this.handleSetToday}>
          select today
        </button>
        <button type="button" onClick={this.handleSetLastMonth}>
          select last month
        </button>
        <Calendar
          className="wrapper"
          colors={{
            selected: "#008000",
            selectedHover: "#329B24",
            borders: "#e4e7e7",
            hover: "#e4e7e7"
          }}
          visibleMonths={visibleMonths}
          selectedDates={selectedDates}
          disabledDates={disabledDates}
          allowedDates={
            allowedDates ? [startOfDay(addDays(new Date(), 2))] : []
          }
          selectDates={this.handleSelectDates}
          // CustomTd={CalendarDay}
          rangeSelect={rangeSelect}
          showWeekDayNames={showWeekDayNames}
          showMonthName={showMonthName}
          firstMonth={subMonths(new Date(), 1)}
          lastMonth={addMonths(new Date(), 1)}
          customClasses={{
            class1: [new Date()],
            class2: [new Date(), addDays(new Date(), 2)]
          }}
          firstWeekDay={Number(firstWeekDay)}
        />

        <Column>
          <div>
            selected dates:
            {R.map(
              day => (
                <div key={day.toISOString()}>{format(day, "dd.MM.yyyy")}</div>
              ),
              selectedDates
            )}
          </div>
          <div>
            disabled dates:
            {R.map(
              day => (
                <div key={day.toISOString()}>{format(day, "dd.MM.yyyy")}</div>
              ),
              disabledDates
            )}
          </div>
        </Column>
      </Container>
    );
  }
}
