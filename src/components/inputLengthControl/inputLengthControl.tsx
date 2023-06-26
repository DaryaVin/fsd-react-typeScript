import React, { useState, useEffect } from 'react';
import "./inputLengthControl.scss"
import { LengthControlComponent } from '../lengthControlComponent/lengthControlComponent';

type InputLengthControlProps = {
  value: number | undefined,
  onChangeValue: (val: number) => void,
  minValue?: number,
  maxValue?: number,
  initialValue?: number,
} & React.HTMLAttributes<HTMLDivElement>;

export const InputLengthControl = ({ value, onChangeValue, minValue, maxValue, initialValue = 0,className = "", ...props }: InputLengthControlProps) => {
  const [state, setState] = useState<number | undefined>(value);

  useEffect(() => {
    setState(value)
  }, [value]);

  const onChangeAmountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\s/g, '');
    if (/^[0-9]+$/.test(newValue)) {
      if (maxValue) {
        if (maxValue.toString().length >= newValue.length) {
          setState(+newValue);
        }
      } else {
        setState(+newValue);
      }
    }
  }
  const onBlurAmountValue = () => {
    let newValue = state !== undefined ? state : initialValue;
    if (maxValue && maxValue < newValue) newValue = maxValue;
    if (minValue && minValue > newValue) newValue = minValue;
    onChangeValue(newValue);
  }

  return (
    <LengthControlComponent className={"inputLengthControl " + className} {...props}>
      <input
        type="text"
        value={state?.toLocaleString()}
        onChange={onChangeAmountValue}
        onBlur={onBlurAmountValue}
        onKeyDown={(e) => { if (e.code === "Enter") onBlurAmountValue() }}
      />
    </LengthControlComponent>
  )
}
