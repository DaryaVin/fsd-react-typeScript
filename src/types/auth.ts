import { User } from "firebase/auth";

export type sexType = "male" | "female";
export interface userInfo {
  email: string ,
  password: string,
  firstName?: string,
  lastName?: string,
  sex?: sexType | null,
  dateBirthday?: Date | null,
  isSubscription?: boolean,
}
export interface AuthState {
  userInfo: userInfo,
  auth: User | null,
  isLoading: boolean,
  error: {
    message: string,
    userInfo: userInfo,
  } | null,
}
export enum AuthActionType {
  FETCH_AUTH = "FETCH_AUTH",
  FETCH_AUTH__SUCCESS = "FETCH_AUTH_SUCCESS",
  FETCH_AUTH__ERROR = "FETCH_AUTH__ERROR",
  CHANGE_EMAIL = "CHANGE_EMAIL",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_FIRSTNAME = "CHANGE_FIRSTNAME",
  CHANGE_LASTNAME = "CHANGE_LASTNAME",
  CHANGE_SEX = "CHANGE_SEX",
  CHANGE_DATEBIRTHDAY = "CHANGE_DATEBIRTHDAY",
  CHANGE_ISSUBSCRIPTION = "CHANGE_ISSUBSCRIPTION",
  FETCH_USER_INFO = "FETCH_USER_INFO",
  FETCH_USER_INFO__SUCCESS = "FETCH_USER_INFO__SUCCESS",
  FETCH_USER_INFO__ERROR = "FETCH_USER_INFO__ERROR",
}

interface FetchAuthAction {
  type: AuthActionType.FETCH_AUTH;
}
interface FetchAuthSuccessAction {
  type: AuthActionType.FETCH_AUTH__SUCCESS;
  payload: User | null;
}
interface FetchAuthErrorAction {
  type: AuthActionType.FETCH_AUTH__ERROR;
  payload: string;
}
interface ChangeEmailAction {
  type: AuthActionType.CHANGE_EMAIL;
  payload: string;
}
interface ChangePasswordAction {
  type: AuthActionType.CHANGE_PASSWORD;
  payload: string;
}
interface ChangeFirstnameAction {
  type: AuthActionType.CHANGE_FIRSTNAME;
  payload: string;
}
interface ChangeLastnameAction {
  type: AuthActionType.CHANGE_LASTNAME;
  payload: string;
}
interface ChangeSexAction {
  type: AuthActionType.CHANGE_SEX;
  payload: sexType;
}
interface ChangeDateBirthdayAction {
  type: AuthActionType.CHANGE_DATEBIRTHDAY;
  payload: Date | null;
}
interface ChangeIsSubscriptionAction {
  type: AuthActionType.CHANGE_ISSUBSCRIPTION;
  payload: boolean;
}
interface FetchUserInfoAction {
  type: AuthActionType.FETCH_USER_INFO;
}
interface FetchUserInfoSuccessAction {
  type: AuthActionType.FETCH_USER_INFO__SUCCESS;
  payload: any;
}
interface FetchUserInfoErrorAction {
  type: AuthActionType.FETCH_USER_INFO__ERROR;
  payload: string;
}
export type AuthAction =
FetchAuthAction
| FetchAuthSuccessAction
| FetchAuthErrorAction
| ChangeEmailAction
| ChangePasswordAction
| ChangeFirstnameAction
| ChangeLastnameAction
| ChangeSexAction
| ChangeDateBirthdayAction
| ChangeIsSubscriptionAction
| FetchUserInfoAction
| FetchUserInfoSuccessAction
| FetchUserInfoErrorAction;
