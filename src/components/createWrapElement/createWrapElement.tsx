import React from 'react';

export type WrapElementContentType = JSX.Element | number | string | (number | JSX.Element | string)[];
export const KEYWORD_CREATEWRAPELEMENT = "children.props.children";
interface CreateWrapElementProps {
  children: WrapElementContentType,
  className?: string,
  tagForWrap?: string,
  childrenContent?: (WrapElementContentType | "children.props.children")[],
  [prop: string]: any,
}
export const CreateWrapElement = ({ children, className = "", tagForWrap = "div", childrenContent, ...props }: CreateWrapElementProps) => {
  const replaceKeywordWithElement = (
    arrElements: WrapElementContentType[] | undefined,
    keyword: string,
    element: WrapElementContentType,
  ): WrapElementContentType[] | undefined => {
    const newElement = Array.isArray(element) ? element : [element];
    const newArrElement = Array.isArray(arrElements) ? [...arrElements] : arrElements;
    newArrElement && newArrElement.forEach((item, index) => {
      if (item === keyword) {
        newArrElement.splice(index, 1, ...newElement);
      }
    });
    return newArrElement;
  }

   if (!Array.isArray(children)
    && typeof children !== "string"
    && typeof children !== "number"
    && children.type !== Symbol.for('react.fragment')) {

    const newChildrenContent = replaceKeywordWithElement(childrenContent, KEYWORD_CREATEWRAPELEMENT, children.props.children);

    const newClassName = className + (children.props.className ? " " + children.props.className : "");

    return React.cloneElement(children,
      {
        className: newClassName,
        ...props
      },
      newChildrenContent || children.props.children
    );
  } else {
    const newChildrenContent = replaceKeywordWithElement(childrenContent, KEYWORD_CREATEWRAPELEMENT, children);
    return React.createElement(tagForWrap,
      {
        className: className,
        ...props
      },
      newChildrenContent || children
    );
  }
}
