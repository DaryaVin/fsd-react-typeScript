import React from "react";
import { CreateWrapElement, WrapElementContentType } from "../../hooks and hocs/createWrapElement";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: WrapElementContentType,
  theme?: "withBorder" | "fillBcg" | "textOnly",
  className?: string,
}
export const Button = ({ theme = "textOnly", children, className, ...props }: ButtonProps) => {
  const newClassName = "button button_theme_" + theme
    + (className ? " " + className: "");
  return (
    <CreateWrapElement tagForWrap="button" {...props} className={newClassName}>
      {children}
    </CreateWrapElement>
  )
}
