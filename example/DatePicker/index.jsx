// @flow strict
import * as React from "react";
import styled from "styled-components";
import format from "date-fns/format";
// $FlowFixMe
import Calendar from "../../src";
import InputButton from "./components/InputButton";

const StyledCalendar = styled(Calendar)`
  position: absolute;
  top: 56px;
  left: 0px;
  z-index: 2;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2.5px 4px 0 rgba(0, 0, 0, 0.5);
`;

const StyledRoot = styled.div`
  position: relative;
`;

export const formatDay = (date: Date): string => format(date, "E");
export const formatMonth = (date: Date): string => format(date, "MMMM yyyy");
export const formatDate = (date: Date): string => format(date, "E d MMM");

type Props = {
  date: ?Date,
  minDate: Date,
  maxDate: Date,
  disabledDates?: ?(Date[]),
  onChangeDate: (date: Date) => void,
  placeholder?: string
};
type State = {
  calendarVisible: boolean
};

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    placeholder: "",
    disabledDates: undefined
  };

  constructor(props: Props) {
    super(props);
    this.calendarWrapperNode = React.createRef();
    this.state = {
      calendarVisible: false
    };
  }

  componentWillMount = () => {
    document.addEventListener("mousedown", this.handleClick, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleClick, false);
  };

  handleClick = (ev: MouseEvent) => {
    const { calendarVisible } = this.state;

    if (
      calendarVisible &&
      this.calendarWrapperNode &&
      this.calendarWrapperNode.current &&
      // $FlowFixMe
      !this.calendarWrapperNode.current.contains(ev.target)
    ) {
      // click outside calendar
      this.handleToggleCalendar();
    }
  };

  handleToggleCalendar = () => {
    const { calendarVisible } = this.state;
    this.setState({ calendarVisible: !calendarVisible });
  };

  calendarWrapperNode: ?React.Ref<*>; // should be typeof div

  render() {
    const {
      date,
      minDate,
      maxDate,
      disabledDates,
      onChangeDate,
      placeholder
    } = this.props;

    const { calendarVisible } = this.state;

    return (
      <StyledRoot>
        <InputButton
          placeholder={placeholder}
          value={date ? formatDate(date) : ""}
          onClick={this.handleToggleCalendar}
        />
        {calendarVisible && (
          <div ref={this.calendarWrapperNode}>
            <StyledCalendar
              visibleMonths={1}
              firstMonth={minDate}
              lastMonth={maxDate}
              disabledDates={disabledDates}
              selectedDates={date ? [date] : []}
              selectDates={dates => {
                onChangeDate(dates[0]);
                this.handleToggleCalendar();
              }}
              showWeekDayNames
              showMonthName
              weekDayFormater={formatDay}
              monthNameFormatter={formatMonth}
              colors={{
                selected: "pink",
                selectedHover: "pink",
                background: "white",
                border: "white"
              }}
            />
          </div>
        )}
      </StyledRoot>
    );
  }
}

export default DatePicker;
