import {Injectable} from '@angular/core';
import {Booking} from '../../model/booking/booking';

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    private bookings: Booking[] = [
        new Booking('1', '1', '1', 'Khatmando', 2),
        new Booking('2', '2', '2', 'Jand', 2),
        new Booking('3', '3', '3', 'Attock', 2),
        new Booking('4', '4', '4', 'Hazara', 2)
    ];

    constructor() {
    }

    public getBookigs(): Booking[] {
        return this.bookings;
    }
}
