import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { filterRoomsReducer } from "./fileterRoomsReducer";
import { roomReducer } from "./roomReducer";

export const rootReducer = combineReducers(
    {
        room: roomReducer,
        auth: authReducer,
        filterRooms: filterRoomsReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;
