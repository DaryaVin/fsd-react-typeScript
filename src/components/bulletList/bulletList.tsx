import React from "react";
import { CreateWrapElement, WrapElementContentType } from "../createWrapElement/createWrapElement";
import "./bulletList.scss";
import { BulletItem } from "../bulletItem/bulletItem";

interface BulletListProps extends React.HTMLAttributes<HTMLUListElement> {
  children: WrapElementContentType,
  withBorderBetweenBulletItems?: boolean,
}
export const BulletList = ({ children, withBorderBetweenBulletItems, ...props }: BulletListProps) => {
  let newClassName = "bulletList" 
  + (props.className ? " " + props.className : "")
  + (withBorderBetweenBulletItems ? " bulletList_withBorderBetweenBulletItems" : "")
  ;
  return (
      <ul {...props} className={newClassName}>
        {children}
      </ul>
  )
}
