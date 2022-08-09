import React from "react";
import "./checkboxButton.scss";

interface CheckboxButtonProps extends  React.InputHTMLAttributes<HTMLInputElement>{
  label?: string,
  // children?: null,
  children?:  React.ReactNode,
  explanation?: string,
  theme?: "withExplanation",
  type?: "checkbox",
  className?: string,
}
export const CheckboxButton = ({label, children, explanation, theme, className, ...props}: CheckboxButtonProps) => {

  return (
    <label className={"checkboxButton" + (theme ? " checkboxButton_theme_" + theme  : "") + (className ? " " + className : "")}>
      <div className="checkboxButton__field">
        <input type={"checkbox"} className="checkboxButton__button" {...props}></input>
        <div className="checkboxButton__checkmark">
          <div className="checkboxButton__innerPoint"></div>
        </div>
      </div>
      <div className={"checkboxButton__label"}>
        {label + " "} 
        {children}
        {
          theme === "withExplanation" 
          && (<p className="checkboxButton__explanation">{explanation}</p>)
        }
        
      </div>
    </label>
  )
}