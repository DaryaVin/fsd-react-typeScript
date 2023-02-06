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

  let [isDirty, setIsDirty] = useState<boolean>(!value ? false : true);
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
    if (required) {
      if (value === "" || value === undefined || value === null) {
        mess.required = typeof (required) === "string" && required !== "" ? required : "Это поле должно быть заполнено";
        setIsRequired(false);
      } else {
        mess.required = "";
        setIsRequired(true);
      }
    }
    if (minLength) {
      if (typeof value === "string" || typeof value === "number") {
        const min = typeof minLength === "number" ? minLength : minLength.min;
        const length = typeof value === "string" ? value.length : value?.toString().length;
        if (length < min) {
          setIsMinLength(false);
          mess.minLength = typeof minLength !== "number" && minLength.message ? minLength.message : "Минимальная допустимая длина этого поля " + min + " символов";
        } else {
          setIsMinLength(true);
          mess.minLength = "";
        }
      } else {
        setIsMinLength(false);
        mess.minLength = "Ошибка кода! Поле получает данные неожиданного формата"
      }
    }
    if (isEmail) {
      if (typeof value === "string") {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        if (!EMAIL_REGEXP.test(value)) {
          setIsValidEmail(false);
          mess.isEmail = typeof isEmail === "string" ? isEmail : "В этом поле должен быть введен Email. Например abc@email.ru";
        } else {
          setIsValidEmail(true);
          mess.isEmail = "";
        }
      } else {
        setIsValidEmail(false);
        mess.isEmail = "Ошибка кода! Поле получает данные неожиданного формата"
      }
    }
    setMessage(mess);
  }, [value]);
  return {
    isDirty,
    setIsDirty,
    isValid: isRequired && isMinLength && isValidEmail,
    message
  }
}
