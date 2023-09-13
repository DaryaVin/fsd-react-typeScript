import { Dispatch } from "redux";
import { child, get, ref, set, update } from "firebase/database";
import { bdFirebase } from "../../firebase";
import { FilterRoomsAction, FilterRoomsActionType, numberOfGuests } from "../../types/filterRooms";
import { FilterRoomsAPI } from "../../interfaces/FilterRoomsAPI";

export const FetchDesignations = () => {
  return async (dispatch: Dispatch<FilterRoomsAction>) => {
    try {
      dispatch({ type: FilterRoomsActionType.FETCH_DESIGNATIONS });
      // const dbRef = await ref(bdFirebase);
      // const designations = await get(child(dbRef, `designations`));
      // const designationsJSON = JSON.parse(JSON.stringify(designations));
      // const newDesignations = {
      //   rules: Object.values(designationsJSON.rules),
      //   facility: Object.values(designationsJSON.facility),
      //   equipment: Object.values(designationsJSON.equipment),
      // }
      const newDesignations = await FilterRoomsAPI.FetchDesignations();
      // console.log("designations: ",newDesignations);

      dispatch({ type: FilterRoomsActionType.FETCH_DESIGNATIONS__SUCCESS, payload: newDesignations });
    } catch (e) {
      const error = JSON.parse(JSON.stringify(e));
      dispatch({ type: FilterRoomsActionType.FETCH_DESIGNATIONS__ERROR, payload: error.code });
    }
  }
};

export function ChangeStayDates(payload: {
  start: Date | null,
  end: Date | null,
}) {
  let newPayload = payload;
  if (payload.start && payload.end && (payload.start > payload.end)) {
    newPayload = {
      start: payload.end,
      end: payload.start
    }
  }
  return {
    type: FilterRoomsActionType.CHANGE_STAYDATES,
    payload: newPayload,
  }
}

export function ChangeNumberOfGuests(payload: numberOfGuests) {
  return async (dispatch: Dispatch<FilterRoomsAction>) => {
    try {
      let newPayload = {
        adults: payload.adults < 0 ? 0 : payload?.adults,
        children: payload.children < 0 ? 0 : payload?.children,
        babies: payload.babies < 0 ? 0 : payload?.babies,
      }
      dispatch({ type: FilterRoomsActionType.CHANGE_NUMBEROFGUESTS, payload: newPayload });
      dispatch({ type: FilterRoomsActionType.CHANGE_SLEEPINGAREA, payload: newPayload.adults + newPayload.children });
    } catch (e) {
      const error = JSON.parse(JSON.stringify(e));
      dispatch({ type: FilterRoomsActionType.FETCH_DESIGNATIONS__ERROR, payload: error.code });
    }
  }
}
export function ChangePriceRange(payload: {
  min: number,
  max: number,
}) {
  return {
    type: FilterRoomsActionType.CHANGE_PRICERANGE,
    payload,
  }
}
export function ChangeBeds(payload: number) {
  return {
    type: FilterRoomsActionType.CHANGE_BEDS,
    payload,
  }
}
export function ChangeBedrooms(payload: number) {
  return {
    type: FilterRoomsActionType.CHANGE_BEDROOMS,
    payload,
  }
}
export function ChangeBathrooms(payload: number) {
  return {
    type: FilterRoomsActionType.CHANGE_BATHROOMS,
    payload,
  }
}
export function ChangeRoomRules(payload: string[]) {
  return {
    type: FilterRoomsActionType.CHANGE_ROOMRULES,
    payload,
  }
}
export function ChangeFacilities(payload: string[]) {
  return {
    type: FilterRoomsActionType.CHANGE_FACILITIES,
    payload,
  }
}
export function ChangeEquipment(payload: string[]) {
  return {
    type: FilterRoomsActionType.CHANGE_EQUIPMENT,
    payload,
  }
}
