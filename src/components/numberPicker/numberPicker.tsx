import React, { useEffect, useState } from "react";
import "./numberPicker.scss";

interface NumberPickerProps {
  state: number | null,
  setState: React.Dispatch<React.SetStateAction<number>>,
  minValue?: number,
  maxValue?: number,
  step?: number,
  defaultValue?: number,
}
export const NumberPicker = (props: NumberPickerProps) => {
  const defaultValue = props.defaultValue !== undefined ? props.defaultValue : 0;
  const step = props.step ? props.step : 1;
  const [min, max] = props.minValue !== undefined && props.maxValue !== undefined && props.minValue > props.maxValue 
                      ? [props.maxValue, props.minValue] 
                      : [props.minValue, props.maxValue];
  const onChangeValue = (val: number) => {
    if ( (min !== undefined && max !== undefined && val >= min && val <= max)
      || (min !== undefined && max === undefined && val >= min)
      || (min === undefined && max !== undefined && val <= max)
      || (min === undefined && max === undefined)
    ) {
      props.setState(val);
    } else {
      if (min !== undefined && val < min) { 
        props.setState(min);
      }
      if (max !== undefined && val > max) {
        props.setState(max);
      }
    }
  }
  let [state, setState] = useState<string>(props.state!== null ? props.state.toString() : "");

  const onChengeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
      setState(value);
  }
  const onBlurInputValue = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    const remainder = +value % step;
    if (isNaN(+value)) props.setState(defaultValue);
    if (remainder === 0) {
      onChangeValue(+value);
    } else {
      onChangeValue(+value - remainder);
    }
    setState(props.state!== null ? props.state.toString() : "");
  }
  useEffect(() => {
    setState(props.state!== null ? props.state.toString() : "");
  }, [props.state])
  return (
    <>
    <div className="numberPicker">
      <button 
        className="numberPicker__button numberPicker__minusButton" 
        type="button" 
        onClick={() => onChangeValue(props.state !== null ?  props.state - step : defaultValue)} 
        disabled={(min !== undefined && props.state !== null && (props.state <= min)) ? true : false }
      >
        -
      </button>
      <input 
        type={"number"} 
        onChange={onChengeInputValue}
        onBlur={onBlurInputValue}
        onKeyDown={(e) => {if (e.code === "Enter") onBlurInputValue(e)}}
        value={state} 
        className={"numberPicker__number"}
        min={min}
        max={max}
        step={step}

      />
      <button 
        className="numberPicker__button numberPicker__plusButton" 
        type="button" 
        onClick={() => onChangeValue(props.state !== null ?  props.state + step : defaultValue)}
        disabled={(max !== undefined && props.state !== null && (props.state >= max)) ? true : false }
      >
        +
      </button>
    </div>
    </>
  )
}