import React from "react";
import { CreateWrapElement } from "../createWrapElement/createWrapElement";
import "./lengthControlComponent.scss";

interface LengthControlComponentProps {
  children: JSX.Element,
}
export const LengthControlComponent = (props: LengthControlComponentProps) => {
  const children = props.children;
  const DefinitionValueFunc = (children: JSX.Element): string => {
    let val = "";
    if (children.type === "input" || children.props.value) {
      val = children.props.value !== "" ? children.props.value : children.props.placeholder;
    } else {
      if (children.props.children) {
        if (Array.isArray(children.props.children)) {
          val = DefinitionValueFunc(children.props.children[0]);
        } else {
          if (children.props.children.type) {
            val = DefinitionValueFunc(children.props.children);
          }
          if (typeof children.props.children === "string") {
            val = children.props.children;
          }
        }
      }
    }
    return val;
  }
  let lengthDefinitionElementValue = DefinitionValueFunc(children);
  return (
    <>
      <span className="lengthControlComponent">
        <span className="lengthControlComponent__lengthDefinitionElement">
          {lengthDefinitionElementValue}
        </span>
        <CreateWrapElement tagForWrap="input" className="lengthControlComponent__mainElement">
          {children}
        </CreateWrapElement>
      </span>
    </>
  )
}
