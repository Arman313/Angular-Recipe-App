import { Ingredient } from './../../shared/indgredient.model';
import { Subscription } from 'rxjs'
import { ShopService } from './../shopping.service';
import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit,OnDestroy {

  @ViewChild('formData',{static:false}) shopForm: NgForm;
  sub: Subscription ;
  editedItemId: number;
  editMode: boolean = false;
  editedItem: Ingredient
  @Input() ingredients: Ingredient[] =[];

  constructor(private Sservice: ShopService) { }

  ngOnInit() {
   this.sub = this.Sservice.enableEdit.subscribe((id: number)=>{
    this.editedItemId = id;
    this.editMode = true;
    this.editedItem = this.Sservice.getEditedItem(this.editedItemId);
    this.shopForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount
    })
    
   });
  }
  ngOnDestroy(){ this.sub.unsubscribe() }

  clearForm(){
    this.editMode =false;
    this.shopForm.reset();
  }

  addIngredient(form: NgForm){
    const amount =form.value.amount
    const name = form.value.name
    const newIngredient= new Ingredient(name,amount);

    if( this.editMode){
      this.Sservice.updateIngredient(newIngredient,this.editedItemId);
      this.editMode = false
    }else{
      this.Sservice.addIngredient(newIngredient)
      this.editMode = false;
    }
    this.shopForm.reset()
  }

  deleteIngredient(){

    this.Sservice.deleteINgredient(this.editedItemId);
    this.clearForm();

  }



}
