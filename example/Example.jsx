import React, { PureComponent } from 'react';
import R from 'ramda';
import Calendar from '../src';

export default class Example extends PureComponent {
  state = {
    selected: []
  };

  handleSelectDates = selected => {
    this.setState({ selected });
  };

  handleSetLast = () => {
    this.setState({ selected: [new Date(2017, 11, 5)] });
  };

  render() {
    const { selected } = this.state;
    return (
      <div>
        <button onClick={this.handleSetLast} />
        <Calendar
          colors={{
            selected: 'rgb(244, 114, 49)',
            hovered: 'rgba(244, 114, 49, 0.75)',
            borders: '#D3D6DC',
            hover: '#D3D6DC'
          }}
          classes={{
            calendarWrapper: 'wrapper'
          }}
          visibleMonths={3}
          numberOfMonths={3}
          numberOfPastMonths={2}
          selectedDays={selected}
          selectDays={this.handleSelectDates}
        />
      </div>
    );
  }
}
