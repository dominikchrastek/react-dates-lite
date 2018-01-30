import * as React from 'react';
import Calendar from '../src';

export default class Example extends React.PureComponent {
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
          className="wrapper"
          colors={{
            selected: 'rgb(244, 114, 49)',
            hovered: 'rgba(244, 114, 49, 0.75)',
            borders: '#D3D6DC',
            hover: '#D3D6DC'
          }}
          classes={{
            calendarWrapper: 'calendarWrapper'
          }}
          visibleMonths={3}
          numberOfMonths={3}
          numberOfPastMonths={10}
          selectedDays={selected}
          selectDays={this.handleSelectDates}
        />
      </div>
    );
  }
}
