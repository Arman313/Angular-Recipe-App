import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, } from '@angular/core';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { faPlus,faPen,faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  faPlus = faPlus;
  faPen = faPen
  faTrash = faTrash
  
  recipeId: number;
  recipe: Recipe;

  constructor(private Rservice: RecipeService, 
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    
    this.route.params.subscribe((param:Params)=>{
      this.recipeId = +param['id'];
      this.recipe = this.Rservice.getById(this.recipeId);
    });

  }

  addToList(){
    this.Rservice.addToList(this.recipe.ingredients)
  }

  editRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route})
  }

  deleteRecipe(){
    this.Rservice.deleteRecipe(this.recipeId)
    this.router.navigate(['/'])
  }

}
