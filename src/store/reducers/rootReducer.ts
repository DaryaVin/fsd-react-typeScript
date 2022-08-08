import { combineReducers } from "redux";
import { roomReducer } from "./roomReducer";

export const rootReducer = combineReducers(
    {
        room: roomReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;