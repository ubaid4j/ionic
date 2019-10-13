import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';
import {ModalController} from '@ionic/angular';
import {PlacesService} from '../../../service/places/places.service';
import {Place} from '../../../model/place/place';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
    protected  place: Place = null;
    constructor(private router: Router,
                private modelController: ModalController,
                private placeService: PlacesService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(map => {
            if (!map.has('placeId')) {
                this.router.navigate(['']).then(r => {});
                return;
            }
            this.place = this.placeService.find(map.get('placeId'));
        });
    }

    public onClickBook(): void {
        this.modelController.create({
            component: CreateBookingComponent,
            componentProps: {selectedPlace: this.place}
        }).then(model => {
            model.present().then(r => {});
            return model.onDidDismiss();
        }).then(rValue => {console.log(rValue); });
        // this.router.navigate(['']).then(r => {});
    }
}
