import React, {useState} from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {ChangeBookingAction} from "../../store/actions/bookingActions";
import { useValidationFieldForm } from '../../hooks/useValidationFieldFormReturn';
import { FormFieldset } from '../form/form';
import { Field } from '../field/field';
import { ValidationMessage } from '../validationMessage/validationMessage';
import { Button } from '../button/button';

export interface EmailChangeFormProps {
  bookingId: string,
  email: string,
  setActiveModal: (v: boolean) => void,
}
const ChangeForm = ({ bookingId, setActiveModal, ChangeBookingAction, email, bookingState }: EmailChangeFormProps & ConnectorProps) => {
  const [newEmail, setNewEmail] = useState<string>(email);
  const emailValidator = useValidationFieldForm(newEmail, {
    required: "Поле email является обязательным для заполнения",
    isEmail: true,
  });
  const onClick = () => { 
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined) ChangeBookingAction({...booking, emailForCommunication: newEmail});
      setActiveModal(false);
    }
   }
  return (
    <>
      <h2 key={"header"}>Изменение контактного email для заказа №{bookingId}</h2>
      <FormFieldset key={"field"}>
        <legend key={"header"}>Новый email:</legend>
        <Field key={"info"}>
          <input type="email"
            value={newEmail}
            onChange={(e) => { setNewEmail(e.target.value) }}
            onBlur={() => { emailValidator.setIsDirty(true) }}
          />
        </Field>
        <ValidationMessage key={"validator"} {...emailValidator} />
      </FormFieldset>
      <Button key={"button"}
        disabled={!emailValidator.isValid}
        type="button"
        theme='fillBcg'
        onClick={onClick}
      >
        Сохранить
      </Button>
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
export const EmailChangeForm = connector(ChangeForm);