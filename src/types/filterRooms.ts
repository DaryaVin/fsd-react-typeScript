import { settings } from "firebase/analytics";

interface roomRuleItem {
  id: string,
  name: string,
  description?: string,
}
interface facilityRoomItem {
  id: string,
  name: string,
  description: string,
}
interface equipmentInRoomItem {
  id: string,
  name: string,
}
export interface designations {
  unitPrice?: string,
  serviceFee: number,
  minPrice: number,
  maxPrice: number,
  minDate?: Date,
  maxDate?: Date,
  rules: roomRuleItem[],
  facility: facilityRoomItem[],
  equipment: equipmentInRoomItem[],
}
export interface roomConditions {
  sleepingArea: number,
  beds: number,
  bedrooms: number,
  bathrooms: number,
  roomRules?: string[],
  facilitiesInRoom?: string[],
  equipmentInRoom?: string[],
}
export interface settings extends roomConditions{
  stayDates: {
    start: Date | null,
    end: Date | null,
  },
  numberOfGuests: {
    adults: number,
    children: number,
    babies: number,
  },
  priceRange: {
    min: number,
    max: number,
  } | null,
}
export interface FilterRoomsState {
  designations: designations | null,
  settings: settings;
  isLoading: boolean;
  error: null | string;
};

export enum FilterRoomsActionType {
  FETCH_DESIGNATIONS = "FETCH_DESIGNATIONS",
  FETCH_DESIGNATIONS__SUCCESS = "FETCH_DESIGNATIONS__SUCCESS",
  FETCH_DESIGNATIONS__ERROR = "FETCH_DESIGNATIONS__ERROR",
  CHANGE_STAYDATES = "CHANGE_STAYDATES",
  CHANGE_NUMBEROFGUESTS = "CHANGE_NUMBEROFGUESTS",
  CHANGE_PRICERANGE = "CHANGE_PRICERANGE",
  CHANGE_BEDS = "CHANGE_BEDS",
  CHANGE_SLEEPINGAREA = "CHANGE_SLEEPINGAREA",
  CHANGE_BEDROOMS = "CHANGE_BEDROOMS",
  CHANGE_BATHROOMS = "CHANGE_BATHROOMS",
  CHANGE_ROOMRULES = "CHANGE_ROOMRULES",
  CHANGE_FACILITIES = "CHANGE_FACILITIES",
  CHANGE_EQUIPMENT = "CHANGE_EQUIPMENT",
}

interface FetchDesignationsAction {
  type: FilterRoomsActionType.FETCH_DESIGNATIONS;
}
interface FetchDesignationsSuccessAction {
  type: FilterRoomsActionType.FETCH_DESIGNATIONS__SUCCESS;
  payload: any;
}
interface FetchDesignationsErrorAction {
  type: FilterRoomsActionType.FETCH_DESIGNATIONS__ERROR;
  payload: string;
}
interface ChangeStayDates {
  type: FilterRoomsActionType.CHANGE_STAYDATES;
  payload: {
    start: Date | null,
    end: Date | null,
  };
}
interface ChangeNumberOfGuests {
  type: FilterRoomsActionType.CHANGE_NUMBEROFGUESTS;
  payload: {
    adults: number,
    children: number,
    babies: number,
  };
}
interface ChangePriceRange {
  type: FilterRoomsActionType.CHANGE_PRICERANGE;
  payload: {
    min: number,
    max: number,
  } | null;
}
interface ChangeBeds {
  type: FilterRoomsActionType.CHANGE_BEDS;
  payload: number;
}
interface ChangeSleepingArea {
  type: FilterRoomsActionType.CHANGE_SLEEPINGAREA;
  payload: number;
}
interface ChangeBedrooms {
  type: FilterRoomsActionType.CHANGE_BEDROOMS;
  payload: number;
}
interface ChangeBathrooms {
  type: FilterRoomsActionType.CHANGE_BATHROOMS;
  payload: number;
}
interface ChangeRoomRules {
  type: FilterRoomsActionType.CHANGE_ROOMRULES;
  payload: string[];
}
interface ChangeFacilities {
  type: FilterRoomsActionType.CHANGE_FACILITIES;
  payload: string[];
}
interface ChangeEquipment {
  type: FilterRoomsActionType.CHANGE_EQUIPMENT;
  payload: string[];
}


export type FilterRoomsAction = FetchDesignationsAction
| FetchDesignationsSuccessAction
| FetchDesignationsErrorAction
| ChangeStayDates
| ChangeNumberOfGuests
| ChangePriceRange
| ChangeSleepingArea
| ChangeBeds
| ChangeBedrooms
| ChangeBathrooms
| ChangeRoomRules
| ChangeEquipment
| ChangeFacilities;
