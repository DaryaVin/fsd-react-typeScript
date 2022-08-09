import React from "react";
import "./radioButton.scss";

interface RadioButtonProps extends  React.InputHTMLAttributes<HTMLInputElement>{
  label?: string,
  children?:  React.ReactNode,
  explanation?: string,
  type?: "radio",
  className?: string,
}
export const RadioButton = ({label, explanation, className, children, ...props}: RadioButtonProps) => {
  return (
    <>
    <label className={"radioButton" + (className ? " " + className : "")}>
      <div className={"radioButton__field" + (props.checked ? " " + "radioButton__field_checked" : "")}>
        <input type={"radio"} className="radioButton__button" {...props}></input>
        <div className="radioButton__checkmark">
          <div className="radioButton__innerPoint"></div>
        </div>
      </div>
      <div className={"radioButton__label"}>
        {label}
        {children}
      </div>
    </label>
    </>
  )
}