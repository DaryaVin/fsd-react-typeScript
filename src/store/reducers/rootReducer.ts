import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { filterRoomsReducer } from "./fileterRoomsReducer";
import { roomListReducer } from "./roomListReducer";
import { bookingReducer } from "./bookingReducer";

export const rootReducer = combineReducers(
    {
        roomsList: roomListReducer,
        auth: authReducer,
        filterRooms: filterRoomsReducer,
        bookings: bookingReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;
