import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../services/recipes.service';
import {Recipie} from '../recipies/recipies.model';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

    recipie: Recipie;
    constructor(private acRouter: ActivatedRoute,
                private recepieService: RecipesService,
                private router: Router,
                private alertCont: AlertController) {
        // this.router.routeReuseStrategy.shouldReuseRoute = function(){
        //     return false;
        // }
        // this.router.routeReuseStrategy.shouldReuseRoute = () => {
        //     return false;
        // };
    }

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

    public deleteCurrentRecipe(): void {
        this.alertCont.create({
            header: 'Delete',
            message: 'Are you sure to delete ' + this.recipie.title,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                }, {
                    text: 'Delete',
                    handler: value => {
                        this.recepieService.deleteRecipe(this.recipie.id);
                        this.router.navigate(['/recipies']).then(r => {
                        });
                    }
                }
            ]
        }).then(r => r.present());
    }
}
