import { RoomListAction, RoomListActionType, RoomListState } from "../../types/rooms";

const initialState: RoomListState = {
    totalCount: 0,
    pageSize: 12,
    currentPage: 1,
    rooms: [],
    isLoading: false,
    error: null,
};

export const roomListReducer = (state: RoomListState = initialState, action: RoomListAction): RoomListState | undefined => {
    switch (action.type) {
        case RoomListActionType.FETCH_ROOMS: {
            return {...state, isLoading: true, error: null};
        }
        case RoomListActionType.FETCH_ROOMS__SUCCESS: {
            return {...state, isLoading: false, rooms: action.payload.rooms, totalCount: action.payload.totalCount, currentPage: action.payload.newCurrentPage};
        }
        case RoomListActionType.FETCH_ROOMS__ERROR: {
            return {...state, isLoading: false, error: action.payload};
        }
        case RoomListActionType.CHANGE_CURRENTPAGE: {
            return {...state, currentPage: action.payload}
        }
        case RoomListActionType.CHANGE_PAGESIZE: {
            return {...state, pageSize: action.payload}
        }
        case RoomListActionType.CHANGE_TOTALCOUNT: {
            return {...state, currentPage: action.payload}

        }

        default: return state;
    }
};
