import React, { useState } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {ChangeBookingAction} from "../../store/actions/bookingActions";
import { guestInfo } from '../../types/booking';
import { FormFieldset } from '../form/form';
import { Field } from '../field/field';
import { Button } from '../button/button';
import { GuestFullNameForm } from '../guestFullNameForm/guestFullNameForm';

export interface AddGuestFormProps {
  bookingId: string,
  setActiveModal: (v: boolean) => void,
};
const ChangeForm = ({bookingState, ChangeBookingAction, bookingId, setActiveModal}: AddGuestFormProps & ConnectorProps) => {
  const [value, setValue] = useState<guestInfo>({
    lastName: "",
    firstName: "",
    patronymic: "",
    ageStatus: "adults",
  });
  const onClick = () => {
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined) {
        booking.guestsInfo.push(value);
        ChangeBookingAction(booking);
      }
      setActiveModal(false);
    }
  }
  const [isValid, setIsValid] = useState<boolean>(false);
  return <>
    <h2>Внесите данные о госте:</h2>
    <FormFieldset key={"info"}>
      <legend key={"header"}>ФИО</legend>
      <GuestFullNameForm
        guest={value}
        onChangeValueBookingForm={(newGuest: Partial<guestInfo>) => setValue({ ...value, ...newGuest })}
        setValid={setIsValid}
        withLegend={false}
      />
    </FormFieldset>
    <FormFieldset key={"status"}>
      <legend key={"header"}>Возростной статус:</legend>
      <Field >
        <select
          value={value.ageStatus}
          onChange={(e) => setValue({...value, ageStatus: (e.target.value === "adults" ? "adults": e.target.value === "children"? "children" : "babies")})}
        >
          <option value={"adults"} selected>Взрослый</option>
          <option value={"children"}>Ребенок</option>
          <option value={"babies"}>Младенец</option>
        </select>
      </Field>
    </FormFieldset>
    <Button key={"button"}
      type="button"
      theme='fillBcg'
      disabled={!isValid}
      onClick={onClick}
    >
      Добавить
    </Button>
  </>
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
export const AddGuestForm = connector(ChangeForm);