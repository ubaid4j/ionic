import { Component, OnInit } from '@angular/core';
import {BookingService} from '../service/booking/booking.service';
import {Booking} from '../model/booking/booking';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

    public bookings: Booking[] = null;
    constructor(private bookingService: BookingService,
                private loadingCtrl: LoadingController,
                private router: Router) { }

    ngOnInit() {
        this.bookingService.bookings.subscribe((booking: Booking[]) => {
            this.bookings = booking;
        });
    }

    cancelBooking(id: string, ionItemSliding: IonItemSliding) {
        ionItemSliding.close().then();
        console.log(id);
        // cancel booking
        this.loadingCtrl.create({message: 'Cancelling Booking'}).then((element) => {
            element.present().then();
            this.bookingService.cancelBooking(id).subscribe((value: Booking[]) => {
                element.dismiss().then();
            });
        });
    }

}
