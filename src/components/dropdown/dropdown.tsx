import React, { useEffect, useRef, useState } from "react";
import { CreateWrapElement, KEYWORD_CREATEWRAPELEMENT, WrapElementContentType } from "../createWrapElement/createWrapElement";
import "./dropdown.scss";

interface DropdownProps {
  buttonBlock: WrapElementContentType,
  contenerBlock: WrapElementContentType,
  className?: string,
  hasDropButton?: boolean,
  theme?: "field",
}
export const Dropdown = ({ buttonBlock, contenerBlock, className, hasDropButton, theme }: DropdownProps) => {
  let [show, setShow] = useState<boolean>(false);

  const dropButton = (<button type="button" className="dropdown__dropButton ">Кнопка выподающего элемента</button>);
  let newButtonBlock: any;
  if (Array.isArray(buttonBlock)) {
    newButtonBlock = buttonBlock.map((item, index) => {
      return <CreateWrapElement
        key={index}
        className="dropdown__wrap"
        childrenContent={[KEYWORD_CREATEWRAPELEMENT, dropButton]}
      >
        {item}
      </CreateWrapElement>
    })
  } else {
    newButtonBlock = <CreateWrapElement
      className="dropdown__wrap"
      childrenContent={[KEYWORD_CREATEWRAPELEMENT, dropButton]}
    >
      {buttonBlock}
    </CreateWrapElement>
  }

  const onClickButtonBlock = (e: React.MouseEvent) => {
    const buttonBlock = e.currentTarget;
    const dropButton = Array.from(buttonBlock.getElementsByClassName("dropdown__dropButton"));
    if ((hasDropButton && dropButton.find((i) => i === e.target))
      || (!hasDropButton)
    ) {
      setShow(!show);
    }
  }

  const dropdownComponent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent | FocusEvent) => {
      if ((dropdownComponent.current instanceof Element)
        && (e.target instanceof Element)
        && (!dropdownComponent.current.contains(e.target))
      ) {
        setShow(false);
      }
    }
    document.addEventListener('click', onClick);
    document.addEventListener('focusin', onClick)
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('focusin', onClick);
    }
  }, []);

  return (
    <div
      className={"dropdown " + (className || "") + (theme ? " dropdown_theme_" + theme : "")}
      ref={dropdownComponent}
    >
      <div
        className={"dropdown__buttonBlock" + (show ? " dropdown__buttonBlock_version_show" : "")}
        key={"dropdown__buttonBlock"}
        onClick={onClickButtonBlock}
      >
        {newButtonBlock}
      </div>
      <div
        className={"dropdown__contenerBlock" + (show ? " show" : "")}
        key={"dropdown__contenerBlock"}
      >
        {contenerBlock}
      </div>
    </div>
  )
}
