import { RoomAction, RoomActionType, RoomState } from "../../types/rooms";

const initialState: RoomState = {
    totalCount: 0,
    pageSize: 12,
    currentPage: 1,
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
            return {...state, isLoading: false, rooms: action.payload.rooms, totalCount: action.payload.totalCount, currentPage: action.payload.newCurrentPage};
        }
        case RoomActionType.FETCH_ROOMS__ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }
        case RoomActionType.CHANGE_CURRENTPAGE: {
            return {...state, currentPage: action.payload}
        }
        case RoomActionType.CHANGE_PAGESIZE: {
            return {...state, pageSize: action.payload}
        }
        case RoomActionType.CHANGE_TOTALCOUNT: {
            return {...state, currentPage: action.payload}

        }

        default: return state;
    }
};
