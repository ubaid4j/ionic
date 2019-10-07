import { Component, OnInit } from '@angular/core';
import {Recipie} from './recipies.model';

@Component({
    selector: 'app-recipies',
    templateUrl: './recipies.page.html',
    styleUrls: ['./recipies.page.scss'],
})
export class RecipiesPage implements OnInit {

    recipies: Recipie[] = [
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

    ngOnInit() {
    }

}
