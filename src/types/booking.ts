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
  roomName?: string,
  priceAtTimeOfBooking: number,
  unitPrice?: string,
  isLux?: boolean,
  arrivalDate: Date,
  departureDate: Date,
  issueDate: Date,
  phone?: string,
  emailForCommunication: string,
  serviceCharge: number,
  discount?: number,
  guestsInfo: guestInfo[],
  isPaid?: boolean,
  status: "booking" | "cancelled" | "completed" | "inProgress",
  rating?: 1 | 2 | 3 | 4 | 5,
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
  DEL_BOOKING = "DEL_BOOKING",
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
interface DeleteBookingAction {
  type: BookingActionType.DEL_BOOKING;
  payload: string;
}

export type BookingAction =
  FetchBookingAction
  | FetchBookingSuccessAction
  | FetchBookingErrorAction
  | ChangeBookingAction
  | DeleteBookingAction;
