import React from "react";
import "./dateMaskField.scss";
import { useDateState } from '../../hooks/useDateState';
import { emulateTab } from "emulate-tab";
import { LengthControlComponent } from "../lengthControlComponent/lengthControlComponent";
import { FlexContainer } from "../flexContainer/flexContainer";

// const getFullSet = (n: number) => {
//   return Array(n)
//     .fill(0)
//     .map((e, i, arr) => {
//       if ((i + 1) < 10) return "0" + (i + 1);
//       return i + 1;
//     }).join(" ");
// }

// const prependZerosFunc = (value: string, maxLength: number): string => {
//   for (let i = value.length; i < maxLength; i++) {
//     value = "0" + value;
//   }
//   return value;
// }

// const validateDateElement = (ElementsBetweenDatesStr: string) => {
//   const fn = (value: string) => {
//     const regex = RegExp('\\b' + value + '| \\b0' + value);
//     if (regex.test(ElementsBetweenDatesStr)) return value;
//     return value.slice(0, value.length - 1);
//   }
//   return fn;
// }

// const getElementsBetweenDates = (minDate: Date, maxDate: Date) => {
//   const oneDay = 1000 * 60 * 60 * 24;
//   const daysBetweenDates = (maxDate.getTime() - minDate.getTime()) / oneDay;
//   const fullSetDays = getFullSet(31);
//   const fullSetMonth = getFullSet(12);
//   let setDays = "";
//   let setMonths = "";
//   let setYears = "";

//   switch (daysBetweenDates) {
//     case 0 - 61: {
//       for (let currentDate = minDate.getTime();
//         currentDate <= maxDate.getTime();
//         currentDate += oneDay) {
//         let date = new Date();
//         date.setTime(currentDate);
//         setDays += " " + date.getDate();
//         setMonths += " " + (date.getMonth() + 1);
//         setYears += date.getFullYear() + "";
//       }
//       break;
//     }
//     case 62 - 364: {
//       for (let currentDate = minDate.getTime();
//         currentDate <= maxDate.getTime();
//         currentDate += oneDay * 30) {
//         let date = new Date();
//         date.setTime(currentDate);
//         setMonths += " " + (date.getMonth() + 1);
//         setYears += " " + date.getFullYear();
//       };
//       setDays = fullSetDays;
//       break;
//     }
//     default: {
//       for (let currentDate = minDate.getTime();
//         currentDate <= maxDate.getTime();
//         currentDate += oneDay * 365) {
//         let date = new Date();
//         date.setTime(currentDate);
//         setYears += date.getFullYear() + " ";
//       };
//       setDays = fullSetDays;
//       setMonths = fullSetMonth;
//       break;
//     }
//   }
//   return {
//     days: setDays,
//     months: setMonths,
//     years: setYears
//   }
// }

// const useDateState = (
//   state: Date | null,
//   setState: (date: Date | null) => void,
//   minDate?: Date | null,
//   maxDate?: Date | null,
//   ): {
//   day: {
//     stateDay: string,
//     setStateDay: (value: string) => void,
//     onChangeDay: (value: string) => string,
//   },
//   month: {
//     stateMonth: string,
//     setStateMonth: (value: string) => void,
//     onChangeMonth: (value: string) => string,
//   },
//   year: {
//     stateYear: string,
//     setStateYear: (value: string) => void,
//     onChangeYear: (value: string) => string,
//   }
// } => {
//   let [stateDay, setStateDay] = useState<string>(state ? prependZerosFunc(state.getDate().toString(), 2) : "");
//   let [stateMonth, setStateMonth] = useState<string>(state ? prependZerosFunc((state.getMonth() + 1).toString(), 2) : "");
//   let [stateYear, setStateYear] = useState<string>(state ? prependZerosFunc(state.getFullYear().toString(), 4) : "");

//   let onChangeDay= (value: string) => { return value };
//   let onChangeMonth = (value: string) => { return value };
//   let onChangeYear = (value: string) => { return value };

//   const fullSetDays = getFullSet(31);
//   const fullSetMonth = getFullSet(12);

//   if (minDate && maxDate) {
//     if (minDate > maxDate) {
//       [minDate, maxDate] = [maxDate, minDate];
//     }
//     const ElementsBetweenDates = getElementsBetweenDates(minDate, maxDate);
//     onChangeDay = validateDateElement(ElementsBetweenDates.days);
//     onChangeMonth = validateDateElement(ElementsBetweenDates.months);
//     onChangeYear = validateDateElement(ElementsBetweenDates.years);
//   }
//   if ((minDate && !maxDate) || ((!minDate && maxDate))) {
//     onChangeDay = validateDateElement(fullSetDays);
//     onChangeMonth = validateDateElement(fullSetMonth);
//     onChangeYear = (value: string) => {
//       let strToCompare = value;
//       for (let i = value.length; i < 4; i++) {
//         if (minDate) strToCompare += "9";
//         if (maxDate) strToCompare += "0";
//       }
//       let fullYear = minDate ? minDate.getFullYear() : 0;
//       fullYear = maxDate ? maxDate.getFullYear() : fullYear;

