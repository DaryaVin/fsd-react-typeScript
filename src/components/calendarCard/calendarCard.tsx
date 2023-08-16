import React, { ChangeEvent, useEffect, useState } from "react";
import CalendarReact, { CalendarTileProperties, OnChangeDateRangeCallback, ViewCallback, ViewCallbackProperties } from "react-calendar";
import "./calendarCard.scss";

interface CalendarCardProps extends  React.HTMLAttributes<HTMLDivElement>{
  state: Date | null ,
  state2?: Date | null,
  setState: React.Dispatch<React.SetStateAction< Date | null >>,
  setState2?: React.Dispatch<React.SetStateAction< Date | null >>,
  minDate?: Date | null,
  maxDate?: Date | null,
}
export const CalendarCard = ({state, setState, state2, setState2, minDate, maxDate, className,  ...props}: CalendarCardProps) => {
  let newMinDate = minDate? minDate : undefined;
  let newMaxDate = maxDate? maxDate : undefined;
  if (newMinDate) newMinDate.setHours(0, 0, 0, 0);
  if (newMaxDate) newMaxDate.setHours(23, 59, 59, 999);

  let value: Date | null| [Date | null, Date | null] = state2 ? [state, state2] : state;

  const onChange: OnChangeDateRangeCallback = (values: [Date] | [Date, Date], e: ChangeEvent<HTMLInputElement>) => {
    // setState(values[0]);
    if (!Array.isArray(values)) setState(values);
    if (values[1] && setState2) {
      setState(values[0]);
      setState2(values[1]);
    }
  }

  const formatMonthYearFunc = (locale: string, date: Date): string => {
    return date.toLocaleString(locale, {month: 'long', year: 'numeric'}).slice(0, -2);
  }

  let [activeStartDateState, setActiveStartDateState] = useState<Date | undefined>(undefined);

  const onActiveStartDateChange:ViewCallback  = ({action}: ViewCallbackProperties) => {
    switch (action) {
      case "prev": {
        setActiveStartDateState(activeStartDateState instanceof Date ?
          new Date(activeStartDateState.getFullYear(), activeStartDateState.getMonth() - 1 )
          : undefined
        );
        break;
      }
      case "next": {
        setActiveStartDateState(activeStartDateState instanceof Date ?
          new Date(activeStartDateState.getFullYear(), activeStartDateState.getMonth() + 1 )
          : undefined
        );
        break;
      }
      default: setActiveStartDateState(activeStartDateState);
    }
  }

  const tileDisabledFunc = ({date}: CalendarTileProperties): boolean => {
    if ( newMaxDate && date > newMaxDate) return true;
    if ( newMinDate && date < newMinDate) return true;
    return false;
  }

  useEffect(()=> {
    setActiveStartDateState(() => state instanceof Date
      ? new Date(state.getFullYear(), state.getMonth())
      : undefined
    );
  }, [state]);
  return (
    <>
      <div {...props} className={"calendarCard" + (className ? " " + className : "")}>
        <CalendarReact
          value={value}
          onChange={onChange}
          minDate={newMinDate}
          maxDate={newMaxDate}
          tileDisabled={tileDisabledFunc}
          className={"calendarCard__calendar"}
          locale="ru-Ru"
          prev2Label={null}
          next2Label={null}
          prevLabel={""}
          nextLabel={""}
          activeStartDate={activeStartDateState}
          onActiveStartDateChange={onActiveStartDateChange}
          view="month"
          formatMonthYear={formatMonthYearFunc}
          selectRange={setState2 ? true: false}
        />
      </div>
    </>
  )
}
