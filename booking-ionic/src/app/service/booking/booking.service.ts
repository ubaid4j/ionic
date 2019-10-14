import {Injectable} from '@angular/core';
import {Booking} from '../../model/booking/booking';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {delay, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private tempArrayOfbookings: Booking[] = [
        new Booking('1', '1', 'Jand', 'url', 'Ubaid', 'Rehman', 3, new Date('2019-10-14'), new Date('2019-10-15'), 'abc'),
    ];
    // tslint:disable-next-line:variable-name
    private _bookings: BehaviorSubject<Booking[]> = new BehaviorSubject(this.tempArrayOfbookings);
    constructor(private authService: AuthService) {
    }

    // public getBookigs(): Booking[] {
    //     return this.bookings;
    // }

    public addBooking(placeId: string, placeTitle: string, placeImage: string,
                      firstName: string, lastName: string, guestNumber: number,
                      dateFrom: Date, dateTo: Date): Observable<Booking[]> {
        const newBooking: Booking = new
            Booking('1', placeId, placeTitle, placeImage, firstName, lastName, guestNumber, dateFrom, dateTo, this.authService.userId);
        return this.bookings.pipe(take(1), delay(1000), tap((bookings: Booking[]) => {
            bookings.push(newBooking);
            this._bookings.next(bookings);
        }));
    }
    public cancelBooking(bookingId: string): Observable<Booking[]> {
        return this.bookings.pipe(take(1), delay(1000), tap((bookings: Booking[]) => {
            bookings = bookings.filter((booking: Booking) => {
               return booking.id !== bookingId;
            });
            this._bookings.next(bookings);
        }));
    }
    get bookings(): Observable<Booking[]> {
        return this._bookings.asObservable();
    }

}
