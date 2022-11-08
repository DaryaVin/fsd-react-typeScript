import React from "react";
import { CreateWrapElement, WrapElementContentType } from "../../hooks and hocs/createWrapElement";
import "./textField.scss";
import "./card.scss";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: WrapElementContentType,
  className?: string,
  theme?: "text" | "card",
  disabled?: boolean,
}

export const Field = ({ children, className, theme = "text", disabled = false, ...props }: FieldProps) => {

  let newClassName = className ? className : "";
  let classNameChildren = "";
  if (theme === "text") {
    newClassName += " textField" + (disabled ? " textField_disabled" : "");
    classNameChildren = "textField__section";
  }
  if (theme === "card") {
    newClassName += " card" + (disabled ? " card_disabled" : "");
    classNameChildren = "card__section";
  }

  if (Array.isArray(children)) {
    return <div
      className={newClassName}
      {...props}
    >
      {children.map((child, index) => {
        return <CreateWrapElement
          className={classNameChildren}
          disabled={disabled}
          key={index}
        >
          {child}
        </CreateWrapElement>
      })}
    </div>
  } else {

    return <CreateWrapElement
      className={newClassName}
      disabled={disabled}
      {...props}
    >
      {children}
    </CreateWrapElement>
  }
}
