import { child, get, ref } from "firebase/database";
import { bdFirebase } from "../firebase";
import { designations } from "../types/filterRooms";

export const FilterRoomsAPI = {
  FetchDesignations: async () => {
    const dbRef = await ref(bdFirebase);
    const designations = await get(child(dbRef, `designations`));
    const minMaxPrice: {minPrice: number, maxPrice: number} = await get(child(dbRef, `rooms`)).then((item) => {
      const rooms: any[] = Object.values(JSON.parse(JSON.stringify(item)));
      return rooms.reduce((minMaxPrice, room) => {
        let { minPrice, maxPrice } = minMaxPrice;
        if (room.price < minPrice) minPrice = room.price;
        if (room.price > maxPrice) maxPrice = room.price;
        return {
          minPrice,
          maxPrice,
        }
      }, { minPrice: Infinity, maxPrice: 0 });
    });


    let designationsJSON: Partial<designations>  = JSON.parse(JSON.stringify(designations));
    if (designationsJSON.minDate) {
      designationsJSON.minDate = new Date(designationsJSON.minDate);
    } else {
      designationsJSON.minDate = new Date();
    }
    if (designationsJSON.maxDate) {
      designationsJSON.maxDate = new Date(designationsJSON.maxDate);
    } else {
      designationsJSON.maxDate = new Date(designationsJSON.minDate.getFullYear() + 1, designationsJSON.minDate.getMonth(), designationsJSON.minDate.getDate());
    }
    designationsJSON = {
      ...designationsJSON,
      ...minMaxPrice,

      rules: designationsJSON.rules ? Object.values(designationsJSON.rules) : [],
      facility: designationsJSON.facility ? Object.values(designationsJSON.facility) : [],
      equipment: designationsJSON.equipment ? Object.values(designationsJSON.equipment) : [],
    };
    return designationsJSON as designations;
  }
}
