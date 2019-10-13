import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../../service/places/places.service';
import {Place} from '../../model/place/place';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
    public places: Place[] = null;
    constructor(private placeService: PlacesService) { }

    ngOnInit() {
        this.places = this.placeService.getPlaces();
    }

    public onFilterUpdate($event: CustomEvent) {
        console.log($event.detail);
    }
}
