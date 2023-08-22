import React, { useEffect, useState } from "react";
import "./numberPicker.scss";

type NumberPickerProps = {
  state: number | null | undefined,
  setState: (val: number) => void,
  minValue?: number,
  maxValue?: number,
  step?: number,
  defaultValue?: number,
} & React.HTMLAttributes<HTMLDivElement>;
export const NumberPicker = ({ state, setState, minValue, maxValue, step = 1, defaultValue = 0, ...props }: NumberPickerProps) => {
  // const defaultValue = defaultValue !== undefined ? defaultValue : 0;
  // const step = step ? step : 1;
  const [min, max] = minValue !== undefined && maxValue !== undefined && minValue > maxValue
    ? [maxValue, minValue]
    : [minValue, maxValue];
  const onChangeValue = (val: number) => {
    if ((min !== undefined && max !== undefined && val >= min && val <= max)
      || (min !== undefined && max === undefined && val >= min)
      || (min === undefined && max !== undefined && val <= max)
      || (min === undefined && max === undefined)
    ) {
      setState(val);
    } else {
      if (min !== undefined && val < min) {
        setState(min);
      }
      if (max !== undefined && val > max) {
        setState(max);
      }
    }
  }
  let [number, setNumber] = useState<string>(state !== null && state !== undefined ? state.toString() : "");

  const onChengeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    setNumber(value);
    
  }
  const onBlurInputValue = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    const remainder = +value % step;
    if (isNaN(+value)) setState(defaultValue);
    if (remainder === 0) {
      onChangeValue(+value);
    } else {
      onChangeValue(+value - remainder);
    }
    setNumber(state !== null && state !== undefined ? state.toString() : "");
  }
  useEffect(() => {
    setNumber(state !== null && state !== undefined ? state.toString() : "");
  }, [state])
  return (
    <>
      <div {...props} className={"numberPicker" + (props.className ? " " + props.className : "")}>
        <button
          className="numberPicker__button numberPicker__minusButton"
          type="button"
          onClick={() => onChangeValue(state !== null && state !== undefined ? state - step : defaultValue)}
          disabled={(min !== undefined && state !== null && state !== undefined && (state <= min)) ? true : false}
        >
          -
        </button>
        <input
          type={"number"}
          onChange={onChengeInputValue}
          onBlur={onBlurInputValue}
          onKeyDown={(e) => { if (e.code === "Enter") onBlurInputValue(e) }}
          value={number}
          className={"numberPicker__number"}
          min={min}
          max={max}
          step={step}

        />
        <button
          className="numberPicker__button numberPicker__plusButton"
          type="button"
          onClick={() => onChangeValue(state !== null && state !== undefined ? state + step : defaultValue)}
          disabled={(max !== undefined && state !== null && state !== undefined && (state >= max)) ? true : false}
        >
          +
        </button>
      </div>
    </>
  )
}
