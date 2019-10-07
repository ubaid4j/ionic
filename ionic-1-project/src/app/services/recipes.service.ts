import { Injectable } from '@angular/core';
import {Recipie} from '../recipies/recipies.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private recipies: Recipie[] = [
        {
            id: '1',
            title: 'Aloo',
            imageURL: 'https://www.coloradopotato.org/wp-content/themes/weboenhance/images/food-potato.png',
            ingredients: [
                'Mirch',
                'Panni',
                'Aag'
            ]
        },
        {
            id: '2',
            title: 'Baryani',
            imageURL: 'http://www.hansonfoods.com.pk/kj-content/uploads/2013/10/muton-baryani.jpg',
            ingredients: [
                'Chawal',
                'Chicken',
                'Alo'
            ]
        },

    ];
    constructor() { }
    public getRecipes(): Recipie[] {
        return [...this.recipies];
    }
    public findRecipe(id: string): Recipie {
        return {...this.recipies.find(recipe => {
           return recipe.id === id;
        })};
    }
}
