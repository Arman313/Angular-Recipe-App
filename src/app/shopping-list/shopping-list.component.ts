import { ShopService } from './shopping.service';
import { Ingredient } from './../shared/indgredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredient[];
 
  private sub : Subscription
  constructor(private Sservice: ShopService) { }

  ngOnInit() {
     this.ingredients = this.Sservice.getIngredients() 
     this.sub= this.Sservice.ingredientAdded.subscribe( (ingredients:Ingredient[])=>{
     this.ingredients = ingredients
   })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }


  editItem(id:number){ this.Sservice.enableEdit.next(id); }

  
  


}
