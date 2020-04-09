import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';



@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private Rservice : RecipeService){}
    
    resolve(route: ActivatedRouteSnapshot,state : RouterStateSnapshot){
    const recipes = this.Rservice.getRecipe();
    if(recipes.length === 0){
        return this.Rservice.fetchData();
    }else{
        return recipes;
    }    
    }
}