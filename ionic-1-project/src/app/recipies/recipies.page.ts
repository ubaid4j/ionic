import { Component, OnInit } from '@angular/core';
import {Recipie} from './recipies.model';
import {RecipesService} from '../services/recipes.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-recipies',
    templateUrl: './recipies.page.html',
    styleUrls: ['./recipies.page.scss'],
})
export class RecipiesPage implements OnInit {

    recipies: Recipie[];
    constructor(private recipesService: RecipesService,
                private acRouter: ActivatedRoute) {
        acRouter.params.subscribe(next => {
            this.load();
        });
    }

    ngOnInit() {
        this.load();
    }

    private load(): void {
        this.recipies = this.recipesService.getRecipes();
    }
}
