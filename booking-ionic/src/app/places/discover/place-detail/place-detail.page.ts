import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {ActionSheetController, LoadingController, ModalController} from '@ionic/angular';
import {PlacesService} from '../../../service/places/places.service';
import {Place} from '../../../model/place/place';
import {Subscription} from 'rxjs';
import {BookingService} from '../../../service/booking/booking.service';
import {AuthService} from '../../../service/auth/auth.service';

// firstName: "ubaid"
// fromDate: "2019-10-14T23:28:45.960+05:00"
// guestNumber: "3"
// lastName: "rehman"
// toDate: "2019-10-15T23:28:45.961+05:00"
export interface Data {
    firstName: string;
    fromDate: Date;
    guestNumber: number;
    lastName: string;
    toDate: Date;
}

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    public  place: Place = null;
    public userId: string = null;
    private placeSubscription: Subscription;
    constructor(private router: Router,
                private modelController: ModalController,
                private placeService: PlacesService,
                private activatedRoute: ActivatedRoute,
                private actionSheetCtr: ActionSheetController,
                private bookingService: BookingService,
                private loadingCtrl: LoadingController,
                private authService: AuthService) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(map => {
            if (!map.has('placeId')) {
                this.router.navigate(['']).then(r => {});
                return;
            }
            this.placeSubscription = this.placeService.find(map.get('placeId')).subscribe((place: Place) => {
                this.place = place;
                this.userId = this.authService.userId;
            });
        });
    }

    public onClickBook(): void {
        this.actionSheetCtr.create({
           header: 'Choose and Action',
           buttons: [
               {text: 'Select Date', role: 'selectDate', handler: () => {
                   this.openBookingModal('select');
               }},
               {text: 'Random Date', role: 'randomDate', handler: () => {
                    this.openBookingModal('random');
               }},
               {text: 'Cancel', role: 'cancel', handler: () => {
                 // nothing
               }}
           ]
        }).then(actionSheet => {
            actionSheet.present().then();
        });
    }
    // addBooking(placeId: string, placeTitle: string, placeImage: string,
    //                       firstName: string, lastName: string, guestNumber: number,
    //                       dateFrom: Date, dateTo: Date)
    public openBookingModal(mode: 'select' | 'random') {
        console.log(mode);
        this.modelController.create({
            component: CreateBookingComponent,
            componentProps: {selectedPlace: this.place}
        }).then(model => {
            model.present().then();
            return model.onDidDismiss();
        }).then((result) => {
            const role: string = result.role;
            if (role === 'Booked') {
                const data: Data = result.data;
                this.loadingCtrl.create({message: 'Creating Booking'}).then((el) => {
                    el.present().then();
                    this.bookingService.addBooking(Math.random().toString(), this.place.title, this.place.imageURL,
                        data.firstName, data.lastName, data.guestNumber, data.fromDate, data.toDate).subscribe(() => {
                            el.dismiss().then();
                            this.router.navigate(['/bookings']).then();
                        });
                });
            }
        });
        // this.router.navigate(['']).then(r => {});
    }
    public isOwner(): boolean {
        return this.place.userId === this.userId;
    }
    ngOnDestroy(): void {
        this.placeSubscription.unsubscribe();
    }
}
