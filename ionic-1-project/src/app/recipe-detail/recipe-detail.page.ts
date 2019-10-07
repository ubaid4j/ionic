import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipesService} from '../services/recipes.service';
import {Recipie} from '../recipies/recipies.model';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

    recipie: Recipie;
    constructor(private acRouter: ActivatedRoute,
                private recepieService: RecipesService) { }

    ngOnInit() {
        console.log('on init recipie detail');
        this.acRouter.paramMap.subscribe(paramMap => {
            const id = paramMap.get('recipeId');
            console.log(id);
            if (id == null) {
                return;
            }
            this.recipie = this.recepieService.findRecipe(id);
            console.log(this.recipie);
        });
    }

}
