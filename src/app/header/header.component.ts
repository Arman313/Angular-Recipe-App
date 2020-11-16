import { RecipeService } from './../recipe/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faShoppingCart, faList, faSignInAlt, faSignOutAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy  {
  faSignInAlt = faSignInAlt ;
  faSignOutAlt = faSignOutAlt
  faShoppingCart = faShoppingCart;
  faList = faList;
  plus =faPlus
  isAuth = false;
  url:string;

  private sub : Subscription;

  constructor
  (
    private userService : AuthService,
     private router: Router,
      private route: ActivatedRoute,
      private Rservice: RecipeService,
      private location:Location,

       ){

       
  }

  ngOnInit(){
    this.sub=this.userService.user.subscribe(user=>{
      this.isAuth = !!user;
      this.url =  this.location.path();
      console.log(this.url);
      
    })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  logOut(){
    this.userService.logOut();
    console.log('works');
    
  }
  
  onSaveChanges(){
    
    this.Rservice.onSaveChanges();
  }

  newRecipe(){ 
   
 let leet = this.router.navigate(['recipes/new'],{relativeTo: this.route});
 

  
}
}