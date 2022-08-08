import React, {  useEffect, useState } from "react";
import "./dateMaskField.scss";
import { emulateTab } from "emulate-tab";
import { LengthControlComponent } from "../lengthControlComponent/lengthControlComponent";

type DateChange = (v:string) => string;
interface dateMaskFieldWrapProps {
  setState: (value: string) => void,
  state: string,
  maxLength: number, 
  placeholder: string, 
  isTab: boolean,
  change: DateChange
}
const DateMaskFieldWrap:React.FC<dateMaskFieldWrapProps> = (props:dateMaskFieldWrapProps) => {
  const correctFormat = (newValue: string): string => {
    if (!newValue) return "";
    if (newValue.length < props.maxLength) {
      if (newValue === "0") {
        newValue = "";
      } else {
        for (let i = newValue.length; i < props.maxLength; i++) {
          newValue = "0" + newValue;
        }
      }
    }
    return newValue;
  }
  
  const onBlurInput = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    props.setState(correctFormat(e.currentTarget.value));
  }
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    if (!value) props.setState("");
    if (/^[0-9]+$/.test(value)) {
      let newValue = props.change(value);
      if (e.target.value.length >= props.maxLength) {
        newValue = correctFormat(newValue);
        if (props.isTab) emulateTab();
      }
      props.setState(newValue);
    }
  }
  return (
    <LengthControlComponent>
       <input 
        type={"text"} 
        maxLength={props.maxLength} 
        placeholder={props.placeholder}
        className="dateMaskField__dateElement"
        onChange={onChangeInput}
        value={props.state}
        onBlur={onBlurInput}
        onKeyDown={(e) => {if (e.code === "Enter") onBlurInput(e)}}
      />
    </LengthControlComponent>
  )
}

