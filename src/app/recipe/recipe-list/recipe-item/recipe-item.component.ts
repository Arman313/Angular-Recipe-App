
import { Recipe } from '../../recipe.model';
import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // the recipe is an input from the recipe-list component
  @Input() recipe: Recipe;
  
  @Input() index: number;

  ngOnInit() {}



}
