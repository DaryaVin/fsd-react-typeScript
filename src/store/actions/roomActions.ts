import { async } from "@firebase/util";
import axios from "axios";
import { child, get, ref, set } from "firebase/database";
import { Dispatch } from "redux";
import { bdFirebase } from "../../firebase";
import { RoomsAPI } from "../../interfaces/roomsAPI";
import { settings } from "../../types/filterRooms";
import { RoomAction, RoomActionType, RoomItem } from "../../types/rooms";

export const FetchRooms = (filterSettings: settings, pageSize: number, currentPage: number) => {
    return async (dispatch: Dispatch<RoomAction>) => {
        try {
            dispatch({ type: RoomActionType.FETCH_ROOMS });
            const payload = await RoomsAPI.FetchRooms(filterSettings, pageSize, currentPage);

            dispatch({ type: RoomActionType.FETCH_ROOMS__SUCCESS, payload});

        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({ type: RoomActionType.FETCH_ROOMS__ERROR, payload: error.code });
        }
    }
}

export const ChangeCurrentPage = (currentPage: number) => {
    return {
		type: RoomActionType.CHANGE_CURRENTPAGE,
		payload: currentPage,
	}
 }

//  export const FetchRoomItem = async (roomId: string) => {
//     return await RoomsAPI.FetchRoomItem(roomId);
//   }

// export const fetchRooms = ()=> {
//     return async (dispatch: Dispatch<RoomAction>) => {
//         try {
//           dispatch({ type: RoomActionType.FETCH_ROOMS });
//           const dbRef = await ref(bdFirebase);
//           const designations = await get(child(dbRef, `rooms`));
//           const designationsJSON = JSON.parse(JSON.stringify(designations));
//           const newDesignations = {
//             rules: Object.values(designationsJSON.rules),
//             facility: Object.values(designationsJSON.facility),
//             equipment: Object.values(designationsJSON.equipment),
//           }
//           console.log("designations: ",newDesignations);

//           dispatch({ type: RoomActionType.FETCH_ROOMS__SUCCESS, payload:  });
//         } catch (e) {
//           const error = JSON.parse(JSON.stringify(e));
//           dispatch({ type: RoomActionType.FETCH_ROOMS__ERROR, payload: error.code });
//         }
//       }


// return async (dispatch: Dispatch<RoomAction>) => {
//     try {
//         dispatch({type: RoomActionType.FETCH_ROOMS});
//         const respons = await axios.get("localhost:3000/products");
//         dispatch({type:RoomActionType.FETCH_ROOMS__SUCCESS, payload: respons.data});
//     } catch (e) {
//         dispatch({
//             type: RoomActionType.FETCH_ROOMS__ERROR,
//             payload: "Произошла ошибка при попытке получить спислк комнат с сервера",
//         })
//     };
// }
// };

// export const baseFillingRooms = (roomId: string) => {
//     return async () => {
//         try {
//             const rules = ["rule1", "rule2", "rule3"];
//     const facilities = ["facility1", "facility2"];
//     const equipments = [
//       "equipment1",
//       "equipment2",
//       "equipment3",
//       "equipment4",
//       "equipment5",
//       "equipment6",
//       "equipment7",
//     ]

//     const roomItem: RoomItem = {
//       id: roomId,
//       name: "№" + roomId,
//       price: Math.floor((Math.random() + 0.1) * 10000),
//       reviews: [],
//       roomConditions: {
//         sleepingArea: 0,
//         bathrooms: 0,
//         beds: 0,
//         bedrooms: 0,
//         roomRules: [],
//         facilitiesInRoom: [],
//         equipmentInRoom: [],
//       }
//     };
//     if (roomItem.price > 7000) {
//       roomItem.isLux = Math.random() > 0.5;
//       if (roomItem.isLux) {
//         roomItem.roomConditions.sleepingArea = Math.round((Math.random() + 0.1) * 4);
//         roomItem.roomConditions.bedrooms = Math.round(roomItem.roomConditions.sleepingArea / 2) !== 0 ? Math.round(roomItem.roomConditions.sleepingArea / 2) : roomItem.roomConditions.sleepingArea;
//         roomItem.roomConditions.bathrooms = Math.round(roomItem.roomConditions.sleepingArea / 3) !== 0 ? Math.round(roomItem.roomConditions.sleepingArea / 3) : roomItem.roomConditions.sleepingArea;
//       } else {
//         roomItem.roomConditions.bathrooms = 1;
//         roomItem.roomConditions.sleepingArea = Math.round((Math.random() + 0.5) * 4);
//         roomItem.roomConditions.bedrooms = roomItem.roomConditions.sleepingArea > 3 ? Math.round(Math.random() + 1) : 1;
//       }
//     } else {
//       roomItem.roomConditions.bathrooms = 1;
//       roomItem.roomConditions.bedrooms = 1;
//       roomItem.roomConditions.sleepingArea = Math.round(roomItem.price * (Math.random() + 1) / 2000);
//     }
//     roomItem.roomConditions.beds = Math.ceil(roomItem.roomConditions.sleepingArea * Math.floor(10 * (0.5 + Math.random() * 0.5))/10);
//     rules.forEach((item) => {
//       if (Math.random() > 0.7) {
//         roomItem.roomConditions.roomRules?.push(item);
//       }
//      })
//      facilities.forEach((item) => {
//       if (Math.random() > 0.7) {
//         roomItem.roomConditions.facilitiesInRoom?.push(item);
//       }
//      })
//      equipments.forEach((item) => {
//       if (Math.random() > 0.7) {
//         roomItem.roomConditions.equipmentInRoom?.push(item);
//       }
//      })
//             await set(ref(bdFirebase, 'rooms/' + roomId), { ...roomItem});
//             console.log("FETCH_ROOMS__SUCCESS: ", roomId);

//         }
//         catch (e) {
//             console.log("FETCH_ROOMS__ERROR: ", roomId);

//         }
//     }
// }
