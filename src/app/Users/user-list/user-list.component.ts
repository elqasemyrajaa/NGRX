import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import * as userActions from '../app-state/user.action';
import { User } from '../user';
import {Observable} from 'rxjs';
import * as fromUser from '../app-state/user.reducer';
 
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
users:User;
users$: Observable<User[]>;
error$: Observable<String>;
  constructor(private store:Store<fromUser.AppState>) { }
 
  loadData(){
    this.store.dispatch(new userActions.LoadUsers());
    this.users$=this.store.pipe(select(fromUser.getUsers));
    console.log("users:",this.users$);
    this.error$ = this.store.pipe(select(fromUser.getError));
  }

  ngOnInit() {
    this.loadData();
  }
  deleteUser(user: User) {
    if (confirm("Are You Sure You want to Delete the User?")) {
      this.store.dispatch(new userActions.DeleteUser(user.id));
    }
  }

  editUser(user: User) {
    this.store.dispatch(new userActions.LoadUser(user.id));
  }

}
