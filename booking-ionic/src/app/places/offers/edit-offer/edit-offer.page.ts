import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlacesService} from '../../../service/places/places.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Place} from '../../../model/place/place';
import {Subscription} from 'rxjs';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    form: FormGroup;
    private placeSubscription: Subscription;
    private placeId: string = null;
    constructor(private placeService: PlacesService,
                private actRoute: ActivatedRoute,
                private loadingCtrl: LoadingController,
                private router: Router) { }

    ngOnInit() {
        // get service
        this.actRoute.paramMap.subscribe(value => {
            const id: string = value.get('placeId');
            this.placeId = id;
            // const offer = this.placeService.find(id);
            // this.setForm(offer);
            this.placeSubscription = this.placeService.find(id).subscribe((offer: Place) => {
                this.setForm(offer);
            });
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
        const title: string = this.form.value.title;
        const description: string = this.form.value.description;
        this.loadingCtrl.create({message: 'Updating Place'}).then((element) => {
            element.present().then();
            this.placeService.updatePlace(this.placeId, title, description).subscribe((places: Place[]) => {
                element.dismiss().then();
                this.form.reset();
                this.router.navigate(['/places/tabs/offers']).then();
            });
        });
    }

    ngOnDestroy(): void {
        if (this.placeSubscription || !this.placeSubscription.closed) {
            this.placeSubscription.unsubscribe();
        }
    }

}
