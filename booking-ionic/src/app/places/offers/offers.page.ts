import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../service/places/places.service';
import {Place} from '../../model/place/place';
import {Router} from '@angular/router';
import {IonItemSliding} from '@ionic/angular';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.page.html',
    styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

    public places: Place[] = null;
    private placesSubscription: Subscription = null;
    constructor(private placeService: PlacesService,
                private router: Router) { }

    ngOnInit() {
        this.placesSubscription = this.placeService.places.subscribe(data => {
            // console.log(data);
            this.places = data;
        });
    }

    public onEdit(id: string, ionItemSliding: IonItemSliding) {
        console.log(id);
        ionItemSliding.close().then();
        this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id])
            .then(r => {});
    }

    ngOnDestroy(): void {
        this.placesSubscription.unsubscribe();
    }
}
