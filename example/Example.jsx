import React, { PureComponent } from 'react';
import R from 'ramda';
import Calendar from '../src';

export default class Example extends PureComponent {
  state = {
    selected: [],
  };

  handleSelectDates = selected => {
    this.setState({ selected });
  };

  render() {
    const { selected } = this.state;
    return (
      <Calendar
        colors={{
          selected: 'rgb(244, 114, 49)',
          hovered: 'rgba(244, 114, 49, 0.75)',
          borders: '#D3D6DC',
          background: 'white',
          hover: '#D3D6DC',
        }}
        visibleMonths={2}
        numberOfMonths={2}
        numberOfPastMonths={2}
        selectedDays={selected}
        selectDays={this.handleSelectDates}
      />
    );
  }
}
