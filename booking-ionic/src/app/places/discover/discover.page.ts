import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../service/places/places.service';
import {Place} from '../../model/place/place';
import {Subscription} from 'rxjs';
import {AuthService} from '../../service/auth/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    public places: Place[] = null;
    public relevantPlaces: Place[] = null;
    private placesSubscription: Subscription = null;
    constructor(private placeService: PlacesService,
                private authService: AuthService) { }

    ngOnInit() {
        this.placesSubscription = this.placeService.getPlaces().subscribe((data: Place[]) => {
            this.places = data;
            this.relevantPlaces = this.places;
        });
    }

    public onFilterUpdate($event: CustomEvent) {
        const value: string = $event.detail.value;
        if (value === 'all') {
            this.relevantPlaces = this.places;
        } else {
            this.relevantPlaces = this.places.filter((place: Place) => {
               return place.userId !== this.authService.userId;
            });
        }
    }

    ngOnDestroy(): void {
        this.placesSubscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.placeService.fetchPlaces().subscribe((places: Place[]) => {
        });
    }
}
