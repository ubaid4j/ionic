import { Component, OnInit } from '@angular/core';
import {Recipie} from './recipies.model';
import {RecipesService} from '../services/recipes.service';

@Component({
    selector: 'app-recipies',
    templateUrl: './recipies.page.html',
    styleUrls: ['./recipies.page.scss'],
})
export class RecipiesPage implements OnInit {

    recipies: Recipie[];
    constructor(private recipesService: RecipesService) { }

    ngOnInit() {
        this.recipies = this.recipesService.getRecipes();
    }

}
