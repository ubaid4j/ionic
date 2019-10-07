import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {path} from '@angular-devkit/core';

const routes: Routes = [
    { path: '', redirectTo: 'recipies', pathMatch: 'full' },
    { path: 'recipies',
        children: [
            {
                path: '',
                loadChildren: './recipies/recipies.module#RecipiesPageModule'
            },
            {
                path: ':recipeId',
                loadChildren: './recipe-detail/recipe-detail.module#RecipeDetailPageModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
