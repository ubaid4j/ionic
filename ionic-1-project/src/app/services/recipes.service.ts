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
            imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu77hdAQY18uvR0IyfwOo8kDQYtWNDpWgbsWMoIvZOwAZKaY_L',
            ingredients: [
                'Chawal',
                'Chicken',
                'Alo'
            ]
        },

    ];
    constructor() { }
    public getRecipes(): Recipie[] {
        // return [...this.recipies];
        console.log(this.recipies);
        return this.recipies;
    }
    public findRecipe(id: string): Recipie {
        return {...this.recipies.find(recipe => {
           return recipe.id === id;
        })};
    }
    public deleteRecipe(id: string): void {
        // simply filter return an array on the predicate
        this.recipies = this.recipies.filter(recepie => {
            return recepie.id !== id;
        });
    }
}
