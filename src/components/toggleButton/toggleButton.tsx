import React from "react";
import "./toggleButton.scss";

interface ToggleButtonProps extends  React.InputHTMLAttributes<HTMLInputElement>{
  label?: string,
  children?:  React.ReactNode,
  type?: "checkbox",
  className?: string,
}
export const ToggleButton = ({label, className, children, ...props}: ToggleButtonProps) => {
  return (
    <>
    <label key={"toggleButton"} className={"toggleButton" + (className ? " " + className : "")}>
      <div key={"field"} className={"toggleButton__field" + (props.checked ? " " + "toggleButton__field_checked" : "")}>
        <input key={"input"} type={"checkbox"} className="toggleButton__button" {...props}></input>
        <div key={"checkmark"} className="toggleButton__checkmark"/>
      </div>
      <div key={"label"} className={"toggleButton__label"}>
        {label}
        {children}
      </div>
    </label>
    </>
  )
}