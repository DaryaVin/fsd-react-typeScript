import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as RoomActionsCreator from "../store/actions/roomsListActions";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(RoomActionsCreator, dispatch);
}