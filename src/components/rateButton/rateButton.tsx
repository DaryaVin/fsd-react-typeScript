import React, { useState } from "react";
import "./rateButton.scss";
import {FaRegStar, FaStar} from "react-icons/fa";


interface RateButtonProps extends React.HTMLAttributes<HTMLUListElement> {
  state: 1 | 2 | 3 | 4 | 5 | null,
  setState: (raiting: 1 | 2 | 3 | 4 | 5 | null) => void;
  size?: number,
  className?: string,
}
export const RateButton = ({size = 24, state, setState, className, ...props}: RateButtonProps) => {
  let [hoverState, setHoverState] = useState<number | null>(null);
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    const isCrrectFormatValue = value === 1 || value === 2 || value === 3 || value === 4 || value === 5;
    if (isCrrectFormatValue) setState(value);
  }
  return (
      <ul {...props} className={className ? className +  " rateBox" : "rateBox"} >
        {[...Array(5)].map((item, index) => {
          const value = index + 1;
          return (
              <li className="rateButton__item" style={{width: size, height: size}} key={index}>
                <label 
                  onMouseEnter={() => setHoverState(value)}
                  onMouseLeave={() => setHoverState(null)}
                >
                  <input 
                    className="rateButton__radioButton"
                    type="radio" 
                    name="rateButton" 
                    value={value}
                    checked={state === index + 1 ? true : false}
                    onChange={onChange}
                  />
                  <svg width={size} height={size}>
                    <defs>
                      <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%" className="rateButton__svgGradient">
                        <stop offset="0%" stopColor="gray"/>
                        <stop offset="100%" stopColor="grey"/>
                      </linearGradient>
                    </defs>
                    { 
                      (state && !hoverState && value <= state) || (hoverState && value <=hoverState)
                      ? (
                        <FaStar 
                          className="rateButton__icon rateButton__icon_full" 
                          size={size} 
                          fill={"url(#grad1)"}
                        />
                      )
                      : (
                        <FaRegStar 
                          className="rateButton__icon rateButton__icon_empty"
                          size={size} 
                          fill={"url(#grad1)"}
                          onMouseEnter={() => setHoverState(value)}
                          onMouseLeave={() => setHoverState(null)}
                        />
                      )
                    }
                  </svg>
                </label>
              </li>
          )
        })}
      </ul>
  )
}