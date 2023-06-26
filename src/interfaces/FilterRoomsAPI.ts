import { child, get, ref } from "firebase/database";
import { bdFirebase } from "../firebase";

export const FilterRoomsAPI = {
  FetchDesignations: async () => {
    const dbRef = await ref(bdFirebase);
    const designations = await get(child(dbRef, `designations`));
    const designationsJSON = JSON.parse(JSON.stringify(designations));
    return {
      rules: Object.values(designationsJSON.rules),
      facility: Object.values(designationsJSON.facility),
      equipment: Object.values(designationsJSON.equipment),
    }
  }
}
