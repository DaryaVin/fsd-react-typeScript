import { roomConditions } from "./filterRooms";

export interface ReviewItem {
	id: string,
	authorName: string,
	dateToCreating: Date,
	content: string,
	listWhoLikedThisReview: string[] | null,
	appraisal: 1 | 2 | 3 | 4 | 5,
}
export interface RoomItem {
	id: string | number,
	name: string,
	price: number,
	isLux?: boolean,
	reviews?: ReviewItem[],
	photos?: string[],
	roomConditions: roomConditions,
};
export interface RoomState {
	rooms: RoomItem[];
	totalCount: number,
	pageSize: number,
	currentPage: number,
	isLoading: boolean;
	error: null | string;
};

export enum RoomActionType {
	FETCH_ROOMS = "FETCH_ROOMS",
	FETCH_ROOMS__SUCCESS = "FETCH_ROOMS__SUCCESS",
	FETCH_ROOMS__ERROR = "FETCH_ROOMS__ERROR",
	CHANGE_TOTALCOUNT = "CHANGE_TOTALCOUNT",
	CHANGE_CURRENTPAGE = "CHANGE_CURRENTPAGE",
	CHANGE_PAGESIZE = "CHANGE_PAGESIZE",
}

interface FetchRoomsAction {
	type: RoomActionType.FETCH_ROOMS;
}
interface FetchRoomsSuccessAction {
	type: RoomActionType.FETCH_ROOMS__SUCCESS;
	payload: {
		rooms:RoomItem[],
		totalCount: number,
		newCurrentPage: number,
	};
}
interface FetchRoomsErrorAction {
	type: RoomActionType.FETCH_ROOMS__ERROR;
	payload: string;
}
interface ChangeTotalCountAction {
	type: RoomActionType.CHANGE_TOTALCOUNT;
	payload: number;
}
interface ChangeCurrentPageAction {
	type: RoomActionType.CHANGE_CURRENTPAGE;
	payload: number;
}
interface ChangePageSizeAction {
	type: RoomActionType.CHANGE_PAGESIZE;
	payload: number;
}
export type RoomAction =
	FetchRoomsAction
	| FetchRoomsSuccessAction
	| FetchRoomsErrorAction
	| ChangeTotalCountAction
	| ChangeCurrentPageAction
	| ChangePageSizeAction;
