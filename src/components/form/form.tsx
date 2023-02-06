import React, { Children } from 'react';
import { CreateWrapElement, WrapElementContentType } from '../createWrapElement/createWrapElement';
import "./form.scss";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  className?: string,
}
export const Form = ({ className, children, ...props }: FormProps) => {
  return (
    <form className={"form" + (className ? " " + className : "")} {...props}>
      {children}
    </form>
  )
}

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  className?: string,
  children: WrapElementContentType | WrapElementContentType[]
}
export const FormFieldset = ({ className, children, ...props }: FieldsetProps) => {
  const checkForLegendAndLabel = (element: WrapElementContentType) => {
    if (!Array.isArray(element)
      && typeof element !== "string"
      && typeof element !== "number"
      && (element.type === "legend" || element.type === "label")
    ) {
      return <CreateWrapElement className='form__label'>
        {element}
      </CreateWrapElement>
    }
    return element;
  }

  let newChildren: WrapElementContentType | WrapElementContentType[];
  if (Array.isArray(children)) {
    newChildren = children.map((child) => {
      return checkForLegendAndLabel(child);
    })
  } else {
    newChildren = checkForLegendAndLabel(children);
  }

  return (
    <fieldset className={"form__fieldset" + (className ? " " + className : "")} {...props}>
      {newChildren}
    </fieldset>
  )
}
