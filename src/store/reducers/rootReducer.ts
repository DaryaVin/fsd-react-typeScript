import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { filterRoomsReducer } from "./fileterRoomsReducer";
import { roomListReducer } from "./roomListReducer";

export const rootReducer = combineReducers(
    {
        roomsList: roomListReducer,
        auth: authReducer,
        filterRooms: filterRoomsReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;
