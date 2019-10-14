import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../../service/places/places.service';
import {ActivatedRoute} from '@angular/router';
import {Place} from '../../../model/place/place';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
    form: FormGroup;
    constructor(private placeService: PlacesService,
                private actRoute: ActivatedRoute) { }

    ngOnInit() {
        // get service
        this.actRoute.paramMap.subscribe(value => {
            const id = value.get('placeId');
            const offer = this.placeService.find(id);
            this.setForm(offer);
        });
    }

    private setForm(offer: Place): void {
        this.form = new FormGroup({
            title: new FormControl(offer.title, {
                updateOn: 'blur',
                validators: [Validators.required]}),
            description: new FormControl(offer.description, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
            })
        });
    }

    public onUpdateForm(): void {
        console.log(this.form);
    }
}
