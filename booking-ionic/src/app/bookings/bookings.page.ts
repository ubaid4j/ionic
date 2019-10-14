import { Component, OnInit } from '@angular/core';
import {BookingService} from '../service/booking/booking.service';
import {Booking} from '../model/booking/booking';
import {IonItemSliding} from '@ionic/angular';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

    public bookings: Booking[];
    constructor(private bookingService: BookingService) { }

    ngOnInit() {
        this.bookings = this.bookingService.getBookigs();
    }

    cancelBooking(id: string, ionItemSliding: IonItemSliding) {
        ionItemSliding.close().then();
        console.log(id);
        // cancel booking
    }

}
