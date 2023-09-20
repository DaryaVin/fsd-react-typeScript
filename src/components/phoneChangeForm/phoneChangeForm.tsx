import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { FormFieldset } from '../form/form';
import { Field } from '../field/field';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { FlexContainer } from '../flexContainer/flexContainer';
import { Button } from '../button/button';
import { ChangeBookingAction } from "../../store/actions/bookingActions";
import ReactInputMask from 'react-input-mask';

export interface PhoneChangeFormProps {
  bookingId: string,
  phone: string | undefined,
  setActiveModal: (v: boolean) => void,
}
const ChangeForm = ({ ChangeBookingAction, bookingId, phone, bookingState, setActiveModal }: PhoneChangeFormProps & ConnectorProps) => {
  const [newPhone, setNewPhone] = useState<string>(phone ? phone : "");
  const validator = useValidationFieldForm(newPhone, {
    required: "Поле email является обязательным для заполнения",
    isPhone: true,
  })
  const onClick = (type: "update" | "del") => {
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined) {
        if (type === "update") {
          booking.phone = newPhone;
        } else {
          delete booking.phone;
        }
        ChangeBookingAction(booking);
      }
      setActiveModal(false);
    }
  }
  return (
    <>
      <h2 key={"header"}>Изменение контактного email для заказа №{bookingId}</h2>
      <FormFieldset key={"field"}>
        <legend key={"header"}>Новый email:</legend>
        <Field key={"info"}>
          <ReactInputMask
            mask={"+9-999-999-99-99"}
            placeholder='+_ ___ ___ __ __'
            value={newPhone}
            onChange={(e) => { setNewPhone(e.target.value) }}
            onBlur={() => { validator.setIsDirty(true) }}
          />
        </Field>
        <ValidationMessage key={"validator"} {...validator} />
      </FormFieldset>
      <FlexContainer key={"buttons"}
        justifyContent='space-between'
      >
        <Button key={"buttonDel"}
          type="button"
          theme='withBorder'
          onClick={() => { onClick("del") }}
        >
          Очистить
        </Button>
        <Button key={"buttonSave"}
          disabled={!validator.isValid}
          type="button"
          theme='fillBcg'
          onClick={() => { onClick("update") }}
        >
          Сохранить
        </Button>
      </FlexContainer>
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    bookingState: state.bookings
  })
}
const mapDispatchToProps = {
  ChangeBookingAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const PhoneChangeForm = connector(ChangeForm);