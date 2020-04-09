import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Subject,} from 'rxjs';
import {map, tap,take, exhaustMap } from 'rxjs/operators';
import {ShopService } from './../shopping-list/shopping.service';
import {Injectable,} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/indgredient.model';


@Injectable()
export class RecipeService {
  recipeChanged = new Subject();
  constructor(private Sservice: ShopService, private Http: HttpClient,private authService : AuthService) {}
  private recipes: Recipe[] = []

  setRecipe(recipes) {
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }


  onSaveChanges() {
    let userToken = this.authService.user.value.token
    this.Http.put('https://recipe-book-d85d8.firebaseio.com/recipes.json?', 
    this.recipes,
    {params: new HttpParams().set('auth',userToken)}).subscribe(res => {
      console.log(res);
      
    })
  }


  fetchData(){
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.Http.get <Recipe[]> ('https://recipe-book-d85d8.firebaseio.com/recipes.json',
      {params: new HttpParams().set('auth',user.token)});
    }),map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
     tap(recipes => {
      this.setRecipe(recipes)
    }));
  }


  getById(id: number) {
    return this.recipes[id];
  }

  getRecipe() {
    return this.recipes.slice();
  }

  addToList(ingredients: Ingredient[]) {
    this.Sservice.storeList(ingredients)
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(id: number, updatedRecipe: Recipe) {
    this.recipes[id] = updatedRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(id) {
    this.recipes.splice(id, 1);
    this.recipeChanged.next(this.recipes.slice())
  }
}
