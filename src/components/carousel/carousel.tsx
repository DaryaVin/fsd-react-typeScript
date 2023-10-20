import React, { Children, useEffect, useState, useRef, useMemo, useLayoutEffect } from "react";
import "./carousel.scss";
import { CreateWrapElement, WrapElementContentType } from "../createWrapElement/createWrapElement";

interface CarouselProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: WrapElementContentType | undefined,
  width?: number,
  height?: number,
  className?: string,
  theme?: "small" | "big",
  withDotList?: boolean,
}
export const Carousel = ({ children, width, height, className, theme = "small", withDotList, ...props }: CarouselProps) => {
  let [themeState, setThemeState] = useState<"big" | "small">(theme);
  let [widthState, setWidthState] = useState<number>(width ? width : 0);
  let [heightState, setHeightState] = useState<number>(height ? height : 0);
  let [currentItemState, setCurrentItemState] = useState<number>(0);
  let [translayteState, setTranslayteState] = useState<number>(0);
  let [positionСhangeСounterState, setPositionСhangeСounterState] =
    useState<{
      counter: number,
      direction: "prev" | "next"
    }>
      ({
        counter: 0,
        direction: "next"
      });

  let items = useMemo(() => {
    let newItems = [];
    if (children) {
      newItems = Children.map(children, ((child, index) => {
        return <CreateWrapElement key={index} className={"carousel__contentItem"}>
          {child}
        </CreateWrapElement>
      }))
      if (newItems.length > 2 || (themeState !== "big" && newItems.length > 1)) {
        setCurrentItemState(2);
        setTranslayteState(2);
        return [
          <CreateWrapElement key={newItems.length + 1} >
            {newItems[newItems.length - 2]}
          </CreateWrapElement>,
          <CreateWrapElement key={newItems.length} >
            {newItems[newItems.length - 1]}
          </CreateWrapElement>,
          ...newItems,
          <CreateWrapElement key={newItems.length + 2} >
            {newItems[0]}
          </CreateWrapElement>,
          <CreateWrapElement key={newItems.length + 3} >
            {newItems[1]}
          </CreateWrapElement>,
        ]
      } else {
        return newItems
      }

    } else {
      newItems = [<div className="carousel__contentItem">
        Изображение отсутствует
      </div>]
    }
    return newItems;
  }, [children]);

  const newClassName = "carousel"
    + ` carousel_theme_${themeState}`
    + (className ? " " + className : "")
    + ((themeState === "big" && items.length === 1 ? " carousel_bigWithOneItem" : ""))
    + ((themeState === "big" && items.length === 2 ? " carousel_bigWithTwoItem" : ""))
    ;

  const isMovable: boolean = (themeState !== "big" && items.length > 1) || items.length > 2;
  const style: {
    width?: number,
    height?: number,
  } = {};
  if (width) style.width = width;
  if (height) style.height = height;


  const carouselRef = useRef<HTMLDivElement | null>(null);
  const contentContenerRef = useRef<HTMLDivElement | null>(null);
  const buttonPrevRef = useRef<HTMLButtonElement | null>(null);
  const buttonNextRef = useRef<HTMLButtonElement | null>(null);
  const refTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current?.clientWidth && carouselRef.current.clientWidth < 768 && theme === "big") {
        setThemeState("small");
        if (contentContenerRef.current) {
          contentContenerRef.current.style.transform = `translateX(${-translayteState * contentContenerRef.current.clientWidth}px)`;
          contentContenerRef.current.children[currentItemState].setAttribute("style", "");
        }

      }
      if (carouselRef.current?.clientWidth && carouselRef.current.clientWidth > 768 && theme === "big") {
        setThemeState("big");
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      if (refTimer.current !== null) {
        clearTimeout(refTimer.current);
      }
    };
  }, []);
  useEffect(() => {
    if (contentContenerRef.current && themeState === "small") {
      contentContenerRef.current.style.transform =
        `translateX(${-translayteState * contentContenerRef.current.clientWidth}px)`;
      contentContenerRef.current.children[currentItemState].setAttribute("style", "");
    }
  }, [themeState])

  useEffect(() => {
    if (contentContenerRef.current?.clientHeight) {
      setHeightState(height ? height : contentContenerRef.current.clientHeight);
    }
  }, [contentContenerRef.current?.clientHeight, height]);
  useEffect(() => {
    if (contentContenerRef.current?.clientWidth) {
      setWidthState(width ? width : contentContenerRef.current.clientWidth);
    }
  }, [contentContenerRef.current?.clientWidth, width]);

  const contentContenerTransform = ""
    + (
      themeState === "big"
        ? `translateY(${(-translayteState * heightState * 0.5) + 0.5 * heightState}px)`
        : ""
    )
    + (
      themeState === "small"
        ? `translateX(${-translayteState * widthState}px)`
        : ""
    );


  useEffect(() => {
    if (contentContenerRef.current && items.length > 2 && themeState === "big") {
      contentContenerRef.current.children[currentItemState].setAttribute("style", `
        position: absolute;
        top: ${(currentItemState * heightState * 0.5) - 0.5 * heightState}px;
        left: -200%;
        min-height: 100%;
        max-height: 100%;
        min-width: 200%;
        max-width: 200%;
      `);
    }
  });
  const onClickBtnMovementOfItems = (direction: "prev" | "next", animationDuration: number = 500) => {
    if (buttonPrevRef.current !== null && buttonNextRef.current !== null) {
      buttonPrevRef.current.disabled = true;
      buttonNextRef.current.disabled = true;
    }

    let newCurrent = currentItemState;
    let newTranslayte = translayteState;
    let visibleNewItemIndex = currentItemState;

    if (direction === "prev") {
      visibleNewItemIndex = currentItemState - 1;
      if (items.length > 2) {
        if (currentItemState <= 2) {
          newCurrent = items.length - 3;
          if (currentItemState === 2) {
            newTranslayte = 1;
          } else {
            newTranslayte = 0;
          }
        } else {
          newTranslayte = currentItemState - 1;
          newCurrent = currentItemState - 1;
        }
      }
    }
    if (direction === "next") {
      visibleNewItemIndex = currentItemState + 1;
      if (items.length > 2) {
        if (currentItemState >= items.length - 3) {
          newCurrent = 2;
          if (currentItemState === items.length - 3) {
            newTranslayte = items.length - 2;
          } else {
            newTranslayte = items.length - 1;
          }
        } else {
          newTranslayte = currentItemState + 1;
          newCurrent = currentItemState + 1;
        }
      }
    }

    const draw = (timePassed: number) => {
      if (contentContenerRef.current !== null) {
        if (themeState === "big") {
          const newPosition = (-((newTranslayte - translayteState) * timePassed + translayteState) * heightState * 0.5)
            + 0.5 * heightState;
          contentContenerRef.current.style.transform = `translateY(${newPosition}px)`;

          let currentItemStyle = "";
          let visibleNewItemStyle = "";
          if (direction === "next") {
            visibleNewItemStyle = `
              position: relative;
              margin-bottom: ${-50 * timePassed}%;
              right: ${200 * timePassed}%;
              min-height: ${50 + 50 * timePassed}%;
              max-height: ${50 + 50 * timePassed}%;
              min-width: ${100 + 100 * timePassed}%;
              max-width: ${100 + 100 * timePassed}%;
            `;
            currentItemStyle = `
              position: absolute;
              top: ${(translayteState * heightState * 0.5) - 0.5 * heightState * (1 - timePassed)}px;
              left: ${-200 + 200 * timePassed}%;
              min-height: ${100 - 50 * timePassed}%;
              max-height: ${100 - 50 * timePassed}%;
              min-width: ${200 - 100 * timePassed}%;
              max-width: ${200 - 100 * timePassed}%;
            `;
          }
          if (direction === "prev") {
            currentItemStyle = `
              position: absolute;
              top: ${(translayteState * heightState * 0.5) - 0.5 * heightState}px;
              left: ${-200 + 200 * timePassed}%;
              min-height: ${100 - 50 * timePassed}%;
              max-height: ${100 - 50 * timePassed}%;
              min-width: ${200 - 100 * timePassed}%;
              max-width: ${200 - 100 * timePassed}%;
            `;
            visibleNewItemStyle = `
              position: relative;
              top: ${-timePassed * 0.5 * heightState}px;
              right: ${200 * timePassed}%;
              min-height: ${50 + 50 * timePassed}%;
              max-height: ${50 + 50 * timePassed}%;
              min-width: ${100 + 100 * timePassed}%;
              max-width: ${100 + 100 * timePassed}%;
            `;
          }
          contentContenerRef.current.children[currentItemState].setAttribute("style", currentItemStyle);
          contentContenerRef.current.children[visibleNewItemIndex].setAttribute("style", visibleNewItemStyle);
        } else {
          const newPosition = (-((newTranslayte - translayteState) * timePassed + translayteState) * widthState);
          contentContenerRef.current.style.transform = `translateX(${newPosition}px)`;
        }
      }
    }

    let start = Date.now();
    refTimer.current = window.setInterval(() => {
      let timePassed = Date.now() - start;
      if (timePassed >= animationDuration && refTimer.current !== null) {
        clearInterval(refTimer.current);
        if (contentContenerRef.current !== null) {
          contentContenerRef.current.children[visibleNewItemIndex].setAttribute("style", ``);
          contentContenerRef.current.children[currentItemState].setAttribute("style", ``);
        }
        if (buttonPrevRef.current !== null && buttonNextRef.current !== null) {
          buttonPrevRef.current.disabled = false;
          buttonNextRef.current.disabled = false;
        }
        setCurrentItemState(newCurrent);
        setTranslayteState(newCurrent);
        return;
      }
      draw(timePassed / animationDuration);
    }, 5)

  }

  const onChengeCurrentItemsState = (pastItem: number, newItem: number) => {
    const direction = newItem - pastItem < 0 ? "prev" : "next";
    setPositionСhangeСounterState({
      counter: Math.abs(newItem - pastItem) - 1,
      direction
    });
    if (Math.abs(newItem - pastItem) - 1 >= 0) onClickBtnMovementOfItems(direction, 100);
  }
  useEffect(() => {
    if (positionСhangeСounterState.counter > 0) {
      setPositionСhangeСounterState((state) => { return { ...state, counter: state.counter - 1 } })
      onClickBtnMovementOfItems(positionСhangeСounterState.direction, 100);
    }
  }, [currentItemState]);

  return (
    <div
      {...props}
      ref={carouselRef}
      className={newClassName}
      style={style}
    >
      <div key={"carousel__wrap"} className="carousel__wrap">
        <div key={"carousel__contentContener"}
          className="carousel__contentContener"
          ref={contentContenerRef}
          style={{
            transform: isMovable ? contentContenerTransform : "",
            transitionDuration: "0s",
          }}
        >
          {items}
        </div>
        {
          isMovable ?
            <button key={"carousel__buttonPrev"}
              ref={buttonPrevRef} type="button"
              className="carousel__button carousel__buttonPrev"
              onClick={() => onClickBtnMovementOfItems("prev")}
            >
              &#60;
            </button>
            : ""
        }
        {
          isMovable ?
            <button key={"carousel__buttonNext"}
              ref={buttonNextRef}
              type="button"
              className="carousel__button carousel__buttonNext"
              onClick={() => onClickBtnMovementOfItems("next")}
            >
              &#62;
            </button>
            : ""
        }
        {
          items.length > 2 && withDotList &&
          <ul key={"carousel__dotsList"} className="carousel__dotsList">
            {
              items.length > 1
                ? items.map((item, index) => {
                  return (
                    items.length - 5 >= index ?
                      <li key={index}
                        tabIndex={0}
                        onClick={() => { onChengeCurrentItemsState(currentItemState - 2, index) }}
                        onKeyDown={(e) => { if (e.code === "Enter") setCurrentItemState(index) }}
                        className={
                          index === currentItemState - 2
                            ? "carousel__dotsItem carousel__dotsItem_current"
                            : "carousel__dotsItem"
                        }
                      >
                      </li>
                      : null
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
