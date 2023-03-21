import React from 'react';
import { CreateWrapElement, WrapElementContentType } from '../createWrapElement/createWrapElement';
import "./flexContainer.scss";

enum justifyContentClass {
  "start" = "JCStart",
  "end" = ".JCEnd",
  "center" = "JCCenter",
  "stretch" = "JCStretch",
  "space-between" = "JCSpaceBetween",
  "space-around" = "JCSpaceAround",
  "space-evenly" = "JCSpaceEvenly",
}
enum justifyItemsClass {
  "start" = "JIStart",
  "end" = "JIEnd",
  "center" = "JICenter",
  "baseline" = "JIBaseline",
  "stretch" = "JIStretch",
  "auto" = "JIAuto",
}
enum alignItemsClass {
  "start" = "AIStart",
  "end" = "AIEnd",
  "center" = "AICenter",
  "baseline" = "AIBaseline",
  "stretch" = "AIStretch",
  "auto" = "AIAuto",
}
enum alignContentClass {
  "start" = "ACStart",
  "end" = ".ACEnd",
  "center" = "ACCenter",
  "stretch" = "ACStretch",
  "space-between" = "ACSpaceBetween",
  "space-around" = "ACSpaceAround",
  "space-evenly" = "ACSpaceEvenly",
}
enum flexDirectionClass {
  "row" = "FDRow",
  "colomn" = "FDColomn",
  "row-reverse" = "FDRowReverse",
  "colomn-reverse" = "FDColomnReverse",
}
enum flexWrapClass {
  "wrap" = "FWWrap",
  "nowrap" = "FWNoWrap",
  "wrap-reverse" = "FWWrapReverse",
}

export interface FlexContainerProps {
  children: WrapElementContentType,
  justifyItems?: "start" | "end" | "center" | "baseline" | "stretch" | "auto",
  justifyContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly",
  alignItems?: "start" | "end" | "center" | "baseline" | "stretch" | "auto",
  alignContent?: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly",
  flexDirection?: "row" | "colomn" | "row-reverse" | "colomn-reverse",
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse",
  rowGap?: number,
  columnGap?: number,
  tagForWrap?: string,
  [prop: string]: any
}
export const FlexContainer = ({
  children,
  justifyContent,
  justifyItems,
  alignItems,
  alignContent,
  flexDirection,
  flexWrap,
  rowGap,
  columnGap,
  tagForWrap = "div",
  ...props
}: FlexContainerProps) => {
  let newClassName = "";
  if (justifyContent) newClassName += " " + justifyContentClass[justifyContent];
  if (justifyItems) newClassName += " " + justifyItemsClass[justifyItems];
  if (alignContent) newClassName += " " + alignContentClass[alignContent];
  if (alignItems) newClassName += " " + alignItemsClass[alignItems];
  if (flexDirection) newClassName += " " + flexDirectionClass[flexDirection];
  if (flexWrap) newClassName += " " + flexWrapClass[flexWrap];
  if (props.className) newClassName += " " + props.className;
  return (
    <CreateWrapElement {...props} className={newClassName} tagForWrap={tagForWrap} style={{rowGap, columnGap}}>
      {children}
    </CreateWrapElement>
  )
}
