import { Action } from "@ngrx/store";
import { User } from "../user";
import {Update} from '@ngrx/entity';
export enum UserActionTypes {
    LOAD_USERS = "[User] Load Users",
    LOAD_USERS_SUCCESS = "[User] Load Users Success",
    LOAD_USERS_FAIL = "[User] Load Users Fail",
    LOAD_USER = "[User] Load User",
    LOAD_USER_SUCCESS = "[User] Load User Success",
    LOAD_USER_FAIL = "[User] Load User Fail",
    CREATE_USER = "[User] Create Users",
    CREATE_USER_SUCCESS = "[User] Create Users Success",
    CREATE_USER_FAIL = "[User] Create Users Fail",
    DELETE_USER = "[User] Delete Users",
    DELETE_USER_SUCCESS = "[User] Delete Users Success",
    DELETE_USER_FAIL = "[User] Delete Users Fail",
    UPDATE_USER = "[User] Update Users",
    UPDATE_USER_SUCCESS = "[User] Update Users Success",
    UPDATE_USER_FAIL = "[User] Update Users Fail",
}
export class LoadUsers implements Action {
    readonly type = UserActionTypes.LOAD_USERS;
  }
  
  export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
    constructor(public payload:User[]) {}
  }
  
  export class LoadUsersFail implements Action {
    readonly type =UserActionTypes.LOAD_USERS_FAIL;
  
    constructor(public payload: string) {}
  }
  export class LoadUser implements Action {
    readonly type = UserActionTypes.LOAD_USER;
    constructor(public playload:number){}
  }
  
  export class LoadUserSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USER_SUCCESS;
    constructor(public payload:User) {}
  }
  
  export class LoadUserFail implements Action {
    readonly type =UserActionTypes.LOAD_USER_FAIL;
  
    constructor(public payload: string) {}
  }

  export class CreateUser implements Action {
    readonly type = UserActionTypes.CREATE_USER;
  
    constructor(public payload: User) {}
  }
  
  export class CreateUserSuccess implements Action {
    readonly type = UserActionTypes.CREATE_USER_SUCCESS;
  
    constructor(public payload: User) {}
  }
  
  export class CreateUserFail implements Action {
    readonly type =UserActionTypes.CREATE_USER_FAIL;
  
    constructor(public payload: string) {}
  }
  
  export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;
  
    constructor(public payload: User) {}
  }
  
  export class UpdateUserSuccess implements Action {
    readonly type = UserActionTypes.UPDATE_USER_SUCCESS
  
    constructor(public payload: Update<User>) {}
  }
  
  export class UpdateUserFail implements Action {
    readonly type = UserActionTypes.UPDATE_USER_FAIL;
  
    constructor(public payload: string) {}
  }
  
  export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;
  
    constructor(public payload: number) {}
  }
  
  export class DeleteUserSuccess implements Action {
    readonly type = UserActionTypes.DELETE_USER_SUCCESS;
  
    constructor(public payload: number) {}
  }
  
  export class DeleteUserFail implements Action {
    readonly type = UserActionTypes.DELETE_USER_FAIL;
  
    constructor(public payload: string) {}
  }
  export type Action =
  | LoadUsers
  | LoadUsersSuccess
  | LoadUsersFail
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail
  | CreateUser
  | CreateUserSuccess
  | CreateUserFail
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFail
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFail
