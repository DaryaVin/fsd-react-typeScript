import React, { ReactChild, ReactChildren } from "react";
import "./card.scss";

interface CardProps {
  children: ReactChildren | ReactChild | ReactChild[],
  className?: string,
  props?: React.HTMLAttributes<HTMLDivElement>,
  // onClick?: (e: React.MouseEvent<HTMLElement>) => void,
}

export const Card = ({children, className, props}: CardProps) => {
  return (<>
      <div 
        className={"card" +  (className ? " " + className : "")}
        {...props}
      >
        {children}
      </div>
    </>);
}