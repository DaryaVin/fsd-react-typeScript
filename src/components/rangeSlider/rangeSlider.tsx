import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "./rangeSlider.scss";
// import { LengthControlComponent } from "../lengthControlComponent/lengthControlComponent";


interface RangeSliderProps extends  React.HTMLAttributes<HTMLDivElement>{
  value: number | undefined | (number | undefined)[],
  onChangeValue: (val: number | number[]) => void,
  // label: string,
  minValue?: number,
  maxValue?: number,
  initialValue?: number | number[],
  // unit?: string,
}
export const RangeSlider = ({ value, onChangeValue, minValue, maxValue, initialValue = 0, className, ...props }: RangeSliderProps) => {
  const getNewState = (val: number | undefined | (number | undefined)[]): number | number[] => {
    if (val !== undefined && !Array.isArray(val)) return val;
    if (Array.isArray(val)) {
      return val.map((item, index) => {
        if (typeof item === "number") {
          return item
        } else {
          if (Array.isArray(initialValue)) {
            return initialValue[index];
          } else {
            if (minValue && index === 0) {
              return minValue
            }
            if (maxValue && index !== 0) {
              return maxValue
            }
            return initialValue;
          }
        }
      })
    }
    return initialValue;
  }
  let [state, setState] = useState<number | number[]>(getNewState(value));

  useEffect(() => {
    const newValue = getNewState(value);
    if (newValue !== value) {
      if (Array.isArray(value) && Array.isArray(newValue)) {
        let isIdentical = value.reduce((isIdentical, item, index) => {
          return isIdentical && item === newValue[index];
        }, true);
        if (!isIdentical) onChangeValue(newValue);
      } else {
        onChangeValue(newValue);
      }
    };
  })
  useEffect(() => {
    setState(getNewState(value));
  }, [value])
  // let [lowerValueState, setLowerValueState] = useState<number>(Array.isArray(state) ?
  //   state[0] :
  //   props.minValue ?
  //     props.minValue :
  //     0);
  // let [largerValueState, setLargerValueState] = useState<number>(Array.isArray(state) ? state[1] : state);

  // const onChangeSlider = (val: number | number[]) => {
  //   onChange(val);
  // }

  // const onChangeAmountValue = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<number>>) => {
  //   let value = e.target.value.replace(/\s/g, '');
  //   if (/^[0-9]+$/.test(value)) {
  //     if (props.maxValue && props.maxValue.toString().length >= value.length) {
  //       setState(+value);
  //     }
  //   }
  // }

  // const onBlurAmountValue = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>,
  //   setState: React.Dispatch<React.SetStateAction<number>>,
  //   index: number
  // ) => {
  //   const fullSetState = (lowerValue: number, largerValue: number): void => {
  //     if (lowerValue > largerValue) {
  //       setLargerValueState(lowerValue);
  //       setLowerValueState(largerValue);
  //       props.setState([largerValue, lowerValue]);
  //     } else {
  //       props.setState([lowerValue, largerValue]);
  //     }
  //   }

  //   let value = +e.currentTarget.value.replace(/\s/g, '');
  //   if (props.minValue && value < props.minValue) value = props.minValue;
  //   if (props.maxValue && value > props.maxValue) value = props.maxValue;
  //   setState(value);
  //   if (Array.isArray(state)) {
  //     let newValueArr = index === 0 ? [value, state[1]] : [state[0], value];
  //     fullSetState(newValueArr[0], newValueArr[1]);
  //   }
  // }

  // if (Array.isArray(state) && state[0] > state[1]) {
  //   props.setState([state[1], state[0]]);
  // }

  // if (Array.isArray(state) && props.minValue && state[0] < props.minValue) {
  //   props.setState([props.minValue, state[1]]);
  // }
  // if (Array.isArray(state) && props.maxValue && state[1] > props.maxValue) {
  //   props.setState([state[0], props.maxValue]);
  // }
  // useEffect(() => {
  //   if (Array.isArray(state)) {
  //     setLowerValueState(state[0]);
  //     setLargerValueState(state[1]);
  //   }
  // }, [props.state])
  return (
    <>
      <div className={"rangeSlider" + (className? " " + className: "")} {...props}>
        {/* <label className="rangeSlider__label">
          {props.label}
          <div className="rangeSlider__amount">
            <LengthControlComponent>
              <input type="text"
                className="rangeSlider__amountValue rangeSlider__lowerValue"
                value={lowerValueState.toLocaleString()}
                onChange={(e) => onChangeAmountValue(e, setLowerValueState)}
                onBlur={(e) => onBlurAmountValue(e, setLowerValueState, 0)}
                onKeyDown={(e) => { if (e.code === "Enter") onBlurAmountValue(e, setLowerValueState, 0) }}
              />
            </LengthControlComponent>
            {props.unit}-
            <LengthControlComponent>
              <input type="text"
                className="rangeSlider__amountValue rangeSlider__largerValue"
                value={largerValueState.toLocaleString()}
                onChange={(e) => onChangeAmountValue(e, setLargerValueState)}
                onBlur={(e) => onBlurAmountValue(e, setLargerValueState, 1)}
                onKeyDown={(e) => { if (e.code === "Enter") onBlurAmountValue(e, setLargerValueState, 1) }}
              />
            </LengthControlComponent>
            {props.unit}
          </div>
        </label> */}
        <Slider
          className="rangeSlider__slider"
          value={state}
          onChange={onChangeValue}
          count={1}
          range={true}
          min={minValue}
          max={maxValue}
        />
      </div>
    </>
  )
}
