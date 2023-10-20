import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { CreateWrapElement, KEYWORD_CREATEWRAPELEMENT, WrapElementContentType } from "../createWrapElement/createWrapElement";
import "./dropdown.scss";

interface DropdownProps {
  buttonBlock: WrapElementContentType,
  contenerBlock: WrapElementContentType,
  className?: string,
  hasDropButton?: boolean,
  theme?: "field",
}
export const dropButton = (<button key={"dropdown__dropButton"} type="button" className="dropdown__dropButton ">Кнопка выподающего элемента</button>);
export const Dropdown = ({ buttonBlock, contenerBlock, className, hasDropButton, theme }: DropdownProps) => {
  let [show, setShow] = useState<boolean>(false);
  let [newButtonBlock, setNewButtonBlock] = useState<WrapElementContentType>(buttonBlock);

  const buttonBlockRef = useRef<HTMLDivElement>(null);

  const createNewButtonBlock = () => {
    let childrenContent: WrapElementContentType[] | undefined = [KEYWORD_CREATEWRAPELEMENT, dropButton];
    if (buttonBlockRef.current?.getElementsByClassName("dropdown__dropButton").length) {
      childrenContent = undefined;
    }
    if (childrenContent) {
      if (Array.isArray(buttonBlock)) {
        setNewButtonBlock(buttonBlock.map((item, index) => {
          return <CreateWrapElement
            key={index}
            className={(childrenContent ? " dropdown_wrap" : "")}
            childrenContent={childrenContent}
          >
            {item}
          </CreateWrapElement>
        }))
      } else {
        setNewButtonBlock(<CreateWrapElement
          className={(childrenContent ? " dropdown_wrap" : "")}
          childrenContent={childrenContent}
        >
          {buttonBlock}
        </CreateWrapElement>)
      }
    }
  }

  useLayoutEffect(() => { createNewButtonBlock() }, []);
  useLayoutEffect(() => {
    setNewButtonBlock(buttonBlock);
  }, [buttonBlock]);
  useLayoutEffect(() => {
    createNewButtonBlock();
    if (buttonBlockRef.current && buttonBlockRef.current.getElementsByClassName("dropdown__dropButton").length) {
      Array.from(buttonBlockRef.current.getElementsByClassName("dropdown__dropButton")).map((element) => {
        element.parentElement?.classList.add("dropdown__wrap")
      })
    }
  }, [newButtonBlock]);


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
    <div key={"dropdown"}
      className={"dropdown " + (className || "") + (theme ? " dropdown_theme_" + theme : "")}
      ref={dropdownComponent}
    >
      <div key={"dropdown__buttonBlock"}
        className={"dropdown__buttonBlock" + (show ? " dropdown__buttonBlock_version_show" : "")}
        ref={buttonBlockRef}
        onClick={onClickButtonBlock}
      >
        {
          Array.isArray(newButtonBlock)
            ? newButtonBlock.map((item) => {
              return item
            })
            : newButtonBlock
        }
      </div>
      <div key={"dropdown__contenerBlock"}
        className={"dropdown__contenerBlock" + (show ? " show" : "")}
      >
        {contenerBlock}
      </div>
    </div>
  )
}
