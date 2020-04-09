import { ShoppingModule } from './shopping-list/shopping-list.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthComponent } from './auth/auth.component';
import { RecipeResolverService } from './recipe/recipes-resolver.service';
import { RecipeService } from './recipe/recipe.service';
import { AppRouteModule } from './app-routing.module';
import { ShopService } from './shopping-list/shopping.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { SpinnerComponent } from './shared/spinner/spinner.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailsComponent,
    DropdownDirective,
    AuthComponent,
    SpinnerComponent
  ],

  imports: [
    BrowserModule,
    AppRouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RecipeModule,
    ShoppingModule,
  ],

  providers: 
  [
    ShopService,
    RecipeService,
    RecipeResolverService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
