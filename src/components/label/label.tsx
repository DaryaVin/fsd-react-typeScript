import React from "react";
import "./label.scss";
import { FlexContainer } from "../flexContainer/flexContainer";

interface LabelProps {
  label:string,
  children: React.ReactChild,
  [key: string]: any,
}
 export const Label = ({label, children, ...props}: LabelProps) => {
  return (
    <label
    className="label"
    {...props}
    >
      <span className="label__text">{label}</span>
      {children}
    </label>
  )
}
