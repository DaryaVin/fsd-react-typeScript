import React from 'react';
import "./bulletItem.scss";
import { FlexContainer } from '../flexContainer/flexContainer';
import { IconType } from 'react-icons/lib';

interface BulletItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode,
  explanation?: string,
  icon?: IconType,
}
export const BulletItem = ({ children, explanation, icon, ...props }: BulletItemProps) => {
  let newChildren = explanation
    ? <FlexContainer
      flexDirection='colomn'
      rowGap={5}
    >
      <div className='bulletItem__label'>
        {children}
        <p className="bulletItem__explanation">{explanation}</p>
      </div>
    </FlexContainer>
    : children;
  if (icon) {
    newChildren = <FlexContainer
      columnGap={10}
    >
      <div className='bulletItem__iconBox'>
        <svg className='bulletItem__iconGradient'>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset={0}/>
              <stop offset={"95%"}/>
            </linearGradient>
          </defs>
        </svg>
        {icon({ fill: "url(#gradient)", className: "bulletItem__icon" })}
      </div>
      <div className='bulletItem__info'>
        {newChildren}
      </div>
    </FlexContainer >
  }
  return <li
    {...props}
    className={"bulletItem"
      + (props.className ? " " + props.className : "")
      + (!!icon ? " bulletItem_withIcon" : "")
      + (!!explanation ? " bulletItem_withExplanation" : "")
    }
  >
    {newChildren}
  </li>;
}
