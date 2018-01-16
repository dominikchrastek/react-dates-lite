/* @flow */
import React, { PureComponent } from 'react';
import R from 'ramda';
import styled from 'styled-components';

import subMonths from 'date-fns/sub_months';
import startOfDay from 'date-fns/start_of_day';
import addMonths from 'date-fns/addMonths';
import isSameMonth from 'date-fns/is_same_month';
import CalendarMonth from './CalendarMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';

import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const defaultColors = {
  selected: 'rgb(244, 114, 49)',
  hovered: 'rgba(244, 114, 49, 0.75)',
  borders: '#D3D6DC',
  background: 'white',
  hover: '#D3D6DC'
};

const StyledArrowLeft = styled(ArrowLeft)`
  position: absolute;
  top: 5px;
  left: 12.5px;
  fill: #82888a;
  width: 18px;
`;

const StyledArrowRight = styled(ArrowRight)`
  position: absolute;
  top: 5px;
  right: 12.5px;
  fill: #82888a;
  width: 18px;
`;

const CalendarWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 300px;
  text-align: center;
`;

const NavBtn = styled.button`
  border: 1px solid ${props => props.colors.borders};
  position: absolute;
  background: ${props => props.colors.background};
  border-radius: 2px;
  width: 43px;
  height: 30px;
  cursor: pointer;
  :hover {
    background: ${props => props.colors.borders};
  }
  &:focus {
    outline: none;
  }
  :disabled {
    cursor: not-allowed;
    :hover {
      background: initial;
    }
  }
`;

const PrevBtn = NavBtn.extend`
  left: 0;
`;

const NextBtn = NavBtn.extend`
  right: 0;
`;

type Props = {|
  selectDays: ([Date]) => any,
  visibleMonths: number,
  numberOfMonths: number,
  numberOfPastMonths: number,
  selectedDays: Date[],
  colors: { [string]: string },
  classes: { [string]: string },
  className: string
|};

type State = {|
  currentMonth: number,
  hoveredDates: [],
  isFocused: false,
  start: null,
  end: null,
  hoveredDates: []
|};

const RgetMonths = (pastMonths, futureMonths) => [
  ...R.compose(
    R.map(month => subMonths(startOfDay(new Date()), month + 1)),
    R.sort((a, b) => b - a),
    R.times(R.identity)
  )(pastMonths),
  ...R.compose(
    R.map(month => addMonths(startOfDay(new Date()), month)),
    R.times(R.identity)
  )(futureMonths)
];

const currentMonthIndex = (pastMonths, futureMonths) =>
  R.findIndex(
    month => isSameMonth(month, new Date()),
    RgetMonths(pastMonths, futureMonths)
  );

export default class Calendar extends PureComponent<Props, State> {
  static defaultProps = {
    visibleMonths: 1,
    numberOfPastMonths: 0,
    colors: defaultColors,
    className: ''
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      end: null,
      hoveredDates: [],
      currentMonth: currentMonthIndex(
        props.numberOfPastMonths,
        props.numberOfMonths
      ),
      isFocused: false,
      start: null
    };
  }

  handleSelect;

  handleNext = () => {
    this.setState({ currentMonth: R.inc(this.state.currentMonth) });
  };

  handlePrev = () => {
    this.setState({ currentMonth: R.dec(this.state.currentMonth) });
  };

  //  test it !!!
  handleSetSelected = date => {
    const { start } = this.state;
    if (date && start) {
      if (isBefore(date, start)) {
        const range = eachDayOfInterval({ start: date, end: start });
        this.props.selectDays(range);
      } else {
        const range = eachDayOfInterval({ start, end: date });
        this.props.selectDays(range);
      }
    }
  };

  //  test it !!!
  handleSelect = date => {
    const { isFocused, end, start } = this.state;
    if (isFocused) {
      this.setState({ end: date, isFocused: false, hoveredDates: [] });
      this.handleSetSelected(date);
    } else if (isSameDay(date, end) && isSameDay(end, start)) {
      this.setState({
        start: null,
        end: null,
        isFocused: false
      });
      this.props.selectDays([]);
    } else {
      this.setState({ start: date, isFocused: true });
      this.props.selectDays([date]);
    }
  };
  //  test it !!!
  handleHover = date => {
    const { isFocused, start } = this.state;
    if (start && date && isFocused) {
      if (isBefore(date, start)) {
        const range = eachDayOfInterval({ start: date, end: start });
        this.setState({ hoveredDates: range });
      } else {
        this.setState({
          hoveredDates: eachDayOfInterval({
            start,
            end: date
          })
        });
      }
    }
  };

  render() {
    const {
      visibleMonths,
      numberOfMonths,
      numberOfPastMonths,
      selectedDays,
      colors,
      className,
      classes
    } = this.props;

    const mergedColors = R.merge(defaultColors, colors);

    const { currentMonth, hoveredDates } = this.state;

    const months = RgetMonths(numberOfPastMonths, numberOfMonths);
    const toRender = R.compose(R.take(visibleMonths), R.drop(currentMonth))(
      months
    );
    return (
      <CalendarWrapper className={className}>
        <PrevBtn
          className={classes.button}
          onClick={this.handlePrev}
          disabled={currentMonth === 0}
          colors={mergedColors}>
          <StyledArrowLeft />
        </PrevBtn>

        <NextBtn
          className={classes.button}
          onClick={this.handleNext}
          disabled={
            currentMonth === R.subtract(R.length(months), visibleMonths)
          }
          colors={mergedColors}>
          <StyledArrowRight />
        </NextBtn>

        <div className={classes.calendarWrapper}>
          {R.map(
            month => (
              <CalendarMonth
                key={month}
                month={month}
                selectedDays={selectedDays}
                selectDate={this.handleSelect}
                onHover={this.handleHover}
                hoveredDates={hoveredDates}
                allowedPastDates={numberOfPastMonths >= 1}
                colors={mergedColors}
                classes={classes}
              />
            ),
            toRender
          )}
        </div>
      </CalendarWrapper>
    );
  }
}
