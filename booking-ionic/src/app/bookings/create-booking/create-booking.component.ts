import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../model/place/place';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    form: FormGroup;
    dateLimit: Date = new Date();
    isLimitAvailabe = false;
    @Input() selectedPlace: Place;
    private TO_DATE = 'toDate';
    constructor(private modalController: ModalController) { }

    ngOnInit() {
        this.dateLimit = new Date();
        this.form = new FormGroup({
            firstName: new FormControl(null, {
               updateOn: 'blur',
               validators: [Validators.required]}),
            lastName: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]}),
            guestNumber: new FormControl(null, {
                updateOn: 'change',
                validators: [Validators.required]}),
            fromDate: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
                }),
            toDate: new FormControl({value: null, disabled: true}, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }

    onBook() {
        this.modalController.dismiss(this.form.value, 'Booked').then(r => {});
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel').then(r => {
            //
        });
    }

    public changeToDateLimit($event: CustomEvent): void {
        this.dateLimit = new Date($event.detail.value);
        this.dateLimit = new Date(this.dateLimit.getTime() + 24 * 60 * 60 * 1000);
        this.form.controls[this.TO_DATE].enable();
    }
}
