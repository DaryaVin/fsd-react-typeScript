import axios from "axios";
import { Dispatch } from "redux";
import { RoomAction, RoomActionType } from "../../types/rooms";

export const fetchRooms = ()=> {
    return async (dispatch: Dispatch<RoomAction>) => {
        try {
            dispatch({type: RoomActionType.FETCH_ROOMS});
            const respons = await axios.get("localhost:3000/products");
            dispatch({type:RoomActionType.FETCH_ROOMS__SUCCESS, payload: respons.data});
        } catch (e) {
            dispatch({
                type: RoomActionType.FETCH_ROOMS__ERROR,
                payload: "Произошла ошибка при попытке получить спислк комнат с сервера",
            })
        };
    }
};