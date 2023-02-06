import { RoomAction, RoomActionType, RoomState } from "../../types/rooms";

const initialState: RoomState = {
    rooms: [],
    isLoading: false,
    error: null,
};

export const roomReducer = (state: RoomState = initialState, action: RoomAction): RoomState | undefined => {
    switch (action.type) {
        case RoomActionType.FETCH_ROOMS: {
            return {...state, isLoading: true, error: null};
        }
        case RoomActionType.FETCH_ROOMS__SUCCESS: {
            return {isLoading: false, error: null, rooms: {...state.rooms, ...action.payload}};
        }
        case RoomActionType.FETCH_ROOMS__ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }
        default: return state;
    }
};
