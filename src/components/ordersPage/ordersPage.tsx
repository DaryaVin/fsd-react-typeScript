import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import "./ordersPage.scss";
import { BookingCard } from '../bookingCard/bookingCard';
import { RootState } from '../../store/reducers/rootReducer';
import { ConnectedProps, connect } from 'react-redux';
import { FetchBookingsAction } from "../../store/actions/bookingActions";
import { FlexContainer } from '../flexContainer/flexContainer';


type OrdersPageProps = React.HTMLAttributes<HTMLDivElement> & {

} & ConnectorProps;
const Page = ({ bookingState, FetchBookingsAction, ...props }: OrdersPageProps) => {

  useLayoutEffect(() => { 
    FetchBookingsAction();
   }, []);

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
                    return (bookingItemIndex + 1) % Math.max(Math.floor(orderPageRef.current.clientWidth / 400), 1) === index - 1;
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
      <FlexContainer key={"container"}
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
              : <div key={"wrap"}>
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




