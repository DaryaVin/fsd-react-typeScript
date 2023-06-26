import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { child, get, onValue, ref, set, update } from "firebase/database";
import { Dispatch } from "redux";
import { authFirebase, bdFirebase } from "../../firebase";
import { authAPI } from "../../interfaces/authAPI";
import { AuthAction, AuthActionType, sexType, userInfo } from "../../types/auth";

export const CheckAuth = () => {
	return async (dispatch: Dispatch<AuthAction>) => {
		try {
			dispatch({ type: AuthActionType.FETCH_AUTH });
			const user = await authAPI.CheckAuth();
			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user});
			// await onAuthStateChanged(authFirebase, (user) => {
			// 	if (!user) {
			// 		dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: null });
			// 	} else {
			// 		dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
			// 	}
			// });
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
			// const { user } = await createUserWithEmailAndPassword(authFirebase, userInfo.email, userInfo.password);
			const user = await authAPI.FetchRegistration(userInfo.email, userInfo.password);

			let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
			delete newUserInfo.password;
			await FetchNewUserInfo(user.uid, newUserInfo)(dispatch);

			dispatch({ type: AuthActionType.FETCH_AUTH__SUCCESS, payload: user });
			dispatch({ type: AuthActionType.CHANGE_PASSWORD, payload: "" });
			// return user;
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
			// const { user } = await signInWithEmailAndPassword(authFirebase, email, password);
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
			// await signOut(authFirebase);
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
			// await set(ref(bdFirebase, 'users/' + userId), { ...userInfo, dateBirthday: userInfo.dateBirthday?.toString() });

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
				// const dbRef = await ref(bdFirebase);
				// const userInfo = await get(child(dbRef, `users/${userId}`));
				// const newUserInfo = { ...userInfo.val(), dateBirthday: new Date(userInfo.val().dateBirthday) };
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
				// const dbRef = await ref(bdFirebase);
				// let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
				// delete newUserInfo.password;
				// await update(dbRef, { [`users/${userId}`]: { ...newUserInfo } });
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
