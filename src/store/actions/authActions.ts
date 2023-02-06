import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { Dispatch } from "redux";
import { authFirebase } from "../../firebase";
import { AuthAction, AuthActionType, sexType } from "../../types/auth";

export const CheckAuth = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionType.FETCH_AUTH});
            await onAuthStateChanged(authFirebase, (user) => {
                if (!user) {
                    dispatch({type: AuthActionType.FETCH_AUTH__SUCCESS, payload: null });
                } else {
                    dispatch({type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
                }
            });
        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code});
        }
    }
}
export const FetchRegistration = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
      try {
          dispatch({type: AuthActionType.FETCH_AUTH});
          const { user } = await createUserWithEmailAndPassword(authFirebase, email, password);
          dispatch({type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
          dispatch({type: AuthActionType.CHANGE_PASSWORD, payload: ""});

      } catch (e) {
          const error = JSON.parse(JSON.stringify(e));
          dispatch({type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code});
      }
  }
};
export const FetchLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
      try {
          dispatch({type: AuthActionType.FETCH_AUTH});
          const { user } = await signInWithEmailAndPassword(authFirebase, email, password);
          console.log(user);
          dispatch({type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
          dispatch({type: AuthActionType.CHANGE_PASSWORD, payload: ""});
      } catch (e) {
          const error = JSON.parse(JSON.stringify(e));
          dispatch({type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code});
      }
  }
};
export const FetchLogAut = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            dispatch({type: AuthActionType.FETCH_AUTH});
            await signOut(authFirebase);
            dispatch({type: AuthActionType.FETCH_AUTH__SUCCESS, payload: null });

        } catch (e) {
            const error = JSON.parse(JSON.stringify(e));
            dispatch({type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code});
        }
    }
};
export function ChangeEmailAction(payload: string) {
    return {
        type:AuthActionType.CHANGE_EMAIL,
        payload,
    }
}
export function ChangePasswordAction(payload: string) {
    return {
        type:AuthActionType.CHANGE_PASSWORD,
        payload,
    }
}
export function ChangeFirstNameAction(payload: string) {
    return {
        type:AuthActionType.CHANGE_FIRSTNAME,
        payload,
    }
}
export function ChangeLastNameAction(payload: string) {
    return {
        type:AuthActionType.CHANGE_LASTNAME,
        payload,
    }
}
export function ChangeSexAction(payload: sexType) {
    return {
        type:AuthActionType.CHANGE_SEX,
        payload,
    }
}
export function ChangeDateBirthdayAction(payload: Date | null) {
    return {
        type:AuthActionType.CHANGE_DATEBIRTHDAY,
        payload,
    }
}
export function ChangeIsSubscriptionAction(payload: boolean) {
    return {
        type:AuthActionType.CHANGE_ISSUBSCRIPTION,
        payload,
    }
}
