import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../model/place/place';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

    @Input() selectedPlace: Place;
    constructor(private modalController: ModalController) { }

    ngOnInit() {}

    onBook() {
        this.modalController.dismiss({
            place: this.selectedPlace
        }, 'Booked').then(r => {});
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel').then(r => {
            //
        });
    }
}
