import React from "react";
import { CreateWrapElement, WrapElementContentType } from "../createWrapElement/createWrapElement";
import "./bulletList.scss";

interface BulletListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: WrapElementContentType,
}
export const BulletList = ({ children, ...props }: BulletListProps) => {
  const newChildren = Array.isArray(children)
    ? children.map((item, index) => {
      if (typeof item !== "string" && typeof item !== "number" && item.type !== "li") {
        return <li key={index} className="bulletList__item">
          {item}
        </li>
      };

      return <CreateWrapElement key={index} className="bulletList__item" tagForWrap="li">
        {item}
      </CreateWrapElement>;
    })
    : typeof children !== "string" && typeof children !== "number" && children.type !== "li"
      ? <li className="bulletList__item">
        {children}
      </li>
      : <CreateWrapElement className="bulletList__item" tagForWrap="li">
        {children}
      </CreateWrapElement>;

  let newClassName = "bulletList" + (props.className ? " " + props.className : "");
  return (
      <ul {...props} className={newClassName}>{newChildren}</ul>
  )
}
