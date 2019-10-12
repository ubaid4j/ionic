import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipie} from './recipies.model';
import {RecipesService} from '../services/recipes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-recipies',
    templateUrl: './recipies.page.html',
    styleUrls: ['./recipies.page.scss'],
})
export class RecipiesPage implements OnInit, OnDestroy {

    recipies: Recipie[];
    constructor(private recipesService: RecipesService,
                private acRouter: ActivatedRoute) {
        // acRouter.params.subscribe(next => {
        //     this.load();
        // });
    }

    ngOnInit() {
        console.log('ngOnInit');
        // this.load();
    }

    private load(): void {
        this.recipies = this.recipesService.getRecipes();
    }

    ionViewWillEnter() {
        this.load();
        console.log('ionViewWillEnter');
    }
    ionViewDidEnter() {
        console.log('ionViewDidEnter');
    }
    ionViewWillLeave() {
        console.log('ionViewWillLeave');
    }
    ionViewDidLeave() {
        console.log('ionViewDidLeave');
    }
    ngOnDestroy(): void {
        console.log('ngOnDestroy');
    }
}
