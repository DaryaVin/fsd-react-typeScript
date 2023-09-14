export interface guestInfo {
    firstName: string,
    lastName: string,
    patronymic?: string | null,
    ageStatus: "adults" | "children" | "babies",
}

export interface bookingItem {
    id: string,
    userId: string,
    roomId: string,
    arrivalDate: Date,
    departureDate: Date,
    issueDate: Date,
    phone?: string,
    emailForCommunication: string,
    serviceCharge: number,
    discount?: number,
    guestsInfo: guestInfo[],
    isPaid?: boolean,
}

export interface BookingState {
    bookings: bookingItem[],
    isLoading: boolean,
    error: string | null,
}

export enum BookingActionType {
    FETCH_BOOKING = "FETCH_BOOKING",
    FETCH_BOOKING__SUCCESS = "FETCH_BOOKING_SUCCESS",
    FETCH_BOOKING__ERROR = "FETCH_BOOKING__ERROR",
    CHANGE_BOOKING = "CHANGE_BOOKING",
}

interface FetchBookingAction {
    type: BookingActionType.FETCH_BOOKING;
  }
  interface FetchBookingSuccessAction {
    type: BookingActionType.FETCH_BOOKING__SUCCESS;
    payload: bookingItem[];
  }
  interface FetchBookingErrorAction {
    type: BookingActionType.FETCH_BOOKING__ERROR;
    payload: string;
  }
  interface ChangeBookingAction {
    type: BookingActionType.CHANGE_BOOKING;
    payload: bookingItem;
  }
  
  export type BookingAction =
  FetchBookingAction
  | FetchBookingSuccessAction
  | FetchBookingErrorAction
  | ChangeBookingAction;
  