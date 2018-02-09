import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';

import Calendar from '../src';

import addDays from 'date-fns/addDays';
import startOfDay from 'date-fns/startOfDay';

const Column = styled.div`
  display: flex;
`;
export default class Example extends React.PureComponent {
  state = {
    selectedDates: [],
    disabledDates: [startOfDay(addDays(new Date(), 1))]
  };

  handleSelectDates = selectedDates => {
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
    const { selectedDates, disabledDates } = this.state;
    return (
      <div>
        <button onClick={this.handleSetToday}>select today</button>
        <button onClick={this.handleSetLastMonth}>select last monht</button>
        <Calendar
          className="wrapper"
          colors={{
            selected: '#008000',
            selectedHover: '#329B24',
            borders: '#e4e7e7',
            hover: '#e4e7e7'
          }}
          visibleMonths={2}
          numberOfMonths={3}
          numberOfPastMonths={3}
          selectedDates={selectedDates}
          disabledDates={disabledDates}
          selectDates={this.handleSelectDates}
        />
        <Column>
          <div>
            selected dates:
            {R.map(
              day => <div>{format(day, 'DD.MM.YYYY')}</div>,
              selectedDates
            )}
          </div>
          <div>
            disabled dates:
            {R.map(
              day => <div>{format(day, 'DD.MM.YYYY')}</div>,
              disabledDates
            )}
          </div>
        </Column>
      </div>
    );
  }
}
