
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [

    { path: '', redirectTo: 'recipes', pathMatch: 'full'},
    { path: 'signin', component: AuthComponent,},
  ]
  
  @NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
  })
  export class AppRouteModule{}