interface DateMaskFieldProps {
  state: Date | null,
  setState: React.Dispatch<React.SetStateAction<Date | null>>
  minDate?: Date | null, 
  maxDate?: Date | null,
}
export const DateMaskField = (props:DateMaskFieldProps) => {
  let minDate = props.minDate? props.minDate : null;
  let maxDate = props.maxDate? props.maxDate : null;
  if (minDate) minDate.setHours(0, 0, 0, 0);
  if (maxDate) maxDate.setHours(23, 59, 59, 999);
  
  const stateFormatFunc = (value: string, maxLength: number): string => {
    for (let i = value.length; i < maxLength; i++) {
      value = "0" + value;
    } 
    return value;
  }

  let [stateDay, setStateDay] = useState(props.state ? stateFormatFunc(props.state.getDate().toString(), 2): "");
  let [stateMonth, setStateMonth] = useState(props.state ? stateFormatFunc((props.state.getMonth() + 1).toString(), 2): "");
  let [stateYear, setStateYear] = useState(props.state ? stateFormatFunc(props.state.getFullYear().toString(), 4): "");
  
  let onChangeDay:DateChange = (value: string) => {return value};
  let onChangeMonth: DateChange = (value: string) => {return value};
  let onChangeYear: DateChange = (value: string) => {return value};

  const getFullSet = (n:number) => {
    return Array(n)
            .fill(0)
            .map((e, i, arr) => {
              if ((i + 1) < 10) return "0" + (i+1);
              return i+1;
              } ).join(" ");
  }
  const fullSetDays = getFullSet(31);
  const fullSetMonth = getFullSet(12);

  interface elementsBetweenDates {
    days: string,
    months: string,
    years: string,
  }
  const getElementsBetweenDates =  (minDate: Date, maxDate: Date): elementsBetweenDates => {
    const oneDay = 1000 * 60 * 60 * 24;
    const daysBetweenDates = (maxDate.getTime() - minDate.getTime()) / oneDay;
    let setDays = "";
    let setMonths = "";
    let setYears = "";
  
    switch (daysBetweenDates) {
      case 0-61: {
        for (let currentDate = minDate.getTime();
             currentDate <= maxDate.getTime();
             currentDate += oneDay) {
          let date = new Date();
          date.setTime(currentDate);
          setDays += " " + date.getDate();
          setMonths += " " + (date.getMonth() + 1);
          setYears += date.getFullYear() + "";
        }
        break;
      }
      case 62-364: {
        for (let currentDate = minDate.getTime();
             currentDate <= maxDate.getTime();
             currentDate += oneDay*30) {
          let date = new Date();
          date.setTime(currentDate);
          setMonths += " " + (date.getMonth() + 1);
          setYears += " " + date.getFullYear();
        };
        setDays = fullSetDays;
        break;
      }
      default: {
        for (let currentDate = minDate.getTime();
             currentDate <= maxDate.getTime();
             currentDate += oneDay*365) {
          let date = new Date();
          date.setTime(currentDate);
          setYears += date.getFullYear() + " ";
        };
        setDays = fullSetDays;
        setMonths = fullSetMonth;
        break;
      }
    }
    return { 
      days: setDays, 
      months: setMonths, 
      years: setYears
    }
  }
  
  const onChangeFunc = (ElementsBetweenDatesStr: string): DateChange => {
    const fn = (value: string) => {
      const regex = RegExp('\\b' + value + '| \\b0' + value); 
      if (regex.test(ElementsBetweenDatesStr)) return value;
      return value.slice(0, value.length - 1);
    }
    return fn;
  }

  const onClickDateMaskField = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.target;
    if ((el instanceof HTMLElement) && el.nodeName !== "INPUT") {
      el.getElementsByTagName("input")[0].focus();
    }
  }

  if (minDate && maxDate) {
    if (minDate > maxDate) {
      [minDate, maxDate] = [maxDate, minDate]; 
    }
    const ElementsBetweenDates = getElementsBetweenDates(minDate, maxDate);
    onChangeDay = onChangeFunc(ElementsBetweenDates.days);
    onChangeMonth = onChangeFunc(ElementsBetweenDates.months);
    onChangeYear = onChangeFunc(ElementsBetweenDates.years);
  }
  if ((minDate && !maxDate) || ((!minDate && maxDate))) {
    onChangeDay = onChangeFunc(fullSetDays);
    onChangeMonth = onChangeFunc(fullSetMonth);
    onChangeYear = (value: string) => {
      let strToCompare = value;
      for (let i = value.length; i < 4; i++) {
        if (minDate) strToCompare += "9";
        if (maxDate)  strToCompare += "0";
      }
      let fullYear = minDate? minDate.getFullYear(): 0;
      fullYear = maxDate? maxDate.getFullYear(): fullYear;
      
      if ((minDate && (+strToCompare < fullYear)) || (maxDate && (+strToCompare > fullYear))) {
        return value.slice(0, value.length - 1);
      }
      return value;
    }
  }
  if (!maxDate && !minDate) {
    onChangeDay = onChangeFunc(fullSetDays);
    onChangeMonth = onChangeFunc(fullSetMonth);
  }

  useEffect(() => {
    if (+stateMonth === 2){ 
      if (+stateDay >= 29) {
        if(stateYear.length === 4) {
          if (!(+stateYear % 4))  {
            setStateDay(() => "29")
            
          } else {
            setStateDay(() => "28")
          }
        } else {
          setStateDay(() => "29");
        }    
      }
    }
    if ([4, 6, 9, 11].includes(+stateMonth) && +stateDay > 30) {
      setStateDay(() => "30");
    }
    if (stateDay.length === 2 && stateMonth.length === 2 && stateYear.length === 4) {
      const dateToCompare = new Date(+stateYear, +stateMonth-1, +stateDay);
      if (dateToCompare.getDate() === +stateDay 
        && dateToCompare.getMonth() === +stateMonth-1 
        && dateToCompare.getFullYear() === +stateYear 
      ) {
        if ((minDate && !maxDate && (dateToCompare < minDate)) 
          || (maxDate && !minDate && (dateToCompare > maxDate))
          || (maxDate && minDate && ((dateToCompare > maxDate) || (dateToCompare < minDate)))
        ) {
          alert("Нарушаны границы допустимой даты");
          setStateYear(() => "");
          props.setState(null);
        } else {
          props.setState(new Date(+stateYear, +stateMonth - 1, +stateDay))
        }
      }       
    } else { 
      props.setState(null);
    }    
  }, [stateDay, stateMonth, stateYear]);
  useEffect (() => {
    setStateDay(props.state ? stateFormatFunc(props.state.getDate().toString(), 2): stateDay);
    setStateMonth(props.state ? stateFormatFunc((props.state.getMonth() + 1).toString(), 2): stateMonth);
    setStateYear(props.state ? stateFormatFunc(props.state.getFullYear().toString(), 4): stateYear);
  }, [props.state]);
  
  return (
      <div className={"dateMaskField " + (!(stateDay || stateMonth || stateYear) ? "empty" : "")} onClick={onClickDateMaskField}>
        <div>
          <DateMaskFieldWrap 
            state={stateDay} 
            setState={setStateDay} 
            maxLength={2} 
            placeholder="ДД" 
            isTab 
            change={onChangeDay}>
          </DateMaskFieldWrap>.
          <DateMaskFieldWrap 
            state={stateMonth} 
            setState={setStateMonth} 
            maxLength={2} 
            placeholder="ММ" 
            isTab 
            change={onChangeMonth}>
          </DateMaskFieldWrap>.
          <DateMaskFieldWrap 
            state={stateYear} 
            setState={setStateYear} 
            maxLength={4} 
            placeholder="ГГГГ" 
            isTab={false} 
            change={onChangeYear}>
          </DateMaskFieldWrap>
        </div>
      </div>
  )
}