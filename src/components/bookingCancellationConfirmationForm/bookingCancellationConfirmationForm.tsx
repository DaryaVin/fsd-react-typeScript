import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {DeleteBookingAction} from "../../store/actions/bookingActions";
import { FormFieldset } from '../form/form';
import { Button } from '../button/button';

export interface BookingCancellationConfirmationFormProps {
  bookingId: string,
  setActiveModal: (v: boolean) => void,
}
const ChangeForm = ({ bookingId, setActiveModal, DeleteBookingAction }: BookingCancellationConfirmationFormProps & ConnectorProps) => {
  return <>
    <FormFieldset key={"info"}>
      Вы уверены, что хотите отменить заказ №{bookingId}?
    </FormFieldset>
    <Button key={"button"}
      type="button"
      theme='fillBcg'
      onClick={() => { DeleteBookingAction(bookingId); setActiveModal(false); }}
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
  DeleteBookingAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const BookingCancellationConfirmationForm = connector(ChangeForm);