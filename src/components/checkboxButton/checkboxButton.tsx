import React from "react";
import "./checkboxButton.scss";

interface CheckboxButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  // children?: null,
  children?: React.ReactNode,
  explanation?: string,
  theme?: "withExplanation",
  type?: "checkbox",
  className?: string,
}
export const CheckboxButton = ({ label, children, explanation, theme, className, ...props }: CheckboxButtonProps) => {

  return (
    <label key={"checkboxButton"}
      className={
        "checkboxButton"
        + (theme ? " checkboxButton_theme_" + theme : "")
        + (className ? " " + className : "")
      }
    >
      <div key={"field"} className="checkboxButton__field">
        <input type={"checkbox"} className="checkboxButton__button" {...props}></input>
        <div key={"checkmark"} className="checkboxButton__checkmark">
          <div key={"innerPoint"} className="checkboxButton__innerPoint"></div>
        </div>
      </div>
      <div key={"label"} className={"checkboxButton__label"}>
        {label && (label + " ")}
        {children}
        {
          theme === "withExplanation"
          && (<p key={"explanation"} className="checkboxButton__explanation">{explanation}</p>)
        }

      </div>
    </label>
  )
}
