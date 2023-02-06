import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { roomReducer } from "./roomReducer";

export const rootReducer = combineReducers(
    {
        room: roomReducer,
        auth: authReducer,
    }
);

export type RootState = ReturnType<typeof rootReducer>;
