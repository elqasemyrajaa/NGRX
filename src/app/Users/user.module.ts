import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {userReducer} from './app-state/user.reducer';
import {EffectsModule,Actions} from '@ngrx/effects';
import {UserEffect} from './app-state/user.effects';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('users',userReducer),
    EffectsModule.forFeature([UserEffect]),
    FormsModule, ReactiveFormsModule

  ],
  declarations: [UserComponent, UserAddComponent, UserEditComponent, UserListComponent]
})
export class UserModule { }
