import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { bookingAPI } from '../../interfaces/bookingAPI';
import { BookingCard } from '../bookingCard/bookingCard';
import { RoomsAPI } from '../../interfaces/roomsAPI';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import { FetchBookingsAction } from "../../store/actions/bookingActions";
import { FlexContainer } from '../flexContainer/flexContainer';
import { store } from '../../store/store';


export async function ordersPageLoader() {
  // const bookings = await bookingAPI.FetchBookingsForUser();
  // if (bookings) {
  //   for (let index = 0; index < bookings.length; index++) {
  //     let room = await RoomsAPI.FetchRoomItem(bookings[index].roomId);
  //     bookings[index] = {
  //       ...bookings[index],
  //       isLux: room.isLux,
  //       roomName: room.name,
  //     };
  //   }
  // }
  // return bookings;
  // await FetchBookingsAction()(store.dispatch);
  return null;
}

type OrdersPageProps = React.HTMLAttributes<HTMLDivElement> & {

} & ConnectorProps;
const Page = ({ bookingState, FetchBookingsAction, ...props }: OrdersPageProps) => {
  useLayoutEffect(() => { 
    FetchBookingsAction();
   }, [])
  useEffect(() => {
    const handleResize = () => {      
      let newDistributionBookingItems: JSX.Element[] = [];
      if (orderPageRef.current && bookingState) {
        for (let index = Math.max(Math.floor(orderPageRef.current.clientWidth / 400), 1); index > 0; index--) {
          newDistributionBookingItems.push(
            <FlexContainer key={index}
              className={"distributionBookingItems" + index}
              justifyContent='stretch'
              alignItems='center'
              flexDirection='colomn'
              columnGap={10}
              rowGap={20}
            >
              {
                bookingState.bookings.filter((bookingItem, bookingItemIndex) => {
                  if (orderPageRef.current) {
                    return ((bookingItemIndex + 1) % Math.floor(orderPageRef.current.clientWidth / 380)) === index - 1;
                  }
                  return false;
                }).map((bookingItem) => {
                  return <BookingCard key={bookingItem.id}
                    bookingItem={bookingItem}
                  />
                })
              }
            </FlexContainer>
          )
        }
      }
      setDistributionBookingItems(newDistributionBookingItems);
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [bookingState?.bookings]);

  const orderPageRef = useRef<HTMLDivElement | null>(null);
  const [distributionBookingItems, setDistributionBookingItems] = useState<JSX.Element[]>([]);

  return (
    <div
      {...props}
      className={"ordersPage" + (props.className ? " " + props.className : "")}
      ref={orderPageRef}
    >
      <FlexContainer
        justifyContent='center'
        columnGap={20}
      >
        {
          bookingState?.isLoading
            ? "Идет загрузка ваших заказов"
            : bookingState?.bookings && bookingState.bookings.length !== 0
              ? <ul key={"bookingsList"}
                className='ordersPage__bookingsList'
              >
                {
                  distributionBookingItems
                }
              </ul>
              : <div>
                Список ваших заказов пуст
              </div>
        }
      </FlexContainer>
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


// import React, {useLayoutEffect} from 'react';
// import { bookingAPI } from '../../interfaces/bookingAPI';
// import { BookingCard } from '../bookingCard/bookingCard';
// import { RoomsAPI } from '../../interfaces/roomsAPI';
// import { RootState } from '../../store/reducers/rootReducer';
// import { ConnectedProps, connect } from 'react-redux';
// import {FetchBookingsAction} from "../../store/actions/bookingActions";


// export async function ordersPageLoader() {
//   const bookings = await bookingAPI.FetchBookings();
//   if (bookings) {
//     for (let index = 0; index < bookings.length; index++) {
//       let room = await RoomsAPI.FetchRoomItem(bookings[index].roomId);
//       bookings[index] = {
//         ...bookings[index],
//         isLux: room.isLux,
//         roomName: room.name,
//       };
//     }
//   }
//   return bookings;
// }

// type OrdersPageProps = React.HTMLAttributes<HTMLDivElement> & {

// } & ConnectorProps;
// const Page = ({ bookingState, FetchBookingsAction, ...props }: OrdersPageProps) => {
//   useLayoutEffect(() => {
//     FetchBookingsAction();
//   }, []);

//   return (
//     <div
//       {...props}
//       className={"ordersPage" + (props.className ? " " + props.className : "")}
//     >{
//       bookingState?.isLoading 
//       ? "Идет загрузка ваших заказов"
//       : bookingState?.bookings && bookingState.bookings.length !== 0
//           ? <ul key={"bookingsList"}
//             className='ordersPage__bookingsList'
//           >
//             {
//               bookingState.bookings.map((bookingItem) => {
//                 return <BookingCard key={bookingItem.id}
//                   bookingItem={bookingItem}
//                 />
//               })
//             }
//           </ul>
//           : <div>
//             Список ваших заказов пуст
//           </div>
//       }
//     </div>
//   )
// }

// const mapStateToProps = (state: RootState) => {
//   return ({
//     bookingState: state.bookings
//   })
// }
// const mapDispatchToProps = {
//   FetchBookingsAction,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);
// type ConnectorProps = ConnectedProps<typeof connector>;
// export const OrdersPage = connector(Page);



