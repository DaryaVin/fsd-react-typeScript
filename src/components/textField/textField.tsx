import React, { ReactChild, ReactChildren } from "react";
import "./textField.scss";

interface TextFieldProps {
  // type: string;
  // placeholder?: string;
  children: ReactChildren | ReactChild;
  className?: string;
}

export const TextField = (props: TextFieldProps) => {
  return (<>
      <div className={"textField " + (props.className ? props.className : "")} >
        {/* <input 
          type={props.type} 
          placeholder={props.placeholder} 
          className="textField__field"
        /> */}
        {props.children}
      </div>
    </>);
}