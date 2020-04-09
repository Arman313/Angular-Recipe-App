import { Subject } from 'rxjs';
import { Ingredient } from './../shared/indgredient.model';


export class ShopService {
    
    ingredientAdded = new Subject();
    enableEdit = new Subject<number>();
    ingredients: Ingredient[]=[
        new Ingredient('Tomatos',2),
        new Ingredient('Cheese',2),
        new Ingredient('potatos',20),
      ];


      getIngredients(){  return this.ingredients.slice() }

      addIngredient(newIngredient: Ingredient){
        this.ingredients.push(newIngredient);
        this.ingredientAdded.next(this.ingredients.slice())
      }

      storeList(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
      }

      getEditedItem(id:number){ return this.ingredients[id]}

      updateIngredient(newIngredient:Ingredient,id: number){

        this.ingredients[id] = newIngredient
        this.ingredientAdded.next(this.ingredients.slice())
        
      }

      deleteINgredient(id: number){
        this.ingredients.splice(id,1)
        this.ingredientAdded.next(this.ingredients.slice())

      }
    
}