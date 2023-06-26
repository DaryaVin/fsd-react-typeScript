import React from "react";
import "./dateMaskField.scss";
import { useDateState } from '../../hooks/useDateState';
import { emulateTab } from "emulate-tab";
import { LengthControlComponent } from "../lengthControlComponent/lengthControlComponent";
import { FlexContainer } from "../flexContainer/flexContainer";

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

interface DateMaskFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  state: Date | null | undefined,
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
    <div {...props} className={"dateMaskField " + (!(stateDate.day.stateDay || stateDate.month.stateMonth || stateDate.year.stateYear) ? "empty " : "") + (className || "")} onClick={onClickDateMaskField}>
      <FlexContainer justifyContent="start">
        <DateMaskFieldWrap
          key={"day"}
          state={stateDate.day.stateDay}
          setState={stateDate.day.setStateDay}
          maxLength={2}
          placeholder="ДД"
          isTab
          change={stateDate.day.onChangeDay}>
        </DateMaskFieldWrap>.
        <DateMaskFieldWrap
          key={"month"}
          state={stateDate.month.stateMonth}
          setState={stateDate.month.setStateMonth}
          maxLength={2}
          placeholder="ММ"
          isTab
          change={stateDate.month.onChangeMonth}>
        </DateMaskFieldWrap>.
        <DateMaskFieldWrap
          key={"year"}
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
