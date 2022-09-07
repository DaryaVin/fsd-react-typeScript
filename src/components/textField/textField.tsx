import React from "react";
import "./textField.scss";

interface TextFieldProps extends  React.HTMLAttributes<HTMLDivElement>{
  children:  JSX.Element | JSX.Element[],
  className?: string,
  disabled?: boolean,
}

export const TextField = ({children, className, disabled, ...props}: TextFieldProps) => {
  let newChildren = children;
  if (disabled) {
    if (Array.isArray(children)) {
      newChildren = children.map((child) => {
        return React.cloneElement(child, 
          {disabled: true}, 
          child.props.children
        );
      })
    } else {
      newChildren = React.cloneElement(children, 
        {disabled: true}, 
        children.props.children
      );
    }
  }
  return (<>
      <div 
        className={"textField" +  (className ? " " + className : "") + (disabled ? " textField_textField" : "")}
        {...props}
      >
        {newChildren}
      </div>
    </>);
}