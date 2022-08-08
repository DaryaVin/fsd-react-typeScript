import React from "react";
import "./button.scss";

interface ButtonProps{
  children: JSX.Element,
  theme?: "withBorder" | "fillBcg" | "textOnly",
  className?: string,
} 
export const Button = ({theme = "textOnly", children, className}:ButtonProps) => {
  let newClassName = "button button_theme_" + theme;
  if (children.props.className) newClassName += " " + children.props.className;
  if (className) newClassName += " " + className;
  return (
    <>
      {React.cloneElement(children, {className: newClassName}, children.props.children)}
    </>
  )
}