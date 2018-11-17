/* @flow */
import * as React from "react";
import * as R from "ramda";
import styled from "styled-components";

import eachDayOfInterval from "date-fns/eachDayOfInterval";
import isSameDay from "date-fns/isSameDay";
import isBefore from "date-fns/isBefore";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";

import CalendarMonth from "./CalendarMonth";
import ArrowLeft from "./ArrowLeft";
import ArrowRight from "./ArrowRight";
import type { CalendarState, CalendarProps } from ".";
import * as utils from "./utils";

const defaultColors = {
  selected: "rgb(244, 114, 49)",
  selectedHover: "rgb(255, 141, 74)",
  border: "#e4e7e7",
  background: "white",
  hover: "#e4e7e7",
  disabled: "gray"
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

export const getWidth = (visibleMonths: number, width: number): string =>
  `${width * visibleMonths}px`; // 321 - 20 = 301 : 20 = margin

const CalendarWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  text-align: center;
  max-width: ${props => getWidth(props.visibleMonths, props.width)};
`;

const CalendarMonthWrapper = styled.div`
  display: flex;
`;

const NavBtn = styled.button`
  border: 1px solid ${props => props.colors.border};
  position: absolute;
  background: ${props => props.colors.background};
  border-radius: 2px;
  width: 43px;
  height: 30px;
  cursor: pointer;
  :hover {
    background: ${props => props.colors.border};
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

const StyledMonth = styled(CalendarMonth)`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const PrevBtn = styled(NavBtn)`
  left: 0;
`;

const NextBtn = styled(NavBtn)`
  right: 0;
`;

type Props = CalendarProps;

type State = CalendarState;

class Calendar extends React.PureComponent<Props, State> {
  static defaultProps = {
    disabledDates: [],
    allowedDates: [],
    visibleMonths: 1,
    colors: {},
    className: "",
    classes: {},
    future: true,
    past: true,
    rangeSelect: false,
    showMonthName: true,
    showWeekDayNames: true,
    customClasses: {},
    weekDayFormat: "E",
    width: 301,
    firstWeekDay: 0
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      end: null,
      hoveredDates: [],
      currentMonth: utils.getCurrentMonthIndex(
        props.firstMonth,
        props.lastMonth,
        props.selectedDates,
        props.future,
        props.visibleMonths
      ),
      isFocused: false,
      start: null,
      // eslint-disable-next-line react/no-unused-state
      selectedInternally: false
    };
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    const { selectedDates } = this.props;
    // when selectedDates came as a props, we need to know if they were changed
    // if they were, then we have to determine if they were changed internally
    // or externaly (from parent component)
    if (nextProps.selectedDates !== selectedDates) {
      this.handleSetCurrentMonth(nextProps, nextState);
    }
  }

  handleNext = () => {
    this.setState(state => ({
      currentMonth: state.currentMonth + 1
    }));
  };

  handlePrev = () => {
    this.setState(state => ({
      currentMonth: state.currentMonth - 1
    }));
  };

  /**
   * Method that will set current month
   * atm it's called only when dates are selected externally,
   * it means that dates were selected from parent component and pass as a
   * @argument {Props} nextProps
   * @argument {State} nextState
   */
  handleSetCurrentMonth = (nextProps: Props, nextState: State) => {
    const { firstMonth, lastMonth, future, visibleMonths } = this.props;
    // if date wasn't selected internally (it means that selectedDates
    // was changed from parent component ) then calculate current month and set it
    // also set selectedInternally to false
    if (!nextState.selectedInternally) {
      const currentMonth = utils.getCurrentMonthIndex(
        firstMonth,
        lastMonth,
        nextProps.selectedDates,
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

  /**
   * Method for selecting date range
   * @argument {Date} date
   */
  handleSetRange = (date: Date) => {
    const { start } = this.state;
    const { disabledDates, selectDates } = this.props;
    // when someting is already selected (start)
    // and we clicked on some date (date)
    // then we will set array of dates between
    // date and start - it depends which one is first
    // selected array of dates is sorted ascending
    if (date && start) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ selectedInternally: true });
      if (isBefore(date, start)) {
        const range = eachDayOfInterval({ start: date, end: start });
        selectDates(R.without(disabledDates, range));
      } else {
        const range = eachDayOfInterval({ start, end: date });
        selectDates(R.without(disabledDates, range));
      }
    }
  };

  /**
   * Method for handling date select
   * @argument {Date} date
   */
  handleSelect = (date: Date) => {
    const { disabledDates, rangeSelect, selectDates } = this.props;
    const { isFocused, end, start } = this.state;
    // when something is already selected
    if (isFocused && rangeSelect) {
      this.setState({
        end: date,
        isFocused: false,
        hoveredDates: [],
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      this.handleSetRange(date);
      // when unselecting date
    } else if (
      // $FlowExpected
      isSameDay(date, end) &&
      // $FlowExpected
      isSameDay(end, start)
    ) {
      this.setState({
        start: null,
        end: null,
        isFocused: false,
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      selectDates([]);
      // initial select case
    } else {
      this.setState({
        start: date,
        isFocused: true,
        // eslint-disable-next-line react/no-unused-state
        selectedInternally: true
      });
      selectDates(R.without(disabledDates, [date]));
    }
  };

  /**
   * Method for handling date hover
   * @argument {Date} date
   */
  handleHover = (date: Date) => {
    const { rangeSelect } = this.props;
    const { isFocused, start } = this.state;
    if (start && date && isFocused && rangeSelect) {
      if (isBefore(date, start)) {
        this.setState({
          hoveredDates: eachDayOfInterval({ start: date, end: start })
        });
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
      selectedDates,
      disabledDates,
      allowedDates,
      colors,
      className,
      classes,
      past,
      future,
      firstMonth,
      lastMonth,
      showMonthName,
      showWeekDayNames,
      customClasses,
      weekDayFormat,
      weekDayFormatter,
      monthNameFormatter,
      CustomTd,
      width,
      buttonBack,
      buttonForward,
      firstWeekDay
    } = this.props;

    const { currentMonth, hoveredDates, isFocused } = this.state;

    const mergedColors = R.merge(defaultColors, colors);
    const months = utils.getMonths(firstMonth, lastMonth);

    return (
      <CalendarWrapper
        className={className}
        visibleMonths={visibleMonths}
        width={width}
      >
        {months.length > visibleMonths && (
          <PrevBtn
            data-test="rdl-prev-button"
            className={classes.button || ""}
            onClick={this.handlePrev}
            disabled={currentMonth === 0 || months.length <= visibleMonths}
            colors={mergedColors}
          >
            {buttonBack ? (
              React.cloneElement(buttonBack, {
                disabled: currentMonth === 0 || months.length <= visibleMonths
              })
            ) : (
              <StyledArrowLeft />
            )}
          </PrevBtn>
        )}

        {months.length > visibleMonths && (
          <NextBtn
            data-test="rdl-next-button"
            className={classes.button || ""}
            onClick={this.handleNext}
            disabled={
              currentMonth === R.subtract(R.length(months), visibleMonths) ||
              months.length <= visibleMonths
            }
            colors={mergedColors}
          >
            {buttonForward ? (
              React.cloneElement(buttonForward, {
                disabled:
                  currentMonth ===
                    R.subtract(R.length(months), visibleMonths) ||
                  months.length <= visibleMonths
              })
            ) : (
              <StyledArrowRight />
            )}
          </NextBtn>
        )}

        <CalendarMonthWrapper className={classes.calendarWrapper || ""}>
          {R.map(
            month => (
              <StyledMonth
                key={month}
                month={month}
                CustomTd={CustomTd}
                selectedDates={selectedDates}
                disabledDates={disabledDates}
                allowedDates={allowedDates}
                selectDate={this.handleSelect}
                onHover={this.handleHover}
                hoveredDates={hoveredDates}
                past={past}
                isFocused={isFocused}
                future={future}
                colors={mergedColors}
                classes={classes}
                showMonthName={showMonthName}
                showWeekDayNames={showWeekDayNames}
                weekDayFormat={weekDayFormat}
                weekDayFormatter={weekDayFormatter}
                monthNameFormatter={monthNameFormatter}
                customClasses={utils.filterCustomClasses(
                  startOfMonth(month),
                  endOfMonth(month)
                )(customClasses)}
                width={width}
                firstWeekDay={firstWeekDay}
              />
            ),
            utils.calendarMonthsToRender(visibleMonths, currentMonth, months)
          )}
        </CalendarMonthWrapper>
      </CalendarWrapper>
    );
  }
}

export default Calendar;
