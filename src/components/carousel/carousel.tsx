import React, { Children, useEffect, useState } from "react";
import { CreateWrapElement, WrapElementContentType } from "../../hooks and hocs/createWrapElement";
import "./carousel.scss";

interface CarouselProps {
  children: WrapElementContentType,
  width: number,
  height: number,
  className?: string,
}
export const Carousel = ({ children, width, height, className }: CarouselProps) => {
  let [contentState, setContentState] = useState<JSX.Element[]>([]);
  let [currantItemState, setCurrantItemState] = useState<number>(0);
  useEffect(() => {
    setContentState(
      Children.map(children, (child => {
        return <CreateWrapElement className="carousel__contentItem">
          {child}
        </CreateWrapElement>
      }))
    );
  }, [])
  const OnClickPrev = () => {
    setCurrantItemState(Math.max(currantItemState - 1, 0));
  }
  const onClickNext = () => {
    setCurrantItemState(Math.min(currantItemState + 1, contentState.length - 1));
  }
  return (
    <div
      className={className ? className + " carousel" : "carousel"}
      style={{
        width: width,
        height: height,
      }}
    >
      <div className="carousel__wrap">
        <div
          className="carousel__contentContener"
          style={{
            transform: `translateX(${-(currantItemState * width)}px)`,
          }}
        >
          {contentState}
        </div>
        <button type="button" className="carousel__button carousel__buttonPrev" onClick={OnClickPrev}>&#60;</button>
        <button type="button" className="carousel__button carousel__buttonNext" onClick={onClickNext}>&#62;</button>
        {
          contentState.length <= 10 &&
          <ul className="carousel__dotsList">
            {
              contentState.map((item, index) => {
                return (
                  <li
                    tabIndex={0}
                    onClick={() => { setCurrantItemState(index) }}
                    onKeyDown={(e) => { if (e.code === "Enter") setCurrantItemState(index) }}
                    key={index}
                    className={
                      index === currantItemState
                        ? "carousel__dotsItem carousel__dotsItem_current"
                        : "carousel__dotsItem"
                    }
                  >
                  </li>
                )
              })
            }
          </ul>
        }
      </div>
    </div>
  )
}
