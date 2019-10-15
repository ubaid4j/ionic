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
    // tslint:disable-next-line:variable-name
    private _isLoading = true;
    private placesSubscription: Subscription = null;
    constructor(private placeService: PlacesService,
                private router: Router) { }

    ngOnInit() {
        this.placesSubscription = this.placeService.places.subscribe(data => {
            this.places = data;
        });
    }

    public onEdit(id: string, ionItemSliding: IonItemSliding) {
        ionItemSliding.close().then();
        this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id])
            .then(r => {});
    }

    ngOnDestroy(): void {
        this.placesSubscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.placeService.fetchPlaces().subscribe(() => {
            this.isLoading = false;
        });
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        this._isLoading = value;
    }


}
