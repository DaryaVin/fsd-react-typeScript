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

    FetchBookingsForUser: async () => {
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
        const nowDate = new Date();
        for (let index = 0; index < bookings.length; index++) {
            if (!bookings[index].isPaid
                && nowDate.getTime() - bookings[index].issueDate.getTime() > 1000 * 3600 * 24
            ) {
                await remove(ref(bdFirebase, `bookings/${bookings[index].id}`));
                bookings.splice(index, 1);
            }
        }
        const oldBokings: bookingItem[] = bookings.filter((item) => { return item.status === "booking" && item.arrivalDate < nowDate });
        const oldInProgressBooking: bookingItem[] = bookings.filter((item) => { return item.status === "inProgress" && item.departureDate < nowDate });
        const updates: {
            [key: string]: bookingItem
        } = {};
        oldBokings.forEach((item) => {
            updates["bookings/" + item.id] = {
                ...item,
                status: item.departureDate < nowDate ? "completed" : "inProgress",
            }
        })
        oldInProgressBooking.forEach((item) => {
            updates["bookings/" + item.id] = {
                ...item,
                status: "completed",
            }
        })
        await update(dbRef, updates);
        const idOldBookings = oldBokings.map((item) => { return item.id });
        const idOldInProgressBooking = oldInProgressBooking.map((item) => { return item.id });
        return bookings.map((item) => {
            return idOldBookings.includes(item.id)
                ? { ...item, status: item.departureDate > nowDate ? "completed" : "inProgress" }
                : idOldInProgressBooking.includes(item.id)
                    ? { ...item, status: "completed" }
                    : item;
        }) as bookingItem[];
    },
    FetchBookingsForRoom: async (roomId: string | number) => {
        const dbRef = await ref(bdFirebase);
        const bookings: bookingItem[] = [];
        await get(child(dbRef, `bookings`)).then((item) => {
            const bookingItems: bookingItem[] = Object.values(JSON.parse(JSON.stringify(item)));
            bookingItems.forEach((booking) => {
                const bookingItem: bookingItem = JSON.parse(JSON.stringify(booking));
                if (bookingItem.roomId === roomId) {
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
        const nowDate = new Date();
        for (let index = 0; index < bookings.length; index++) {
            if (!bookings[index].isPaid
                && nowDate.getTime() - bookings[index].issueDate.getTime() > 1000 * 3600 * 24
            ) {
                await remove(ref(bdFirebase, `bookings/${bookings[index].id}`));
                bookings.splice(index, 1);
            }
        }
        const oldBokings: bookingItem[] = bookings.filter((item) => { return item.status === "booking" && item.arrivalDate < nowDate });
        const updates: {
            [key: string]: bookingItem
        } = {};
        oldBokings.forEach((item) => {
            updates["bookings/" + item.id] = {
                ...item,
                status: item.departureDate > nowDate ? "completed" : "inProgress",
            }
        })
        await update(dbRef, updates);
        const idOldBookings = oldBokings.map((item) => { return item.id });
        return bookings.map((item) => {
            return idOldBookings.includes(item.id) ? { ...item, status: item.departureDate > nowDate ? "completed" : "inProgress" } : item;
        }) as bookingItem[];
    },

    UpdateBooking: async (bookingItem: bookingItem) => {
        const dbRef = await ref(bdFirebase);
        const booking = { ...bookingItem };
        delete booking.isLux;
        delete booking.roomName;
        await update(dbRef, {
            [`bookings/${booking.id}`]: {
                ...booking,
                issueDate: booking.issueDate.toString(),
                departureDate: booking.departureDate.toString(),
                arrivalDate: booking.arrivalDate.toString(),
            }
        });
    },

    deleteBooking: async (bookingId: string) => {
        const dbRef = await ref(bdFirebase, `bookings/${bookingId}`);
        await remove(dbRef);
    }
}