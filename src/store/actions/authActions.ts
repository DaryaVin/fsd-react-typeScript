import { User } from "firebase/auth";
import { Dispatch } from "redux";
import { authAPI } from "../../interfaces/authAPI";
import { AuthAction, AuthActionType, sexType, userInfo } from "../../types/auth";

export const SetAuthWatcher = () => { 
	return async (dispatch:Dispatch<AuthAction>) => { 
		try {
			const callback = (user: User | null) => { 
				dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user});
				if (user) {
					FetchUserInfo(user.uid)(dispatch);
				}
			 }
			 authAPI.SetAuthWatcher(callback);
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code });
		}
	 }
 }

export const CheckAuth = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_AUTH });
			const user = await authAPI.CheckAuth();
			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user});
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code });
		}
	}
}
export const FetchRegistration = (userInfo: userInfo) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_AUTH });
			const user = await authAPI.FetchRegistration(userInfo.email, userInfo.password);

			let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
			delete newUserInfo.password;
			await FetchNewUserInfo(user.uid, newUserInfo)(dispatch);

			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
			dispatch({ type: AuthActionType.CHANGE_PASSWORD, payload: "" });
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code });
		}
	}
};
export const FetchLogin = (email: string, password: string) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_AUTH });
			const user = await authAPI.FetchLogin(email, password);
			console.log(user);
			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
			dispatch({ type: AuthActionType.CHANGE_PASSWORD, payload: "" });
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code });
		}
	}
};
export const FetchLogAut = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_AUTH });
			await authAPI.FetchLogAut();
			await FetchUserInfo()(dispatch);
			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: null });

		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_AUTH__ERROR, payload: error.code });
		}
	}
};
export const FetchNewUserInfo = (userId: string, userInfo: Partial<userInfo>) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_USER_INFO });
			await authAPI.FetchNewUserInfo(userId, userInfo);
			dispatch({ type: AuthActionType.FETCH_USER_INFO__SUCCESS, payload: userInfo });

		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_USER_INFO__ERROR, payload: error.code });
		}
	}
};
export const FetchUserInfo = (userId?: string) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			if (userId) {
				dispatch({ type: AuthActionType.FETCH_USER_INFO });
				const newUserInfo = await authAPI.FetchUserInfo(userId);
				dispatch({ type: AuthActionType.FETCH_USER_INFO__SUCCESS, payload: newUserInfo });
			} else {
				dispatch({ type: AuthActionType.FETCH_USER_INFO__SUCCESS, payload: null });
			}
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_USER_INFO__ERROR, payload: error.code });
		}
	}
};
export const UpdateUserInfo = (userId: string, userInfo: userInfo) => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			if (userId) {
				dispatch({ type: AuthActionType.FETCH_USER_INFO });
				await authAPI.UpdateUserInfo(userId, userInfo);
				dispatch({ type: AuthActionType.FETCH_USER_INFO__SUCCESS, payload: userInfo });
			} else {
				dispatch({ type: AuthActionType.FETCH_USER_INFO__SUCCESS, payload: null });
			}
		} catch (e) {
			const error = JSON.parse(JSON.stringify(e));
			dispatch({ type: AuthActionType.FETCH_USER_INFO__ERROR, payload: error.code });
		}
	}
};
export function ChangeEmailAction(payload: string) {
	return {
		type: AuthActionType.CHANGE_EMAIL,
		payload,
	}
}
export function ChangePasswordAction(payload: string) {
	return {
		type: AuthActionType.CHANGE_PASSWORD,
		payload,
	}
}
export function ChangeFirstNameAction(payload: string) {
	return {
		type: AuthActionType.CHANGE_FIRSTNAME,
		payload,
	}
}
export function ChangeLastNameAction(payload: string) {
	return {
		type: AuthActionType.CHANGE_LASTNAME,
		payload,
	}
}
export function ChangeSexAction(payload: sexType) {
	return {
		type: AuthActionType.CHANGE_SEX,
		payload,
	}
}
export function ChangeDateBirthdayAction(payload: Date | null) {
	return {
		type: AuthActionType.CHANGE_DATEBIRTHDAY,
		payload,
	}
}
export function ChangeIsSubscriptionAction(payload: boolean) {
	return {
		type: AuthActionType.CHANGE_ISSUBSCRIPTION,
		payload,
	}
}
