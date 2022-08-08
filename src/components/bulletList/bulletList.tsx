import React from "react";
import "./bulletList.scss";

interface BulletListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: JSX.Element[],
}
export const BulletList = ({children, ...props}: BulletListProps) => {
  const chengeChildFunc = (element: JSX.Element): JSX.Element => {
    if (element.type !== Symbol.for('react.fragment')) {
      
      return React.cloneElement(element , {className: element.props.className + " bulletList__item"}, element.props.children);
    } else {
      return React.createElement("li", {className: " bulletList__item"}, element.props.children);
    }
  }
  const newChildren = Array.isArray(children) 
                      ? children.map((item) => chengeChildFunc(item)) 
                      : children && chengeChildFunc(children);
  // console.log(newChildren);
  
  let newClassName = "bulletList";
  if (props.className) newClassName += " " + props.className;
  return (
    <>
    <ul {...props} className={newClassName}>{newChildren}</ul>
    </>
  )
}