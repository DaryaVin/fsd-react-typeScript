import { child, get, ref, remove, set, update } from "firebase/database";
import { bookingItem } from "../types/booking";
import { authFirebase, bdFirebase } from "../firebase";
import { User } from "firebase/auth";

export const bookingAPI = {
    CreateBooking: async (booking: bookingItem) => {
        await set(ref(bdFirebase, 'bookings/' + booking.id),
            {
                ...booking,
                issueDate: booking.issueDate.toString(),
                departureDate: booking.departureDate.toString(),
                arrivalDate: booking.arrivalDate.toString(),
            }
        );
    },

    FetchBookings: async () => {
        const user: User | null = await authFirebase.currentUser;
        const dbRef = await ref(bdFirebase);
        const bookings: bookingItem[] = [];
        user && await get(child(dbRef, `bookings`)).then((item) => {
            const bookingItems: bookingItem[] = Object.values(JSON.parse(JSON.stringify(item)));
            bookingItems.forEach((booking) => {
                const bookingItem: bookingItem = JSON.parse(JSON.stringify(booking));

                if (bookingItem.userId === user.uid) {
                    bookings.push({
                        ...bookingItem,
                        arrivalDate: new Date(bookingItem.arrivalDate),
                        departureDate: new Date(bookingItem.departureDate),
                        issueDate: new Date(bookingItem.issueDate),
                        guestsInfo: Object.values(bookingItem.guestsInfo),
                    })
                }
            })
        }).catch((error) => {
            console.error(error);
        });

        return bookings as bookingItem[];
    },

    UpdateBooking: async (bookingItem: bookingItem) => {
        const dbRef = await ref(bdFirebase);
        const booking = {...bookingItem};
        delete booking.isLux;
        delete booking.roomName;
        await update(dbRef, { [`bookings/${booking.id}`]: {
            ...booking,
            issueDate: booking.issueDate.toString(),
            departureDate: booking.departureDate.toString(),
            arrivalDate: booking.arrivalDate.toString(),
        } });
    },

    deleteBooking: async (bookingId: string) => {
        const dbRef = await ref(bdFirebase, `bookings/${bookingId}`);
        await remove(dbRef);
    }
}