//       if ((minDate && (+strToCompare < fullYear)) || (maxDate && (+strToCompare > fullYear))) {
//         return value.slice(0, value.length - 1);
//       }
//       return value;
//     }
//   }
//   if (!maxDate && !minDate) {
//     onChangeDay = validateDateElement(fullSetDays);
//     onChangeMonth = validateDateElement(fullSetMonth);
//   }

//   useEffect(() => {
//     if (+stateMonth === 2) {
//       if (+stateDay >= 29) {
//         if (stateYear.length === 4) {
//           if (!(+stateYear % 4)) {
//             setStateDay(() => "29");
//           } else {
//             setStateDay(() => "28");
//           }
//         } else {
//           setStateDay(() => "29");
//         }
//       }
//     }
//     if ([4, 6, 9, 11].includes(+stateMonth) && +stateDay > 30) {
//       setStateDay(() => "30");
//     }
//     if (stateDay.length === 2 && stateMonth.length === 2 && stateYear.length === 4) {
//       const dateToCompare = new Date(+stateYear, +stateMonth - 1, +stateDay);
//       if (dateToCompare.getDate() === +stateDay
//         && dateToCompare.getMonth() === +stateMonth - 1
//         && dateToCompare.getFullYear() === +stateYear
//       ) {
//         if ((minDate && !maxDate && (dateToCompare < minDate))
//           || (maxDate && !minDate && (dateToCompare > maxDate))
//           || (maxDate && minDate && ((dateToCompare > maxDate) || (dateToCompare < minDate)))
//         ) {
//           alert("Нарушаны границы допустимой даты");
//           setStateYear(() => "");
//           setState(null);
//         } else {
//           setState(new Date(+stateYear, +stateMonth - 1, +stateDay))
//         }
//       }
//     } else {
//       setState(null);
//     }
//   }, [stateDay, stateMonth, stateYear]);
//   useEffect(() => {
//     setStateDay(state ? prependZerosFunc(state.getDate().toString(), 2) : stateDay);
//     setStateMonth(state ? prependZerosFunc((state.getMonth() + 1).toString(), 2) : stateMonth);
//     setStateYear(state ? prependZerosFunc(state.getFullYear().toString(), 4) : stateYear);
//   }, [state]);

//   return {
//     day: {
//       stateDay,
//       setStateDay,
//       onChangeDay,
//     },
//     month: {
//       stateMonth,
//       setStateMonth,
//       onChangeMonth,
//     },
//     year: {
//       stateYear,
//       setStateYear,
//       onChangeYear,
//     }
//   }
// }










interface dateMaskFieldWrapProps {
  setState: (v: string) => void,
  state: string,
  maxLength: number,
  placeholder: string,
  isTab: boolean,
  change: (v: string) => string,
}
const DateMaskFieldWrap: React.FC<dateMaskFieldWrapProps> = (props: dateMaskFieldWrapProps) => {
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
        onKeyDown={(e) => { if (e.code === "Enter") onBlurInput(e) }}
      />
    </LengthControlComponent>
  )
}

interface DateMaskFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state: Date | null,
  setState: (date: Date | null) => void,
  minDate?: Date | null,
  maxDate?: Date | null,
  className?: string,
}
export const DateMaskField = ({ minDate, maxDate, state, setState, className, ...props }: DateMaskFieldProps) => {
  if (minDate) minDate.setHours(0, 0, 0, 0);
  if (maxDate) maxDate.setHours(23, 59, 59, 999);

  const stateDate = useDateState(state, setState, minDate, maxDate);

  const onClickDateMaskField = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.target;
    if ((el instanceof HTMLElement) && el.nodeName !== "INPUT") {
      el.getElementsByTagName("input")[0].focus();
    }
  }

  return (
    <div className={"dateMaskField " + (!(stateDate.day.stateDay || stateDate.month.stateMonth || stateDate.year.stateYear) ? "empty " : "") + (className || "")} onClick={onClickDateMaskField}>
      <FlexContainer justifyContent="start">
        <DateMaskFieldWrap
          state={stateDate.day.stateDay}
          setState={stateDate.day.setStateDay}
          maxLength={2}
          placeholder="ДД"
          isTab
          change={stateDate.day.onChangeDay}>
        </DateMaskFieldWrap>.
        <DateMaskFieldWrap
          state={stateDate.month.stateMonth}
          setState={stateDate.month.setStateMonth}
          maxLength={2}
          placeholder="ММ"
          isTab
          change={stateDate.month.onChangeMonth}>
        </DateMaskFieldWrap>.
        <DateMaskFieldWrap
          state={stateDate.year.stateYear}
          setState={stateDate.year.setStateYear}
          maxLength={4}
          placeholder="ГГГГ"
          isTab={false}
          change={stateDate.year.onChangeYear}>
        </DateMaskFieldWrap>
      </FlexContainer>
    </div>
  )
}
