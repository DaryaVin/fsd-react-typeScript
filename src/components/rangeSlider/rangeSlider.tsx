import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "./rangeSlider.scss";
import { LengthControlComponent } from "../lengthControlComponent/lengthControlComponent";


interface RangeSliderProps {
  state: number | number[],
  setState:  React.Dispatch<React.SetStateAction<number | number[]>>,
  label: string,
  minValue?: number,
  maxValue?: number,
  unit?: string,
}
export const RangeSlider = (props:RangeSliderProps) => {
  let [lowerValueState, setLowerValueState] = useState<number>(Array.isArray(props.state) ? 
                                                                props.state[0] : 
                                                                props.minValue ? 
                                                                props.minValue : 
                                                                0);
  let [largerValueState, setLargerValueState] = useState<number>(Array.isArray(props.state)? props.state[1]: props.state);

  const onChangeSlider = (value: number | number[]) => {
    props.setState(value);
  }

  const onChangeAmountValue = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) => {
    let value = e.target.value.replace(/\s/g, '');
    if (/^[0-9]+$/.test(value)) {
      if (props.maxValue && props.maxValue.toString().length >= value.length) {
        setState(+value);
      }
    }
  }
  
  const onBlurAmountValue = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
                  setState: React.Dispatch<React.SetStateAction<number>>,
                  index: number
  ) => {
    const fullSetState = (lowerValue: number, largerValue: number):void => {
      if (lowerValue > largerValue) {
        setLargerValueState(lowerValue);
        setLowerValueState(largerValue);
        props.setState([largerValue, lowerValue]);
      } else {
        props.setState([lowerValue, largerValue]);
      }
    }

    let value = +e.currentTarget.value.replace(/\s/g, '');
    if (props.minValue && value < props.minValue) value = props.minValue;
    if (props.maxValue && value > props.maxValue) value = props.maxValue;
    setState(value);
    if (Array.isArray(props.state)) {
      let newValueArr =index === 0 ? [value, props.state[1]] : [props.state[0], value];
      fullSetState(newValueArr[0], newValueArr[1]);
    }
  }
  
  if (Array.isArray(props.state) && props.state[0] > props.state[1]) {
    props.setState([props.state[1], props.state[0]]);
  }

  if (Array.isArray(props.state) && props.minValue && props.state[0] < props.minValue) {
    props.setState([props.minValue, props.state[1]]);
  }
  if (Array.isArray(props.state) && props.maxValue && props.state[1] > props.maxValue) {
    props.setState([props.state[0], props.maxValue]);
  }
  useEffect(() => {
    if (Array.isArray(props.state)) {
      setLowerValueState(props.state[0]);
      setLargerValueState(props.state[1]);
    }
  }, [props.state])
  return (
    <>
      <div className="rangeSlider">
        <label className="rangeSlider__label">
          {props.label}
          <div className="rangeSlider__amount">
            <LengthControlComponent>
              <input type="text" 
                  className="rangeSlider__amountValue rangeSlider__lowerValue" 
                  value={lowerValueState.toLocaleString()}
                  onChange={(e) => onChangeAmountValue(e, setLowerValueState)}
                  onBlur={(e) => onBlurAmountValue(e, setLowerValueState, 0)}
                  onKeyDown={(e) => { if (e.code ==="Enter")  onBlurAmountValue(e, setLowerValueState, 0) }}
                />
            </LengthControlComponent>
            {props.unit}-
            <LengthControlComponent>
              <input type="text" 
                className="rangeSlider__amountValue rangeSlider__largerValue"
                value={largerValueState.toLocaleString()}
                onChange={(e) => onChangeAmountValue(e, setLargerValueState)}
                onBlur={(e) => onBlurAmountValue(e, setLargerValueState, 1)}
                onKeyDown={(e) => { if (e.code ==="Enter")   onBlurAmountValue(e, setLargerValueState, 1) }}
              />
            </LengthControlComponent>
            {props.unit}
          </div>
        </label>
        <Slider 
          className="rangeSlider__slider" 
          value={props.state} 
          onChange={onChangeSlider} 
          count={1} 
          range={true}
          min={props.minValue}
          max={props.maxValue}
        />
      </div>
    </>
  )
}