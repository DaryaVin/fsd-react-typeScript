import React, { Children, useEffect, useState } from "react";
import { CreateWrapElement, WrapElementContentType } from "../createWrapElement/createWrapElement";
import "./carousel.scss";

interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: WrapElementContentType | undefined,
  width: number,
  height: number,
  className?: string,
}
export const Carousel = ({ children, width, height, className, ...props }: CarouselProps) => {
  let [contentState, setContentState] = useState<JSX.Element[]>([]);
  let [currantItemState, setCurrantItemState] = useState<number>(0);

  useEffect(() => {
    if (children) {
      setContentState(
        Children.map(children, ((child) => {
          return <CreateWrapElement className="carousel__contentItem">
            {child}
          </CreateWrapElement>
        }))
      );
    } else {
      setContentState([
        <div className="carousel__contentItem">
          Изображение отсутствует
        </div>
      ])
    }
  }, [])
  const OnClickPrev = () => {
    setCurrantItemState(Math.max(currantItemState - 1, 0));
  }
  const onClickNext = () => {
    setCurrantItemState(Math.min(currantItemState + 1, contentState.length - 1));
  }
  return (
    <div
      {...props}
      className={className ? className + " carousel" : "carousel"}
      style={{
        width: width,
        height: height,
      }}
    >
      <div className="carousel__wrap">
        <div key={"carousel__contentContener"}
          className="carousel__contentContener"
          style={{
            transform: `translateX(${-(currantItemState * width)}px)`,
          }}
        >
          <CreateWrapElement style={{
            width: width,
            height: height,
          }}>
            {contentState}
          </CreateWrapElement>
        </div>
        <button key={"carousel__buttonPrev"} type="button" className="carousel__button carousel__buttonPrev" onClick={OnClickPrev}>&#60;</button>
        <button key={"carousel__buttonNext"} type="button" className="carousel__button carousel__buttonNext" onClick={onClickNext}>&#62;</button>
        {
          contentState.length <= 10 &&
          <ul key={"carousel__dotsList"} className="carousel__dotsList">
            {
              contentState.length > 1
                ? contentState.map((item, index) => {
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
                : ""
            }
          </ul>
        }
      </div>
    </div>
  )
}
