import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import "./mainBackgroundAnimation.scss";
import { WrapElementContentType } from '../createWrapElement/createWrapElement';
interface MainBackgroundAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  // URLList: string[];
  // diplay?: number,
  children?: WrapElementContentType | WrapElementContentType[],
}
export const MainBackgroundAnimation = ({ children, ...props }: MainBackgroundAnimationProps) => {
  const animationWindowRef = useRef<HTMLDivElement | null>(null);
  const [indexCurrentURL, setIndexCurrentURL] = useState<number>(0);
  // useLayoutEffect(() => {
  //   // console.log("MainBackgroundAnimation indexCurrentURL", indexCurrentURL);
  //   let timer = setTimeout(onChangeURL, diplay);
  //   function onChangeURL() {
  //     if (animationWindowRef.current && URLList) {

  //       // console.log("MainBackgroundAnimation animationWindow.current", animationWindow.current);
  //       animationWindowRef.current.style.backgroundImage = `url("` + URLList[indexCurrentURL] + `")` ;
  //       setIndexCurrentURL((indexCurrentURL + 1) % URLList.length);
  //     }
  //     // timer = setTimeout(onChangeURL, diplay);
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   }
  // });

  return (
    <div {...props}
      // ref={animationWindowRef}
      className={'mainBackgroundAnimation' + (props.className ? " " + props.className : "")}
    >
      {children}
    </div>
  )
}