import { Component, OnInit } from '@angular/core';
import * as UserAction from '../app-state/user.action';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import * as fromUser from '../app-state/user.reducer';
import {User} from '../user'

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  customerForm:FormGroup
  constructor(private fb:FormBuilder,
    private store:Store<fromUser.AppState>) { }

  ngOnInit() {
    this.customerForm=this.fb.group({
      id:null,
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    });
  }
  createUser(){
    const newUser: User = {
      id:this.customerForm.get("id").value,
      firstName: this.customerForm.get("firstName").value,
      lastName: this.customerForm.get("lastName").value,
      email: this.customerForm.get("email").value,
      password: this.customerForm.get("password").value,
    };
    new UserAction.CreateUser(newUser);
    console.log("add succefully");
    this.customerForm.reset();
    
  }
}
