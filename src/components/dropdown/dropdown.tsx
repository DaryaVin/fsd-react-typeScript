import React, { useEffect, useRef, useState } from "react";
import "./dropdown.scss";

interface DropdownProps {
  buttonBlock: JSX.Element | JSX.Element[],
  contenerBlock: JSX.Element,
  className?: string,
  hasDropButton?: boolean,
  theme?: "field",
}
export const Dropdown = (props: DropdownProps) => { 
  let [show, setShow] = useState<boolean>(false);

  const dropButton = (<button type="button" className="dropdown__dropButton ">Кнопка выподающего элемента</button>);
  const buttonBlock = Array.isArray(props.buttonBlock) 
                      ? props.buttonBlock.map((item, index) => {
                          const newChildrenWrap = !Array.isArray(item.props.children) 
                                                  ? React.createElement("div", 
                                                                        {className: "dropdown__wrap"}, 
                                                                        [item.props.children, dropButton]
                                                                      ) 
                                                  : null;
                          const newChildren = newChildrenWrap ? newChildrenWrap : [...item.props.children, dropButton];
                          let newElem = React.cloneElement(item, 
                                                            {key:index, 
                                                            className: "dropdown__wrap " + item.props.className}, 
                                                            newChildren
                                                          );
                          return newElem;
                        }) 
                      : React.cloneElement(
                          props.buttonBlock, 
                          {className: "dropdown__wrap " + props.buttonBlock.props.className}, 
                          [props.buttonBlock.props.children, dropButton]
                        );
  
  const onClickButtonBlock = (e: React.MouseEvent) => {
    const buttonBlock = e.currentTarget;
    const dropButton =  Array.from(buttonBlock.getElementsByClassName("dropdown__dropButton"));
    if ( (props.hasDropButton && dropButton.find((i) => i === e.target)) 
      || (!props.hasDropButton)
    ) {
      setShow(!show);
    }
  }

  const dropdownComponent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent | FocusEvent) => {
      if ( (dropdownComponent.current instanceof Element) 
        && (e.target instanceof Element)
        && (!dropdownComponent.current.contains(e.target))
      ) {
          setShow(false);
      }
    }
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onClick)
    return () =>{ 
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onClick);
    }
  }, []);

  return (
    <div 
      className={"dropdown " + (props.className ? props.className : "") + (props.theme ? " dropdown_theme_field" : "")}
      ref={dropdownComponent}
    >
      <div 
        className={show ? "dropdown__buttonBlock dropdown__buttonBlock_version_show" : "dropdown__buttonBlock"} 
        key={"dropdown__buttonBlock"} 
        onClick={onClickButtonBlock}
      >
        {buttonBlock}
      </div>
      <div 
        className={show ? "dropdown__contenerBlock show"  : "dropdown__contenerBlock" }
        key={"dropdown__contenerBlock"}
      >
        {props.contenerBlock}
      </div>
    </div>
  )
}