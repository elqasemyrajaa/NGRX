import{Injectable} from '@angular/core';
import {Actions,Effect,ofType} from '@ngrx/effects';
import{Action} from '@ngrx/store';
import {Observable,of}  from 'rxjs';
import {map,mergeMap,catchError} from 'rxjs/operators';
import { UserService } from '../user.service';
import * as UserAction from './user.action';
import { User } from '../user';
@Injectable()
export class UserEffect{

    constructor(
        private action$:Actions,
        private UserService:UserService
    ){}
    @Effect()
    loadUsers :Observable<Action>=this.action$.pipe(
        ofType<UserAction.LoadUsers>(
            UserAction.UserActionTypes.LOAD_USERS
        ),
        mergeMap((Actions:UserAction.LoadUsers)=>
        this.UserService.getUsers().pipe(
            map((users:User[])=>
            new UserAction.LoadUsersSuccess(users)
            ),
            catchError(err=>of(new UserAction.LoadUsersFail(err)))
        )
        )
    )
    @Effect()
    loadUser$: Observable<Action> = this.action$.pipe(
      ofType<UserAction.LoadUser>(
        UserAction.UserActionTypes.LOAD_USER
      ),
      mergeMap((action:UserAction.LoadUser)=>
        this.UserService.getUserById(action.playload).pipe(
            map(
                (user:User)=>
                new UserAction.LoadUserSuccess(user)
            ),
            catchError(err=>of (new UserAction.LoadUserFail(err)))
        )
      )
     
    );
    @Effect()
    createUser$: Observable<Action> = this.action$.pipe(
      ofType<UserAction.CreateUser>(
        UserAction.UserActionTypes.CREATE_USER
      ),
      map((action: UserAction.CreateUser) => action.payload),
      mergeMap((user: User) =>
        this.UserService.createUser(user).pipe(
          map(
            (newUser: User) =>
              new UserAction.CreateUserSuccess(newUser)
          ),
          catchError(err => of(new UserAction.CreateUserFail(err)))
        )
      )
    );
    @Effect()
  updateUser$: Observable<Action> = this.action$.pipe(
    ofType<UserAction.UpdateUser>(
      UserAction.UserActionTypes.UPDATE_USER
    ),
    map((action: UserAction.UpdateUser) => action.payload),
    mergeMap((user: User) =>
      this.UserService.updateUser(user).pipe(
        map(
          (updateUser: User) =>
            new UserAction.UpdateUserSuccess({
              id: updateUser.id,
              changes: updateUser
            })
        ),
        catchError(err => of(new UserAction.UpdateUserFail(err)))
      )
    )
  );

  @Effect()
  deleteUser$: Observable<Action> = this.action$.pipe(
    ofType<UserAction.DeleteUser>(
      UserAction.UserActionTypes.DELETE_USER
    ),
    map((action: UserAction.DeleteUser) => action.payload),
    mergeMap((id: number) =>
      this.UserService.deleteUser(id).pipe(
        map(() => new UserAction.DeleteUserSuccess(id)),
        catchError(err => of(new UserAction.DeleteUserFail(err)))
      )
    )
  );
  

}