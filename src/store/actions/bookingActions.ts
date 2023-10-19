import { Dispatch } from "redux";
import { BookingAction, BookingActionType, bookingItem } from "../../types/booking";
import { bookingAPI } from "../../interfaces/bookingAPI";
import { RoomsAPI } from "../../interfaces/roomsAPI";
import { ReviewItem } from "../../types/rooms";

export const FetchBookingsAction = () => {
    return async (dispatch: Dispatch<BookingAction>) => {
        try {
            dispatch({ type: BookingActionType.FETCH_BOOKING });
            const bookings: bookingItem[] = await bookingAPI.FetchBookingsForUser();
            // const bookings: bookingItem[] = await bookingAPI.FetchBookings();
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
            dispatch({ type: BookingActionType.FETCH_BOOKING__SUCCESS, payload: bookings});

        } catch (e) {
            console.log("FetchBookingsAction error:", e);
            const error = JSON.parse(JSON.stringify(e));
            dispatch({ type: BookingActionType.FETCH_BOOKING__ERROR, payload: error.code });
        }
    }
}

export const DeleteBookingAction = (bookingId: string) => { 
    return async (dispatch: Dispatch<BookingAction>) => {
        try {
            // dispatch({ type: BookingActionType.FETCH_BOOKING });
            await bookingAPI.deleteBooking(bookingId);
            dispatch({ type: BookingActionType.DEL_BOOKING, payload:bookingId });
        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({ type: BookingActionType.FETCH_BOOKING__ERROR, payload: error.code });
        }
    }
 }

export const ChangeBookingAction = (bookingItem: bookingItem) => { 
    return async (dispatch: Dispatch<BookingAction>) => {
        try {
            await bookingAPI.UpdateBooking(bookingItem);
            dispatch({ type: BookingActionType.CHANGE_BOOKING, payload:bookingItem });
        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            console.log("ChangeBookingAction error", e);
            dispatch({ type: BookingActionType.FETCH_BOOKING__ERROR, payload: error.code });
        }
    }
 }
 
export const RateBookingAction = (bookingItem: bookingItem, reviewItem: ReviewItem) => { 
    return async (dispatch: Dispatch<BookingAction>) => {
        try {
            await bookingAPI.UpdateBooking(bookingItem);
            await RoomsAPI.CreatedRoomReview(bookingItem.roomId, reviewItem);
            dispatch({ type: BookingActionType.CHANGE_BOOKING, payload:bookingItem });
        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            console.log("ChangeBookingAction error", e);
            dispatch({ type: BookingActionType.FETCH_BOOKING__ERROR, payload: error.code });
        }
    }
 }