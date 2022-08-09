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
    <label className={"toggleButton" + (className ? " " + className : "")}>
      <div className={"toggleButton__field" + (props.checked ? " " + "toggleButton__field_checked" : "")}>
        <input type={"checkbox"} className="toggleButton__button" {...props}></input>
        <div className="toggleButton__checkmark"/>
      </div>
      <div className={"toggleButton__label"}>
        {label}
        {children}
      </div>
    </label>
    </>
  )
}