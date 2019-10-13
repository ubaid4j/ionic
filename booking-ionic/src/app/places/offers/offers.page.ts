import { Component, OnInit } from '@angular/core';
import {PlacesService} from '../../service/places/places.service';
import {Place} from '../../model/place/place';
import {Router} from '@angular/router';
import {IonItemSliding} from '@ionic/angular';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

    public places: Place[] = null;
    constructor(private placeService: PlacesService,
                private router: Router) { }

    ngOnInit() {
        this.places = this.placeService.getPlaces();
    }

    public onEdit(id: string, ionItemSliding: IonItemSliding) {
        console.log(id);
        ionItemSliding.close().then();
        this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id])
            .then(r => {});
    }
}
