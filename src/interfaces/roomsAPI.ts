import { child, get, ref } from "firebase/database";
import { bdFirebase } from "../firebase";
import { settings } from "../types/filterRooms";
import { RoomItem } from "../types/rooms";

export const RoomsAPI = {
  FetchRooms: async (filterSettings: settings, pageSize: number, currentPage: number) => {
    const dbRef = await ref(bdFirebase);
    const rooms = await get(child(dbRef, `rooms`)).then((item) => {
      const rooms: any[] = Object.values(JSON.parse(JSON.stringify(item)));
      return rooms.map((roomItem) => {
        const room: RoomItem = {
          ...roomItem,
          roomConditions: {
            ...roomItem.roomConditions,
            roomRules: roomItem.roomConditions.roomRules ? Object.values(roomItem.roomConditions.roomRules) : roomItem.roomConditions.roomRules,
            facilitiesInRoom: roomItem.roomConditions.facilitiesInRoom ? Object.values(roomItem.roomConditions.facilitiesInRoom) : roomItem.roomConditions.facilitiesInRoom,
            equipmentInRoom: roomItem.roomConditions.equipmentInRoom ? Object.values(roomItem.roomConditions.equipmentInRoom) : roomItem.roomConditions.equipmentInRoom,
          }
        }
        return room
      }).filter((room) => {
        let filterResult = true;
        if (filterSettings.beds > room.roomConditions.beds) filterResult = false;
        if (filterSettings.bedrooms > room.roomConditions.bedrooms) filterResult = false;
        if (filterSettings.bathrooms > room.roomConditions.bathrooms) filterResult = false;
        if (
          filterSettings.priceRange
          && (
            filterSettings.priceRange.min > room.price
            || filterSettings.priceRange.max < room.price
          )
        ) filterResult = false;

        if (filterSettings.roomRules) {
          filterSettings.roomRules.forEach((rule) => {
            if (!room.roomConditions.roomRules?.includes(rule)) filterResult = false;
          })
        }
        if (filterSettings.facilitiesInRoom) {
          filterSettings.facilitiesInRoom.forEach((facility) => {
            if (!room.roomConditions.facilitiesInRoom?.includes(facility)) filterResult = false;
          })
        }
        if (filterSettings.equipmentInRoom) {
          filterSettings.equipmentInRoom.forEach((equipment) => {
            if (!room.roomConditions.equipmentInRoom?.includes(equipment)) filterResult = false;
          })
        }
        if (filterSettings.sleepingArea > room.roomConditions.sleepingArea) filterResult = false;
        return filterResult;
      })
    });
    // console.log("RoomsAPI",rooms);

    const roomsItems: RoomItem[] = Object.values(JSON.parse(JSON.stringify(rooms)));
    let roomsItemsWithPagination:  RoomItem[] = [];
    const newCurrentPage = pageSize * (currentPage - 1) > roomsItems.length ? 1 : currentPage;
    for (let index = pageSize * (newCurrentPage - 1); index < pageSize * newCurrentPage && index < roomsItems.length; index++) {
      roomsItemsWithPagination.push(roomsItems[index]);
    }

    return{
      rooms: roomsItemsWithPagination,
      totalCount: roomsItems.length,
      newCurrentPage,
    };
  }
}
