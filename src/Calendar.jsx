/* @flow */
import * as React from 'react';
import * as R from 'ramda';
import styled from 'styled-components';

import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';

import CalendarMonth from './CalendarMonth';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

import * as utils from './utils';

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
  future?: boolean,
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
  hoveredDates: [],
  selectedInternally: boolean
|};

export default class Calendar extends React.PureComponent<Props, State> {
  static defaultProps = {
    visibleMonths: 1,
    numberOfPastMonths: 0,
    colors: defaultColors,
    className: '',
    classes: {},
    future: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      end: null,
      hoveredDates: [],
      currentMonth: utils.getCurrentMonthIndex(
        props.numberOfPastMonths,
        props.numberOfMonths,
        props.selectedDays,
        props.future,
        props.visibleMonths
      ),
      isFocused: false,
      start: null,
      // eslint-disable-next-line react/no-unused-state
      selectedInternally: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // when selectedDays came as a props, we need to know if they were changed
    // if they were, then we have to determine if they were changed internally
    // or externaly (from parent component)
    if (nextProps.selectedDays !== this.props.selectedDays) {
      this.handleSetCurrentMonth(nextProps, nextState);
    }
  }

  handleNext = () => {
    this.setState(state => ({
      currentMonth: R.inc(state.currentMonth)
    }));
  };

  handlePrev = () => {
    this.setState(state => ({
      currentMonth: R.dec(state.currentMonth)
    }));
  };

  // TODO: test it
  handleSetCurrentMonth = (nextProps, nextState) => {
    const {
      numberOfPastMonths,
      numberOfMonths,
      future,
      visibleMonths
    } = this.props;
    // if date wasn't selected internally (it means that selectedDays
    // was changed from parent component ) then calculate current month and set it
    // also set selectedInternally to false
    if (!nextState.selectedInternally) {
      const currentMonth = utils.getCurrentMonthIndex(
        numberOfPastMonths,
        numberOfMonths,
        nextProps.selectedDays,
        future,
        visibleMonths
      );
      // eslint-disable-next-line react/no-unused-state
      this.setState({ selectedInternally: false, currentMonth });
      // }
      // otherwise just set selectedInternally to false, so we can determine if next
      // date select will be done in this component or in parent component
    } else {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ selectedInternally: false });
    }
  };

  // TODO: test it !!!
  // TODO: write comments
  handleSetSelected = date => {
    const { start } = this.state;
    if (date && start) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ selectedInternally: true });
      if (isBefore(date, start)) {
        const range = eachDayOfInterval({ start: date, end: start });
        this.props.selectDays(range);
      } else {
        const range = eachDayOfInterval({ start, end: date });
        this.props.selectDays(range);
      }
    }
  };

  // TODO: test it !!!
  // TODO: write comments
  handleSelect = date => {
    const { isFocused, end, start } = this.state;
    if (isFocused) {
      this.setState({
        end: date,
        isFocused: false,
        hoveredDates: [],
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      this.handleSetSelected(date);
    } else if (isSameDay(date, end) && isSameDay(end, start)) {
      this.setState({
        start: null,
        end: null,
        isFocused: false,
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      this.props.selectDays([]);
    } else {
      this.setState({
        start: date,
        isFocused: true,
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      this.props.selectDays([date]);
    }
  };
  // TODO: test it !!!
  // TODO: write comments
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
      classes,
      future
    } = this.props;

    const mergedColors = R.merge(defaultColors, colors);

    const { currentMonth, hoveredDates } = this.state;
    let months;
    if (!future) {
      months = utils.getMonths(
        numberOfPastMonths,
        numberOfMonths - (visibleMonths - 1),
        new Date()
      );
    } else {
      months = utils.getMonths(numberOfPastMonths, numberOfMonths, new Date());
    }
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
                future={future}
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
