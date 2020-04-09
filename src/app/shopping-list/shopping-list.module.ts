

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EditListComponent } from './edit-list/edit-list.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations:
    [  ShoppingListComponent,
        EditListComponent,
    ],
    exports: 
    [
        ShoppingListComponent,
        EditListComponent,
    ],
    imports:
    [
       RouterModule.forChild([  { path: 'shopping-list', component: ShoppingListComponent,},]),
       CommonModule,
       FontAwesomeModule,
       FormsModule
   ]
})
export class ShoppingModule{}