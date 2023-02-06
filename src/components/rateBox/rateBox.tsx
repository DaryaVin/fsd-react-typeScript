import React from "react";
import "./rateBox.scss";
import {FaRegStar, FaStar} from "react-icons/fa";


interface RateBoxProps {
  rating: number,
  size?: number,
  className?: string,
}
export const RateBox = ({size = 24, rating, className}: RateBoxProps) => {
  return (
    <>
      <ul className={className ? className +  " rateBox" : "rateBox"}>
        {[...Array(5)].map((item, index) => {
          const width = (rating - index) >= 1 ? size : (rating - index) > 0 ?  (rating - index) * size : 0;

          return (
              <li className="rateBox__item" style={{width: size, height: size}} key={index}>
                <div className="rateBox__wrap" style={{height: size, width: width}}>
                  <svg width={size} height={size}>
                    <defs>
                      <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%" className="rateBox__svgGradient">
                        <stop offset="0%" stopColor="gray"/>
                        <stop offset="100%" stopColor="grey"/>
                      </linearGradient>
                    </defs>
                    <FaStar
                      className="rateBox__icon rateBox__icon_full"
                      size={size}
                      fill={"url(#grad1)"}
                    />
                   </svg>
                </div>
                <div className="rateBox__wrap">
                   <svg width={size} height={size}>
                    <defs>
                      <linearGradient id="grad1" x1="50%" y1="0%" x2="50%" y2="100%" className="rateBox__svgGradient">
                        <stop offset="0%" stopColor="gray"/>
                        <stop offset="100%" stopColor="grey"/>
                      </linearGradient>
                    </defs>
                    <FaRegStar
                      className="rateBox__icon rateBox__icon_empty"
                      size={size}
                      fill={"url(#grad1)"}
                    />
                   </svg>
                </div>
              </li>
          )
        })}
      </ul>
    </>
  )
}
