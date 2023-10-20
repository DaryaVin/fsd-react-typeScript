import React from 'react';
import "./mainBackgroundAnimation.scss";
import { WrapElementContentType } from '../createWrapElement/createWrapElement';

interface MainBackgroundAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: WrapElementContentType | WrapElementContentType[],
}
export const MainBackgroundAnimation = ({ children, ...props }: MainBackgroundAnimationProps) => {

  return (
    <div {...props}
      className={'mainBackgroundAnimation' + (props.className ? " " + props.className : "")}
    >
      {children}
    </div>
  )
}