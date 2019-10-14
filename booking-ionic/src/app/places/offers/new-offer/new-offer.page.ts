import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../../service/places/places.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {Place} from '../../../model/place/place';

export interface Data {
    title: string;
    description: string;
    price: number;
    dateFrom: Date;
    dateTo: Date;
}


@Component({
    selector: 'app-new-offer',
    templateUrl: './new-offer.page.html',
    styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {

    public form: FormGroup;
    constructor(private placeService: PlacesService,
                private router: Router,
                private loadingCtrl: LoadingController) { }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, {
               updateOn: 'blur',
               validators: [Validators.required]}),
            description: new FormControl(null, {
               updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]}),
            price: new FormControl(null, {
               updateOn: 'blur',
               validators: [Validators.required, Validators.min(1)]}),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]}),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }

    public onCreateOffer() {
        this.loadingCtrl.create({message: 'Create Offer....'}).then((loader) => {
            loader.present().then();

            const data: Data = this.form.value;
            this.placeService
                .addPlace(data.title, data.description, data.price, data.dateFrom, data.dateTo)
                .subscribe((places: Place[]) => {
                    console.log(places);
                    loader.dismiss().then();
                    this.form.reset();
                    this.router.navigate(['/places/tabs/offers']).then();
                });
        });

        // const data: Data = this.form.value;
        // this.placeService.addPlace(data.title, data.description, data.price, data.dateFrom, data.dateTo);

    }
}
