import { ref, remove, set, update } from "firebase/database";
import { bookingItem } from "../types/booking";
import { bdFirebase } from "../firebase";

export const bookingAPI = {
    CreateBooking: async (booking: bookingItem) => {
        await set(ref(bdFirebase, 'bookings/' + booking.id), booking);
    },
    FetchBookings: async () => {
        console.log("FetchBookings");
        
    },
    UpdateBooking: async (bookingItem: bookingItem) => {
        const dbRef = await ref(bdFirebase);
        await update(dbRef, { [`bookings/${bookingItem.id}`]: { ...bookingItem } })
    },
    deleteBooking :async (bookingId: string) => {
        const dbRef = await ref(bdFirebase, `bookings/${bookingId}`);
        await remove(dbRef);
    }
}
