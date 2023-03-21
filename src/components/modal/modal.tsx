import React, { useEffect, useState } from 'react';
import "./modal.scss";
import { Field } from '../field/field';
import { CreateWrapElement, KEYWORD_CREATEWRAPELEMENT } from '../createWrapElement/createWrapElement';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: JSX.Element,
  isActive: boolean,
  setIsActive: (v: boolean) => void,
}

export const Modal = ({ children, isActive, setIsActive, ...props }: ModalProps) => {
  const [show, setShow] = useState<boolean>(!isActive);
  useEffect(() => {
    setTimeout(() => setShow(isActive), 500);
  });

  let newClassName = 'modal' + (props.className ? " " + props.className : "");

  const toggleIsActive = async () => {
    setShow(!show);
   await setTimeout(() => setIsActive(!isActive), 500);
  }

  return (
    isActive
    ? <div {...props} className={newClassName + (show ? " modal_isActive" : "")} onClick={toggleIsActive}>
        <div className='modal_content'>

        <Field className='modal_window' theme="card" onClick={(e) => { e.stopPropagation() }}>
            {
            isActive ? children : children
            }
        </Field>
        <button type='button' className='modal__closeButton' onClick={toggleIsActive}>закрыть</button>
        </div>
      </div>
    : null
  )
}
