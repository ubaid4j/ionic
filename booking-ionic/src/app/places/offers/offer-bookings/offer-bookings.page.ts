import { Component, OnInit } from '@angular/core';
import {Place} from '../../../model/place/place';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../../service/places/places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {

    public place: Place = null;
    constructor(private activateRoute: ActivatedRoute,
                private navCont: NavController,
                private placeService: PlacesService) { }
    ngOnInit() {
        this.activateRoute.paramMap.subscribe(paramMap => {
            // console.log(paramMap);
            // console.log(paramMap.has('placeId'));
            // console.log(paramMap.get('placeId'));
            if (!paramMap.has('placeId')) {
                this.navCont.navigateBack('/places/tabs/offers').then(r => {});
                return;
            }
            this.place = this.placeService.find(paramMap.get('placeId'));
        });
    }
}
