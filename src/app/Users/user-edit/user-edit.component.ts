import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromUser from '../app-state/user.reducer';
import * as UserAction from '../app-state/user.action'
import { Observable } from 'rxjs';
import { User } from '../user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
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
    const user$: Observable<User> = this.store.select(
      fromUser.getCurrentUser
    )
    user$.subscribe(currentUser => {
      if (currentUser) {
        this.customerForm.patchValue({
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          password:currentUser.password,
          id: currentUser.id
        });
      }
    })
  }
  updateUser() {
    const updateUser: User = {
      id:this.customerForm.get("id").value,
      firstName: this.customerForm.get("firstName").value,
      lastName: this.customerForm.get("lastName").value,
      email: this.customerForm.get("email").value,
      password: this.customerForm.get("password").value,
    };

    this.store.dispatch(new UserAction.UpdateUser(updateUser))
  }

}
