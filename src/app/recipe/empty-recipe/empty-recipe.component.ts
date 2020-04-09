import { Component, OnInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-empty-recipe',
  templateUrl: './empty-recipe.component.html',
  styleUrls: ['./empty-recipe.component.css']
})
export class EmptyRecipeComponent implements OnInit {

  arrow = faArrowDown
  constructor() { }

  ngOnInit() {
  }

}
