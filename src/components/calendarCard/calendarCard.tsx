import React, { ChangeEvent, useEffect, useState } from "react";
import CalendarReact, { CalendarTileProperties, OnChangeDateRangeCallback, ViewCallback, ViewCallbackProperties } from "react-calendar";
import "./calendarCard.scss";

interface CalendarCardProps {
  state: Date | null ,
  state2?: Date | null,
  setState: React.Dispatch<React.SetStateAction< Date | null >>,
  setState2?: React.Dispatch<React.SetStateAction< Date | null >>,
  minDate?: Date | null, 
  maxDate?: Date | null,
}
export const CalendarCard = (props: CalendarCardProps) => {
  let minDate = props.minDate? props.minDate : undefined;
  let maxDate = props.maxDate? props.maxDate : undefined;
  if (minDate) minDate.setHours(0, 0, 0, 0);
  if (maxDate) maxDate.setHours(23, 59, 59, 999);

  let value: Date | null| [Date | null, Date | null] = props.state2 ? [props.state, props.state2] : props.state;

  const onChange: OnChangeDateRangeCallback = (values: [Date] | [Date, Date], e: ChangeEvent<HTMLInputElement>) => {
    props.setState(values[0]);
    if (!Array.isArray(values)) props.setState(values);
    if (values[1] && props.setState2) {
      props.setState(values[0]);
      props.setState2(values[1]);
    }
  }

  const formatMonthYearFunc = (locale: string, date: Date): string => {
    return date.toLocaleString(locale, {month: 'long', year: 'numeric'}).slice(0, -2);
  }

  let [activeStartDateState, setActiveStartDateState] = useState<Date | undefined>(undefined);
  
  const onActiveStartDateChange:ViewCallback  = (props: ViewCallbackProperties) => {
    switch (props.action) {
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

  const tileDisabledFunc = (props: CalendarTileProperties): boolean => {
    if ( maxDate && props.date > maxDate) return true; 
    if ( minDate && props.date < minDate) return true;
    return false;
  }

  useEffect(()=> {
    setActiveStartDateState(() => props.state instanceof Date 
      ? new Date(props.state.getFullYear(), props.state.getMonth())
      : undefined
    );
  }, [props.state]);
  return (
    <>
      <div className={"calendarCard"}>
        <CalendarReact
          value={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
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
          selectRange={props.state2 ? true: false}
        />
      </div>
    </>
  )
}