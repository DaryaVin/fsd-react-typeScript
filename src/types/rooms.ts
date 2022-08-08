export interface RoomState {
    rooms: any[];
    loading: boolean;
    error: null | string;
};

export enum RoomActionType {
    FETCH_ROOMS = "FETCH_ROOMS",
    FETCH_ROOMS__SUCCESS = "FETCH_ROOMS__SUCCESS",
    FETCH_ROOMS__ERROR = "FETCH_ROOMS__ERROR",
}

interface FetchRoomsAction {
    type: RoomActionType.FETCH_ROOMS;
}
interface FetchRoomsSuccessAction {
    type: RoomActionType.FETCH_ROOMS__SUCCESS;
    payload: any[];
}
interface FetchRoomsErrorAction {
    type: RoomActionType.FETCH_ROOMS__ERROR;
    payload: string;
}
export type RoomAction = FetchRoomsAction | FetchRoomsSuccessAction | FetchRoomsErrorAction;