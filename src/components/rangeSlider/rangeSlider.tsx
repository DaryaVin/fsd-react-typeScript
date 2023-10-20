import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "./rangeSlider.scss";


interface RangeSliderProps extends  React.HTMLAttributes<HTMLDivElement>{
  value: number | undefined | (number | undefined)[],
  onChangeValue: (val: number | number[]) => void,
  minValue?: number,
  maxValue?: number,
  initialValue?: number | number[],
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

  return (
    <>
      <div {...props} className={"rangeSlider" + (className? " " + className: "")} >
        <Slider key={"slider"}
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
