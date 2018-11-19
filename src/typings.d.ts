declare module "react-dates-lite" {
  import * as React from "react";

  type ButtonProps = {
    isPast: boolean;
    isFuture: boolean;
    isHidden: boolean;
    isHovered: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    colors: { [s: string]: string };
    isFocused: boolean;
    disabled?: boolean;
    className?: string;
  };

  type CalendarDayProps = ButtonProps & {
    value: Date;
    number: number;
    selectDate: (value: Date) => void;
    onHover: (value: Date) => void;
    customClasses: string[];
    classes: { [s: string]: string };
  };

  type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  interface CalendarProps {
    selectDates: (values: Date[]) => any;
    selectedDates: Date[];
    disabledDates?: Date[];
    allowedDates?: Date[];
    visibleMonths?: number;
    future?: boolean;
    past?: boolean;
    colors?: { [s: string]: string };
    classes?: { [s: string]: string };
    className?: string;
    rangeSelect?: boolean;
    firstMonth: Date;
    lastMonth: Date;
    customClasses?: { [s: string]: Date[] };
    showMonthName?: boolean;
    showWeekDayNames?: boolean;
    weekDayFormat?: string;
    weekDayFormatter?: (value: Date) => string;
    monthNameFormatter?: (value: Date) => string;
    width?: number;
    buttonBack?: React.ReactNode;
    buttonForward?: React.ReactNode;
    firstWeekDay?: WeekDay;
  }
  const Calendar: React.ComponentType<CalendarProps>;
  export default Calendar;
}
