import { roomConditions } from "./filterRooms";

export interface ReviewItem {
	id: string,
	authorId: string,
	authorName?: string,
	authorPhotoURL?: string,
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
export interface RoomListState {
	rooms: RoomItem[];
	totalCount: number,
	pageSize: number,
	currentPage: number,
	isLoading: boolean,
	error: null | string,
};
export interface RoomState {
	roomItem: RoomItem | null,
	isLoading: boolean,
	error: null | string,
};
export enum RoomListActionType {
	FETCH_ROOMS = "FETCH_ROOMS",
	FETCH_ROOMS__SUCCESS = "FETCH_ROOMS__SUCCESS",
	FETCH_ROOMS__ERROR = "FETCH_ROOMS__ERROR",
	CHANGE_TOTALCOUNT = "CHANGE_TOTALCOUNT",
	CHANGE_CURRENTPAGE = "CHANGE_CURRENTPAGE",
	CHANGE_PAGESIZE = "CHANGE_PAGESIZE",
}

interface FetchRoomsAction {
	type: RoomListActionType.FETCH_ROOMS;
}
interface FetchRoomsSuccessAction {
	type: RoomListActionType.FETCH_ROOMS__SUCCESS;
	payload: {
		rooms:RoomItem[],
		totalCount: number,
		newCurrentPage: number,
	};
}
interface FetchRoomsErrorAction {
	type: RoomListActionType.FETCH_ROOMS__ERROR;
	payload: string;
}
interface ChangeTotalCountAction {
	type: RoomListActionType.CHANGE_TOTALCOUNT;
	payload: number;
}
interface ChangeCurrentPageAction {
	type: RoomListActionType.CHANGE_CURRENTPAGE;
	payload: number;
}
interface ChangePageSizeAction {
	type: RoomListActionType.CHANGE_PAGESIZE;
	payload: number;
}
export type RoomListAction =
	FetchRoomsAction
	| FetchRoomsSuccessAction
	| FetchRoomsErrorAction
	| ChangeTotalCountAction
	| ChangeCurrentPageAction
	| ChangePageSizeAction;
