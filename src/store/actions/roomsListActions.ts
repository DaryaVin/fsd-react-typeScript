import { Dispatch } from "redux";
import { RoomsAPI } from "../../interfaces/roomsAPI";
import { settings } from "../../types/filterRooms";
import { RoomItem, RoomListAction, RoomListActionType } from "../../types/rooms";
import { ref, set } from "firebase/database";
import { bdFirebase } from "../../firebase";

export const FetchRooms = (filterSettings: settings, pageSize: number, currentPage: number) => {
    return async (dispatch: Dispatch<RoomListAction>) => {
        try {
            dispatch({ type: RoomListActionType.FETCH_ROOMS });
            const payload = await RoomsAPI.FetchRooms(filterSettings, pageSize, currentPage);

            dispatch({ type: RoomListActionType.FETCH_ROOMS__SUCCESS, payload });

        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({ type: RoomListActionType.FETCH_ROOMS__ERROR, payload: error.code });
        }
    }
}

export const ChangeCurrentPage = (currentPage: number) => {
    return {
        type: RoomListActionType.CHANGE_CURRENTPAGE,
        payload: currentPage,
    }
}

export const baseFillingRooms = (roomId: string) => {
    return async () => {
        try {
            const rules = ["rule1", "rule2", "rule3"];
            const facilities = ["facility1", "facility2"];
            const equipments = [
                "equipment1",
                "equipment2",
                "equipment3",
                "equipment4",
                "equipment5",
                "equipment6",
                "equipment7",
            ]
            const photos = [
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F19485bbd6d6f8fa504fa254cd3f85471.png?alt=media&token=370b2fae-73bb-4c19-a45b-9a7c51e7d105&_gl=1*15yz2al*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUwOTMuNDguMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F190237d9570862add629ca51388cab2f.png?alt=media&token=f3b9d5c4-3fa7-4671-aa8e-8383c40de73d&_gl=1*18lrwv4*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUwOTAuNTEuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F1791c99bdf8b1c98ff3469ad7ae61424.png?alt=media&token=2ea18e66-0ba2-46dc-92af-788bc52bd595&_gl=1*fzey5o*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUwODYuNTUuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F07382bbd82b3d15a2914108aa278b6af.png?alt=media&token=41d8edd1-430c-430e-b17c-55a8eb147261&_gl=1*rrlpqg*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUwODEuNjAuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2Fd523bf8fa987bc74e26a23a8d5711a8a.png?alt=media&token=d252350c-e52c-41d3-b4dc-07696a3608f2&_gl=1*xkz06o*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMzkuMi4wLjA.",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2Fcc01fba653b36e675f65924bdd6828eb.png?alt=media&token=295f337b-c26c-41e7-855d-8475f4131b8f&_gl=1*1ugm830*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMzQuNy4wLjA.",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2Fc196edfce8e208d3d142ceb4cd85380f.png?alt=media&token=a6b1e89f-001f-41c7-bd0f-0ec89574c6f5&_gl=1*17qjumu*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMzAuMTEuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2Fb930b472e8006c33b4f26ab7e130a1da.png?alt=media&token=f9773efd-077c-4314-a9c7-d55af2bbaa9f&_gl=1*rhdei6*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMjMuMTguMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F913678abe8f61f3d02794a875c8f13d6.png?alt=media&token=b289a23e-cc25-440a-8d1c-43862cd1beec&_gl=1*1t7eylh*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMTQuMjcuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F5b146b0b02905e0f276597370834ff82.png?alt=media&token=a0a606a3-c891-47fd-a2d2-d0f762a95e09&_gl=1*xygtjt*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUxMDguMzMuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F413691015542c6a7ba3d4f49fbb5f2b6.png?alt=media&token=ba6827f3-c7fa-4b49-9635-3b5dfd1c3544&_gl=1*5t9mku*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzUwOTcuNDQuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F9c968d70124bb500a18d6fe6e53708de.png?alt=media&token=e9375d1a-5a77-44c9-a846-78c3244f5987&_gl=1*1desjkk*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzU2OTYuMzkuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F2510dccc3aab21597da711673f509391.png?alt=media&token=89313fbd-2918-452d-96d4-71bba97615e1&_gl=1*ppzm8l*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzU2OTEuNDQuMC4w",
                "https://firebasestorage.googleapis.com/v0/b/fsb-db.appspot.com/o/img%2FroomsImg%2F22cccfffd7ffe2872137dc9b0f8b77a1.png?alt=media&token=5bacc4c2-f462-4129-a457-eb144c6cd304&_gl=1*wt4pym*_ga*MTMyNTIzMzYxNi4xNjkyMDkxMTQ1*_ga_CW55HF8NVT*MTY5NzUzMzA3Ni40Ni4xLjE2OTc1MzU2NzguNTcuMC4w",
            ]

            const roomItem: RoomItem = {
                id: roomId,
                name: "№" + roomId,
                price: Math.floor((Math.random() + 0.1) * 10000),
                reviews: [],
                roomConditions: {
                    sleepingArea: 0,
                    bathrooms: 0,
                    beds: 0,
                    bedrooms: 0,
                    roomRules: [],
                    facilitiesInRoom: [],
                    equipmentInRoom: [],
                },
                photos: [],
            };
            if (roomItem.price > 7000) {
                roomItem.isLux = Math.random() > 0.5;
                if (roomItem.isLux) {
                    roomItem.roomConditions.sleepingArea = Math.round((Math.random() + 0.1) * 4);
                    roomItem.roomConditions.bedrooms = Math.round(roomItem.roomConditions.sleepingArea / 2) !== 0 ? Math.round(roomItem.roomConditions.sleepingArea / 2) : roomItem.roomConditions.sleepingArea;
                    roomItem.roomConditions.bathrooms = Math.round(roomItem.roomConditions.sleepingArea / 3) !== 0 ? Math.round(roomItem.roomConditions.sleepingArea / 3) : roomItem.roomConditions.sleepingArea;
                } else {
                    roomItem.roomConditions.bathrooms = 1;
                    roomItem.roomConditions.sleepingArea = Math.round((Math.random() + 0.5) * 4);
                    roomItem.roomConditions.bedrooms = roomItem.roomConditions.sleepingArea > 3 ? Math.round(Math.random() + 1) : 1;
                }
            } else {
                roomItem.roomConditions.bathrooms = 1;
                roomItem.roomConditions.bedrooms = 1;
                roomItem.roomConditions.sleepingArea = Math.round(roomItem.price * (Math.random() + 1) / 2000);
            }
            roomItem.roomConditions.beds = Math.ceil(roomItem.roomConditions.sleepingArea * Math.floor(10 * (0.5 + Math.random() * 0.5)) / 10);
            rules.forEach((item) => {
                if (Math.random() > 0.7) {
                    roomItem.roomConditions.roomRules?.push(item);
                }
            })
            facilities.forEach((item) => {
                if (Math.random() > 0.7) {
                    roomItem.roomConditions.facilitiesInRoom?.push(item);
                }
            })
            equipments.forEach((item) => {
                if (Math.random() > 0.7) {
                    roomItem.roomConditions.equipmentInRoom?.push(item);
                }
            })
            roomItem.photos?.push(photos[+roomId % 14]);
            photos.forEach((item, index) => {
                if (+roomId % 14 !== index && Math.random() > 0.8 ) {
                    roomItem.photos?.push(item);

                }
            })

            await set(ref(bdFirebase, 'rooms/' + roomId), { ...roomItem });
            console.log("FETCH_ROOMS__SUCCESS: ", roomId);

        }
        catch (e) {
            console.log("FETCH_ROOMS__ERROR: ", roomId);

        }
    }
}
