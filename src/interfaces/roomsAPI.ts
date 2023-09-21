import { child, get, ref, set, update } from "firebase/database";
import { bdFirebase } from "../firebase";
import { settings } from "../types/filterRooms";
import { ReviewItem, RoomItem } from "../types/rooms";

export const RoomsAPI = {
  FetchRooms: async (filterSettings: settings, pageSize: number, currentPage: number) => {
    const dbRef = await ref(bdFirebase);
    const rooms = await get(child(dbRef, `rooms`)).then((item) => {
      const rooms: any[] = Object.values(JSON.parse(JSON.stringify(item)));
      return rooms.map((roomItem) => {
        let reviews: ReviewItem[] | undefined = roomItem.reviews ? Object.values(roomItem.reviews) as ReviewItem[] : undefined;
        reviews = reviews?.map((review) => {
          return {
            ...review,
            dateToCreating: new Date(review.dateToCreating),
          }
        });
        let photos: string[] | undefined = roomItem.photos ? Object.values(roomItem.photos) : undefined;
        const room: RoomItem = {
          ...roomItem,
          reviews: reviews,
          photos,
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
    let roomsItemsWithPagination: RoomItem[] = [];
    const newCurrentPage = pageSize * (currentPage - 1) > roomsItems.length ? 1 : currentPage;
    for (let index = pageSize * (newCurrentPage - 1); index < pageSize * newCurrentPage && index < roomsItems.length; index++) {
      roomsItemsWithPagination.push(roomsItems[index]);
    }

    return {
      rooms: roomsItemsWithPagination,
      totalCount: roomsItems.length,
      newCurrentPage,
    };
  },
  FetchRoomItem: async (roomId: string) => {
    const dbRef = await ref(bdFirebase);
    const roomItem: RoomItem = await get(child(dbRef, `rooms/` + roomId)).then((item) => {
      const roomItem: RoomItem = JSON.parse(JSON.stringify(item));
      let reviews: ReviewItem[] | undefined = roomItem.reviews ? Object.values(roomItem.reviews) as ReviewItem[] : undefined;
      reviews = reviews?.map((review) => {
        let listWhoLikedThisReview = review.listWhoLikedThisReview ? Object.values(review.listWhoLikedThisReview) : undefined;
        return {
          ...review,
          dateToCreating: new Date(review.dateToCreating),
          listWhoLikedThisReview: listWhoLikedThisReview ? listWhoLikedThisReview : [],
        }
      })
      let photos: string[] | undefined = roomItem.photos ? Object.values(roomItem.photos) : undefined;

      return {
        ...roomItem,
        reviews,
        photos,
        roomConditions: {
          ...roomItem.roomConditions,
          roomRules: roomItem.roomConditions.roomRules ? Object.values(roomItem.roomConditions.roomRules) : roomItem.roomConditions.roomRules,
          facilitiesInRoom: roomItem.roomConditions.facilitiesInRoom ? Object.values(roomItem.roomConditions.facilitiesInRoom) : roomItem.roomConditions.facilitiesInRoom,
          equipmentInRoom: roomItem.roomConditions.equipmentInRoom ? Object.values(roomItem.roomConditions.equipmentInRoom) : roomItem.roomConditions.equipmentInRoom,
        }
      }
    })
    return roomItem;
  },
  FetchLikeReviews: async (userId: string, roomId: string | number, reviewId: string, listWhoLikedThisReview: string[]) => {
    const dbRef = await ref(bdFirebase);
    let newListWhoLikedThisReview: string[] = [];
    if (listWhoLikedThisReview.includes(userId)) {
      const index = listWhoLikedThisReview.findIndex((item) => {
        return item === userId;
      })
      newListWhoLikedThisReview = [...listWhoLikedThisReview];
      newListWhoLikedThisReview.splice(index, 1);
      console.log("FetchLikeReviews newListWhoLikedThisReview", newListWhoLikedThisReview);

      await update(dbRef, { [`rooms/${roomId}/reviews/${reviewId}/listWhoLikedThisReview`]: newListWhoLikedThisReview });
    } else {
      newListWhoLikedThisReview = [...listWhoLikedThisReview, userId];
      console.log("FetchLikeReviews newListWhoLikedThisReview", newListWhoLikedThisReview);
      await update(dbRef, { [`rooms/${roomId}/reviews/${reviewId}/listWhoLikedThisReview`]: newListWhoLikedThisReview });
    }
    return newListWhoLikedThisReview;
  },

  CreatedRoomReview: async (roomId: string | number, reviewItem: ReviewItem) => {
    await set(ref(bdFirebase, 'rooms/' + roomId + "/reviews/" + reviewItem.id),
      {
        ...reviewItem,
        dateToCreating: reviewItem.dateToCreating.toString(),
      }
    );
  },
}
