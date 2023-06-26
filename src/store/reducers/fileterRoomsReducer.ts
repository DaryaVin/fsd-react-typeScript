import { FilterRoomsAction, FilterRoomsActionType, FilterRoomsState } from "../../types/filterRooms";

const initialState: FilterRoomsState = {
  designations: {
    rules: [],
    facility: [],
      equipment: [],
  },
  settings: {
    stayDates: {
      start: null,
      end: null,
    },
    numberOfGuests: {
      adults: 0,
      children: 0,
      babies: 0,
    },
    priceRange: null,
    sleepingArea: 0,
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    roomRules: [],
    facilitiesInRoom: [],
    equipmentInRoom: [],
  },
  isLoading: false,
  error: null,
}

export const filterRoomsReducer = (state: FilterRoomsState = initialState, action: FilterRoomsAction): FilterRoomsState | undefined => {
  switch (action.type) {
    case FilterRoomsActionType.FETCH_DESIGNATIONS: {
      return { ...state, isLoading: true, error: null };
    }
    case FilterRoomsActionType.FETCH_DESIGNATIONS__SUCCESS: {
      return { ...state, isLoading: false, error: null, designations: action.payload };
    }
    case FilterRoomsActionType.FETCH_DESIGNATIONS__ERROR: {
      return { ...state, isLoading: false, error: action.payload, designations: null };
    }
    case FilterRoomsActionType.CHANGE_STAYDATES: {
      return { ...state, settings: { ...state.settings, stayDates: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_NUMBEROFGUESTS: {
      return { ...state, settings: { ...state.settings, numberOfGuests: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_PRICERANGE: {
      return { ...state, settings: { ...state.settings, priceRange: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_SLEEPINGAREA: {
      return { ...state, settings: { ...state.settings, sleepingArea: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_BEDS: {
      return { ...state, settings: { ...state.settings, beds: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_BEDROOMS: {
      return { ...state, settings: { ...state.settings, bedrooms: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_BATHROOMS: {
      return { ...state, settings: { ...state.settings, bathrooms: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_EQUIPMENT: {
      return { ...state, settings: { ...state.settings, equipmentInRoom: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_FACILITIES: {
      return { ...state, settings: { ...state.settings, facilitiesInRoom: action.payload } };
    }
    case FilterRoomsActionType.CHANGE_ROOMRULES: {
      return { ...state, settings: { ...state.settings, roomRules: action.payload } };
    }
    default: return state;
  }
};
