import { BookingAction, BookingActionType, BookingState } from "../../types/booking";

const initialState: BookingState = {
    bookings: [],
    isLoading: false,
    error: null,
};

export const authReducer = (state: BookingState = initialState, action: BookingAction): BookingState | undefined => {
    switch (action.type) {
        case BookingActionType.FETCH_BOOKING: {
            return { ...state, isLoading: true, error: null };
        }
        case BookingActionType.FETCH_BOOKING__SUCCESS: {
            return { ...state, isLoading: false, error: null, bookings: action.payload };
        }
        case BookingActionType.FETCH_BOOKING__ERROR: {
            return { ...state, isLoading: false, error: action.payload };
        }
        case BookingActionType.CHANGE_BOOKING: {
            const newBookings = state.bookings.map((booking) => { 
                if (booking.id === action.payload.id) {
                    return action.payload
                } else {
                    return booking
                }
             })
            return { ...state, bookings: newBookings }
        }
        default: return state;
    }
};
