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
    isAboveMinimum?: number | {
      min: number,
      message?: string,
    },
    isBelowMaximum?: number | {
      max: number,
      message?: string,
    },
  }
}
interface validatorMessage {
  required?: string,
  minLength?: string,
  isEmail?: string,
  isAboveMinimum?: string,
  isBelowMaximum?: string,
}
export interface useValidationFieldFormReturn {
  isDirty: boolean,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
  isValid: boolean,
  message: validatorMessage
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
    isAboveMinimum?: number | {
      min: number,
      message?: string,
    },
    isBelowMaximum?: number | {
      max: number,
      message?: string,
    },
  }
): useValidationFieldFormReturn => {
  const {
    required,
    minLength,
    isEmail,
    isAboveMinimum,
    isBelowMaximum,
  } = valudations ? valudations : {
    required: undefined,
    minLength: undefined,
    isEmail: undefined,
    isAboveMinimum: undefined,
    isBelowMaximum: undefined,
  };

  let firstValueIsDirty: boolean = false;
  if (Array.isArray(value)) {
    firstValueIsDirty = value.reduce((sum, item) => { return sum && !!item }, true);

  } else {
    firstValueIsDirty = !!value;
  }

  let [isDirty, setIsDirty] = useState<boolean>(firstValueIsDirty);
  let [isRequired, setIsRequired] = useState<boolean>(true);
  let [isMinLength, setIsMinLength] = useState<boolean>(true);
  let [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  let [isAboveMinimumState, setIsAboveMinimumState] = useState<boolean>(true);
  let [isBelowMaximumState, setIsBelowMaximumState] = useState<boolean>(true);
  const [message, setMessage] = useState<validatorMessage>({});

  useEffect(() => {
    let mess: validatorMessage = message;
    let requiredStatus = true;
    let minLengthStatus = true;
    let validEmailStatus = true;
    let isAboveMinimumStatus = true;
    let isBelowMaximumStatus = true;
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
      if (isAboveMinimum) {
        
        if (typeof item === "number") {
          const min = typeof isAboveMinimum === "number" ? isAboveMinimum : isAboveMinimum.min;
          if (item < min) {
            isAboveMinimumStatus = false;
            mess.isAboveMinimum = typeof isAboveMinimum !== "number" && isAboveMinimum.message
              ? isAboveMinimum.message
              : "Данное поле должно быть не меньше " + min;
          }
        } else {
          isAboveMinimumStatus = false;
          mess.isAboveMinimum = "Ошибка кода! Поле получает данные неожиданного формата";
        }
      }
      if (isBelowMaximum) {
        if (typeof item === "number") {
          const max = typeof isBelowMaximum === "number" ? isBelowMaximum : isBelowMaximum.max;
          if (item > max) {
            isBelowMaximumStatus = false;
            mess.isBelowMaximum = typeof isBelowMaximum !== "number" && isBelowMaximum.message
              ? isBelowMaximum.message
              : "Данное поле должно быть не больше " + max;
          }
        } else {
          isAboveMinimumStatus = false;
          mess.isAboveMinimum = "Ошибка кода! Поле получает данные неожиданного формата";
        }
      }
    }
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index++) {
        validityСheckItem(value[index]);
        if (!(
          requiredStatus 
          && minLengthStatus 
          && validEmailStatus
          && isAboveMinimumStatus
          && isBelowMaximumStatus
          )) break;
      }
    } else {
      validityСheckItem(value);
    }
    if (requiredStatus) mess.required = "";
    if (minLengthStatus) mess.minLength = "";
    if (validEmailStatus) mess.isEmail = "";
    if (isAboveMinimumStatus) mess.isAboveMinimum = "";
    if (isBelowMaximumStatus) mess.isBelowMaximum = "";

    setIsRequired(requiredStatus);
    setIsMinLength(minLengthStatus);
    setIsValidEmail(validEmailStatus);
    setIsAboveMinimumState(isAboveMinimumStatus);
    setIsBelowMaximumState(isBelowMaximumStatus);

    setMessage(mess);

  }, Array.isArray(value) ? [...value] : [value]);

  return {
    isDirty,
    setIsDirty,
    isValid: isRequired && isMinLength && isValidEmail && isAboveMinimumState && isBelowMaximumState,
    message
  }
}
