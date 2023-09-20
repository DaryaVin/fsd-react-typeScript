import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import {ChangeBookingAction} from "../../store/actions/bookingActions";
import { guestInfo } from '../../types/booking';
import { Button } from '../button/button';

export interface DeleteGuestFormProps {
  bookingId: string,
  guestIndex: number,
  guest: guestInfo,
  setActiveModal: (v: boolean) => void,
};
const ChangeForm = ({ bookingState,  bookingId, guestIndex,  guest, setActiveModal, ChangeBookingAction}: DeleteGuestFormProps & ConnectorProps) => {
  const onClick = () => {
    if (bookingState) {
      const booking = bookingState.bookings.find((item) => item.id === bookingId);
      if (booking !== undefined) {
        booking.guestsInfo.splice(guestIndex, 1);
        ChangeBookingAction(booking);
      }
      setActiveModal(false);
    }
  }
  return <>
    <div key={"info"}>
      { "Вы уверены, что хотите удалить гостя "
        + guest.lastName.toUpperCase() + " "
        + guest.firstName.toUpperCase() + " "
        + (guest.patronymic ? guest.patronymic.toLocaleUpperCase() + " ": "")
        + "из заказа №" + bookingId + "?"
      }
      </div>
    <Button key={"button"}
      type="button"
      theme='fillBcg'
      onClick={onClick}
    >
      Уверен, удалить
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
export const DeleteGuestForm = connector(ChangeForm);