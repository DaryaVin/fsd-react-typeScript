import React, { useEffect, useState } from "react";

export interface useValidationFieldFormProps {
  value: any,
  valudations?: {
    required?: boolean | string,
    minLength?: number | {
      min: number,
      message?: string,
    },
    isEmail?: boolean | string,
  }
}
export interface useValidationFieldFormReturn {
  isDirty: boolean,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
  isValid: boolean,
  message: {
    required?: string,
    minLength?: string,
    isEmail?: string
  }
}
export const useValidationFieldForm = (
  value: any,
  valudations?: {
    required?: boolean | string,
    minLength?: number | {
      min: number,
      message?: string,
    },
    isEmail?: boolean | string,
  }
): useValidationFieldFormReturn => {
  const {
    required,
    minLength,
    isEmail
  } = valudations ? valudations : {
    required: undefined,
    minLength: undefined,
    isEmail: undefined,
  };
  let firstValueIsDirty: boolean = false;
  if (Array.isArray(value)) {
    firstValueIsDirty = value.reduce((sum, item) => {return sum && !!item}, true);
    console.log("firstValueIsDirty", );

  } else {
    firstValueIsDirty = !!value;
  }
  let [isDirty, setIsDirty] = useState<boolean>(firstValueIsDirty);
  let [isRequired, setIsRequired] = useState<boolean>(true);
  let [isMinLength, setIsMinLength] = useState<boolean>(true);
  let [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [message, setMessage] = useState<{
    required?: string,
    minLength?: string,
    isEmail?: string
  }>({});

  useEffect(() => {
    let mess: {
      required?: string,
      minLength?: string,
      isEmail?: string
    } = message;
    let requiredStatus = true;
    let minLengthStatus = true;
    let validEmailStatus = true;
    const validityСheckItem = (item: any) => {
      if (required) {
        // console.log("validityСheckItem", item);
        if (item === "" || item === undefined || item === null) {
          mess.required = typeof (required) === "string" && required !== "" ? required : "Это поле должно быть заполнено";
          requiredStatus = false;
          // setIsRequired(false);
        } else {
          // if () {
          //   mess.required = "";
          // }

          // setIsRequired(true);
        }
      }
      if (minLength) {
        if (typeof item === "string" || typeof item === "number") {
          const min = typeof minLength === "number" ? minLength : minLength.min;
          const length = typeof item === "string" ? item.length : item?.toString().length;
          if (length < min) {
            minLengthStatus = false;
            // setIsMinLength(false);
            mess.minLength = typeof minLength !== "number" && minLength.message ? minLength.message : "Минимальная допустимая длина этого поля " + min + " символов";
          } else {
            // setIsMinLength(true);
            // mess.minLength = "";
          }
        } else {
          // setIsMinLength(false);
          minLengthStatus = false;
          mess.minLength = "Ошибка кода! Поле получает данные неожиданного формата"
        }
      }
      if (isEmail) {
        if (typeof item === "string") {
          const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
          if (!EMAIL_REGEXP.test(item)) {
            validEmailStatus = false;
            // setIsValidEmail(false);
            mess.isEmail = typeof isEmail === "string" ? isEmail : "В этом поле должен быть введен Email. Например abc@email.ru";
          } else {
            // setIsValidEmail(true);
            // mess.isEmail = "";
          }
        } else {
          validEmailStatus = false;
          // setIsValidEmail(false);
          mess.isEmail = "Ошибка кода! Поле получает данные неожиданного формата"
        }
      }
      // return {
      //   required: requiredStatus,
      //   minLength: minLengthStatus,
      //   validEmail: validEmailStatus,
      // }
      // if (requiredStatus) mess.required = "";
      // if (minLengthStatus) mess.minLength = "";
      // if (validEmailStatus) mess.isEmail = "";
    }
    if (Array.isArray(value)) {
      // let requiredStatus = true;
      // let minLengthStatus = true;
      // let validEmailStatus = true;
      for (let index = 0; index < value.length; index++) {
        validityСheckItem(value[index]);
        // const status = validityСheckItem(value[index]);
        // requiredStatus = requiredStatus && status.required;
        // minLengthStatus = minLengthStatus && status.minLength;
        // validEmailStatus = validEmailStatus && status.validEmail;
        if (!(requiredStatus && minLengthStatus && validEmailStatus)) break;
      }

      // value.forEach((item) => {
      //   if (isRequired && isMinLength && isValidEmail) validityСheckItem(item);
      //  })
    } else {
      validityСheckItem(value);
    }
    if (requiredStatus) mess.required = "";
    if (minLengthStatus) mess.minLength = "";
    if (validEmailStatus) mess.isEmail = "";
    setIsRequired(requiredStatus);
    setIsMinLength(minLengthStatus);
    setIsValidEmail(validEmailStatus);
    setMessage(mess);
    console.log("isDirty", isDirty);

  }, Array.isArray(value) ? [...value] : value);
  return {
    isDirty,
    setIsDirty,
    isValid: isRequired && isMinLength && isValidEmail,
    message
  }
}
