import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../../service/places/places.service';
import {Place} from '../../model/place/place';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

    public places: Place[] = null;
    constructor(private placeService: PlacesService) { }

    ngOnInit() {
        this.places = this.placeService.getPlaces();
    }

}
