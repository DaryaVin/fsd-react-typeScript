import { User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { child, get, ref, set, update } from "firebase/database";
import { authFirebase, bdFirebase } from "../firebase";
import { userInfo } from "../types/auth";
import { subscriptionAPI } from "./subscriptionAPI";
export const authAPI = {
  SetAuthWatcher: (callback: (u: User | null) => void) => {
    authFirebase.onAuthStateChanged((u) => {
      callback(u);
    })
  },
  CheckAuth: async () => {
    const user: User | null = await authFirebase.currentUser;
    return user;
  },
  FetchLogin: async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(authFirebase, email, password);
    return user;
  },
  FetchLogAut: async () => {
    await signOut(authFirebase);
  },
  FetchNewUserInfo: async (userId: string, userInfo: Partial<userInfo>) => {
    if (userInfo.email) {
      if (userInfo.isSubscription) {
        subscriptionAPI.AddSubscription(userInfo.email);
      } else {
        subscriptionAPI.DelSubscription(userInfo.email);
      }
    }
    let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
    delete newUserInfo.isSubscription;
    await set(ref(bdFirebase, 'users/' + userId), { ...userInfo, dateBirthday: userInfo.dateBirthday?.toString() });
  },
  FetchUserInfo: async (userId: string) => {
    const dbRef = await ref(bdFirebase);
    const userInfo = await get(child(dbRef, `users/${userId}`));
    const userSubscription = await subscriptionAPI.FetchSubscription(userInfo.val().email);
    return { 
      ...userInfo.val(), 
      dateBirthday: new Date(userInfo.val().dateBirthday), 
      isSubscription: userSubscription,
    };
  },
  UpdateUserInfo: async (userId: string, userInfo: userInfo) => {
    const dbRef = await ref(bdFirebase);
    let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
    if (userInfo.isSubscription) {
      subscriptionAPI.AddSubscription(userInfo.email);
    } else {
      subscriptionAPI.DelSubscription(userInfo.email);
    }
    delete newUserInfo.password;
    delete newUserInfo.isSubscription;
    await update(dbRef, { [`users/${userId}`]: { ...newUserInfo } });
  },
  FetchRegistration: async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(authFirebase, email, password);
    return user;
  },
  SendEmailVerification: async () => {
    const user: User | null = await authFirebase.currentUser;
    if (user !== null) await sendEmailVerification(user).catch((error) => {
      console.log("authAPI SendEmailVerification error", error);
    });
  },
}
