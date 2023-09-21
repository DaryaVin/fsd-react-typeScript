import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {ChangeBookingAction} from "../../store/actions/bookingActions";
import { FormFieldset } from '../form/form';
import { Button } from '../button/button';

export interface BookingCancellationConfirmationFormProps {
  bookingId: string,
  setActiveModal: (v: boolean) => void,
}
const ChangeForm = ({ bookingState, bookingId, setActiveModal, ChangeBookingAction }: BookingCancellationConfirmationFormProps & ConnectorProps) => {
  const onClick = () => {
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined) {
        ChangeBookingAction({...booking, status: "cancelled"});
      }
      setActiveModal(false);
    }
  }
  return <>
    <FormFieldset key={"info"}>
      Вы уверены, что хотите отменить заказ №{bookingId}?
    </FormFieldset>
    <Button key={"button"}
      type="button"
      theme='fillBcg'
      onClick={onClick}
    >
      Уверен, отменить
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
export const BookingCancellationConfirmationForm = connector(ChangeForm);