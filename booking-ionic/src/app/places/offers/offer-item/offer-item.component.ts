import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../../model/place/place';

@Component({
    selector: 'app-offer-item',
    templateUrl: './offer-item.component.html',
    styleUrls: ['./offer-item.component.scss'],
})
export class OfferItemComponent implements OnInit {
    @Input() place: Place;
    constructor() { }
    ngOnInit() {}

    public getDummyDate() {
        return new Date('2019-10-01');
    }
}
