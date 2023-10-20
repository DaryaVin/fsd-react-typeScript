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
    <label key={"radioButton"} className={"radioButton" + (className ? " " + className : "")}>
      <div key={"field"} className={"radioButton__field" + (props.checked ? " " + "radioButton__field_checked" : "")}>
        <input key={"input"} type={"radio"} className="radioButton__button" {...props}></input>
        <div key={"checkmark"} className="radioButton__checkmark">
          <div key={"innerPoint"} className="radioButton__innerPoint"></div>
        </div>
      </div>
      <div key={"label"} className={"radioButton__label"}>
        {label}
        {children}
      </div>
    </label>
    </>
  )
}
