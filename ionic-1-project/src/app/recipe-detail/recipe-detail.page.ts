import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipesService} from '../services/recipes.service';
import {Recipie} from '../recipies/recipies.model';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.page.html',
    styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit, OnDestroy {

    recipie: Recipie = null;
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
        console.log('ngOnInit');
        this.acRouter.paramMap.subscribe(paramMap => {
            const id = paramMap.get('recipeId');
            // console.log(id);
            if (id == null) {
                return;
            }
            this.recipie = this.recepieService.findRecipe(id);
            // console.log(this.recipie);
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

    ionViewWillEnter() {
        // const id = this.acRouter.snapshot.paramMap.get('recipeId');
        // this.recipie = this.recepieService.findRecipe(id);
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
