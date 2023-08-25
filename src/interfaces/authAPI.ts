import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { child, get, ref, set, update } from "firebase/database";
import { authFirebase, bdFirebase } from "../firebase";
import { userInfo } from "../types/auth";
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
    await set(ref(bdFirebase, 'users/' + userId), { ...userInfo, dateBirthday: userInfo.dateBirthday?.toString() });
  },
  FetchUserInfo: async (userId: string) => {
    const dbRef = await ref(bdFirebase);
    const userInfo = await get(child(dbRef, `users/${userId}`));
    return { ...userInfo.val(), dateBirthday: new Date(userInfo.val().dateBirthday) };
  },
  UpdateUserInfo: async (userId: string, userInfo: userInfo) => {
    const dbRef = await ref(bdFirebase);
    let newUserInfo: Partial<userInfo> = Object.assign(userInfo);
    delete newUserInfo.password;
    await update(dbRef, { [`users/${userId}`]: { ...newUserInfo } });
  },
  FetchRegistration: async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(authFirebase, email, password);
    return user;
  }
}
