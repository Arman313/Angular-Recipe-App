import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeResolverService } from './recipes-resolver.service';
import { AuthGuard } from './../auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { EmptyRecipeComponent } from './empty-recipe/empty-recipe.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations : [
        RecipeComponent,
        RecipeListComponent,
        RecipeItemComponent,
        EmptyRecipeComponent,
        EditRecipeComponent,
        
    ],
    exports:
     [
        RecipeComponent,
        RecipeListComponent,
        RecipeItemComponent,
        EmptyRecipeComponent,
        EditRecipeComponent,
    ],
    imports:
     [
        RouterModule.forChild([
            {  path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard],
            children:
            [
             { path:'',component:EmptyRecipeComponent},
             { path: 'new', component: EditRecipeComponent},
             { path: ':id', component: RecipeDetailsComponent,resolve: [RecipeResolverService]},
             { path: ':id/edit', component: EditRecipeComponent,resolve: [RecipeResolverService]},
            ]},
        ]),
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule
    ]
})

export class RecipeModule {
    
}