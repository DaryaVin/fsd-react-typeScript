import { child, get, ref, set, update } from "firebase/database";
import { bdFirebase } from "../firebase";

export const subscriptionAPI = {
  AddSubscription: async (email: string) => { 
    const subscriptionStr: string = (await get(child(ref(bdFirebase), `subscription`))).val();
    if (subscriptionStr) {
      if (!subscriptionStr.split(" ").find((item) => { return item === email })) {
        await update(ref(bdFirebase), { 
          [`subscription`]: subscriptionStr + " " + email,
        }); 
      }
    } else {
      await set(ref(bdFirebase, 'subscription'), email);
    }
   },
  DelSubscription: async (email: string) => { 
    const subscriptionStr: string = (await get(child(ref(bdFirebase), `subscription`))).val();
    if (subscriptionStr) {
      const newSubscriptionStr = subscriptionStr.split(" ").filter((item) => { return item !== email }).join(" ");
      await update(ref(bdFirebase), { 
        [`subscription`]: newSubscriptionStr,
      }); 

    } 
   },
  FetchSubscription: async (email: string) => { 
    const subscriptionStr: string = (await get(child(ref(bdFirebase), `subscription`))).val();
    if (subscriptionStr) {
      return subscriptionStr.split(" ").find((item) => { return item === email });
    } else {
      return false
    }
   },
}