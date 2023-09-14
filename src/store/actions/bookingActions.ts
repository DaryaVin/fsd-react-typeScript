import { Dispatch } from "redux";
import { BookingAction, BookingActionType, bookingItem } from "../../types/booking";

export const FetchBookingsAction = () => {
    return async (dispatch: Dispatch<BookingAction>) => {
        try {
            dispatch({ type: BookingActionType.FETCH_BOOKING });
            const booking: bookingItem[] = [];
            dispatch({ type: BookingActionType.FETCH_BOOKING__SUCCESS, payload: booking});

        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({ type: BookingActionType.FETCH_BOOKING__ERROR, payload: error.code });
        }
    }
}