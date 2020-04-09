import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  recipeId: number;
  editMode= false;
  recipeForm: FormGroup;
 
  
  constructor(private route: ActivatedRoute,
      private Rservice: RecipeService,
      private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params)=>{
      this.recipeId = +param['id'];
      this.editMode = param['id'] != null;
      this.initForm();
     
      
    });
  }

  getControls(){
    (this.recipeForm.get('ingredients') as FormArray).controls
  }

  private initForm(){
    let recipeName =''
    let imgUrl =''
    let desc =''
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
    
       let originalRecipe = this.Rservice.getById(this.recipeId);
       recipeName = originalRecipe.name
       imgUrl = originalRecipe.imgURL
       desc= originalRecipe.desc

       if(originalRecipe['ingredients']){
         for(let ingredient of originalRecipe.ingredients){
           recipeIngredients.push(new FormGroup({
             'name': new FormControl(ingredient.name,Validators.required),
             'amount': new FormControl(ingredient.amount,[
               Validators.required, 
               Validators.pattern(/^[1-9]+[0-9]*$/),
             ]),
           }))
         };
       };
    };

    this.recipeForm = new FormGroup({
      'recipeName': new FormControl(recipeName,Validators.required),
      'imgUrl': new FormControl(imgUrl,Validators.required),
      'desc': new FormControl(desc,Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  onSubmit(){

    console.log(this.recipeForm);
    
    
    const newRecipe = new Recipe(
      this.recipeForm.value['recipeName'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imgUrl'],
      this.recipeForm.value['ingredients'],
    )
      if(this.editMode){
        this.Rservice.updateRecipe(this.recipeId,newRecipe);
        this.router.navigate(['../'],{relativeTo: this.route});
      }else{
        this.Rservice.addNewRecipe(newRecipe);
        this.router.navigate(['../'],{relativeTo: this.route});
      };
    };

  onCancel(){
     this.recipeForm.reset()
     this.router.navigate(['../'],{relativeTo: this.route});
    }

    onDeleteIngredient(id){

      (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);

    }
   addIng(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  };


}
