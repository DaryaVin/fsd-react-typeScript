import { AuthState, AuthAction, AuthActionType } from "../../types/auth";

const initialState: AuthState = {
    userInfo: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        sex: undefined,
        dateBirthday: null,
        isSubscription: false,
    },
    isLoading: false,
    auth: null,
    error: null,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState | undefined => {
    switch (action.type) {
        case AuthActionType.FETCH_AUTH: {
            return { ...state, isLoading: true, error: null };
        }
        case AuthActionType.FETCH_AUTH__SUCCESS: {
            return { ...state, isLoading: false, error: null, auth: action.payload };
        }
        case AuthActionType.FETCH_AUTH__ERROR: {
            return { ...state, isLoading: false, error: { message: action.payload, userInfo: state.userInfo } , auth: null };
        }
        case AuthActionType.CHANGE_EMAIL: {
            return { ...state, userInfo: { ...state.userInfo, email: action.payload } }
        }
        case AuthActionType.CHANGE_PASSWORD: {
            return { ...state, userInfo: { ...state.userInfo, password: action.payload } }
        }
        case AuthActionType.CHANGE_FIRSTNAME: {
            return { ...state, userInfo: { ...state.userInfo, firstName: action.payload } }
        }
        case AuthActionType.CHANGE_LASTNAME: {
            return { ...state, userInfo: { ...state.userInfo, lastName: action.payload } }
        }
        case AuthActionType.CHANGE_SEX: {
            return { ...state, userInfo: { ...state.userInfo, sex: action.payload } }
        }
        case AuthActionType.CHANGE_DATEBIRTHDAY: {
            return { ...state, userInfo: { ...state.userInfo, dateBirthday: action.payload } }
        }
        case AuthActionType.CHANGE_ISSUBSCRIPTION: {
            return { ...state, userInfo: { ...state.userInfo, isSubscription: action.payload } }
        }
        case AuthActionType.FETCH_USER_INFO: {
            return { ...state, isLoading: true, error: null };
        }
        case AuthActionType.FETCH_USER_INFO__SUCCESS: {
            if (action.payload === null || action.payload === undefined) {
                return { ...state, isLoading: false, error: null, userInfo: initialState.userInfo, }
            }
            const newUserInfo = action.payload.password ? {...action.payload} : {...action.payload, password: ""}
            return { ...state, isLoading: false, error: null, userInfo: newUserInfo, };
        }
        case AuthActionType.FETCH_USER_INFO__ERROR: {
            return { ...state, isLoading: false, error:{ message: action.payload, userInfo: state.userInfo } };
        }
        default: return state;
    }
};
