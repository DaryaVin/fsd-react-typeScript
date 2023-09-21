import React, {useLayoutEffect} from 'react';
import { bookingAPI } from '../../interfaces/bookingAPI';
import { BookingCard } from '../bookingCard/bookingCard';
import { RoomsAPI } from '../../interfaces/roomsAPI';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import {FetchBookingsAction} from "../../store/actions/bookingActions";


export async function ordersPageLoader() {
  const bookings = await bookingAPI.FetchBookings();
  if (bookings) {
    for (let index = 0; index < bookings.length; index++) {
      let room = await RoomsAPI.FetchRoomItem(bookings[index].roomId);
      bookings[index] = {
        ...bookings[index],
        isLux: room.isLux,
        roomName: room.name,
      };
    }
  }
  return bookings;
}

type OrdersPageProps = React.HTMLAttributes<HTMLDivElement> & {

} & ConnectorProps;
const Page = ({ bookingState, FetchBookingsAction, ...props }: OrdersPageProps) => {
  useLayoutEffect(() => {
    FetchBookingsAction();
  }, []);

  return (
    <div
      {...props}
      className={"ordersPage" + (props.className ? " " + props.className : "")}
    >{
      bookingState?.isLoading 
      ? "Идет загрузка ваших заказов"
      : bookingState?.bookings && bookingState.bookings.length !== 0
          ? <ul key={"bookingsList"}
            className='ordersPage__bookingsList'
          >
            {
              bookingState.bookings.map((bookingItem) => {
                return <BookingCard key={bookingItem.id}
                  bookingItem={bookingItem}
                />
              })
            }
          </ul>
          : <div>
            Список ваших заказов пуст
          </div>
      }
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return ({
    bookingState: state.bookings
  })
}
const mapDispatchToProps = {
  FetchBookingsAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ConnectorProps = ConnectedProps<typeof connector>;
export const OrdersPage = connector(Page);
