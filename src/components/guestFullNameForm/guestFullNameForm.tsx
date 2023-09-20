import React, {useEffect} from 'react';
import { guestInfo } from '../../types/booking';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { FormFieldset } from '../form/form';
import { Field } from '../field/field';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { Button } from '../button/button';

interface GuestFullNameFormProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  guest: guestInfo,
  onChangeValueBookingForm: (newValue: Partial<guestInfo>) => void,
  setValid: (v: boolean) => void,
  withLegend?: boolean,
}
export const GuestFullNameForm: React.FC<GuestFullNameFormProps> = ({
  guest,
  onChangeValueBookingForm,
  setValid,
  withLegend = true,
  ...props
}) => {
  const firstNameValidator = useValidationFieldForm(guest.firstName, {
    required: "Поле имени обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const lastNameValidator = useValidationFieldForm(guest.lastName, {
    required: "Поле фамилии обязательно к заполнению",
    onlyRussianAndEnglishLetters: true,
  })
  const patronymicValidator = useValidationFieldForm(guest.patronymic, {
    required: guest.patronymic === null ? false : "Поле отчества должно быть или удалено, или заполнено",
    onlyRussianAndEnglishLetters: guest.patronymic === null ? false : true,
  })
  useEffect(() => {
    setValid(firstNameValidator.isValid && lastNameValidator.isValid && patronymicValidator.isValid)
  }, [firstNameValidator.isValid, lastNameValidator.isValid, patronymicValidator.isValid]);

  return (
    <FormFieldset {...props} className={"guestInfoForm" + (props.className ? " " + props.className : "")}>
      {
        withLegend
          ?
          <legend key={"ageStatus"}>
            {
              guest.ageStatus === "adults"
                ? "Взрослый"
                : guest.ageStatus === "children"
                  ? "Ребенок"
                  : "Младенец"
            }
          </legend>
          : ""
      }
      <Field key={"lastName"}>
        <input
          value={guest.lastName}
          placeholder='Фамилия'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ lastName: e.target.value })}
          onBlur={() => lastNameValidator.setIsDirty(true)}
        />
      </Field>
      <ValidationMessage key={"lastNameValidator"} {...lastNameValidator} />
      <Field key={"firstName"}>
        <input
          value={guest.firstName}
          placeholder='Имя'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ firstName: e.target.value })}
          onBlur={() => firstNameValidator.setIsDirty(true)}
        />
      </Field>
      <ValidationMessage key="firstNameValidator" {...firstNameValidator} />
      {
        guest.patronymic !== null
          ? <>
            <Field key={"patronymic"}>
              <input key={"input"}
                value={guest.patronymic}
                placeholder='Отчество'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeValueBookingForm({ patronymic: e.target.value })}
                onBlur={() => patronymicValidator.setIsDirty(true)}
              />
              <button key={"delButton"}
                type="button"
                className=''
                onClick={() => onChangeValueBookingForm({ patronymic: null })}
              >
                Удалить отчество
              </button>
            </Field>
            <ValidationMessage key={"patronymicValidator"} {...patronymicValidator} />
          </>
          : <Button key={"addPatronymicButton"}
            type="button"
            onClick={() => onChangeValueBookingForm({ patronymic: "" })}
          >
            Добавить отчество
          </Button>
      }
    </FormFieldset>
  )
}