
import { Subscription } from 'rxjs';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit,  OnDestroy } from '@angular/core';

import { faPlus, faCheck }  from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit,OnDestroy {

  plus = faPlus
  save= faCheck
  recipes: Recipe[];
  sub = new Subscription

;  constructor(
   private Rservice: RecipeService,
  
  ) { }

  ngOnInit() {
   this.sub= this.Rservice.recipeChanged.subscribe(
    (recipes:Recipe[])=>{
      this.recipes=recipes;
    })
    this.recipes = this.Rservice.getRecipe();
    this.Rservice.fetchData().subscribe(res=>{
      
    });
  }

  ngOnDestroy(){this.sub.unsubscribe(); }
 

}
