import * as userActions from "./user.action";
import{User} from '../user';
import * as fromRoot from '../../state/app-state';
import {createFeatureSelector,createSelector, State} from '@ngrx/store';
import { EntityState,EntityAdapter,createEntityAdapter} from '@ngrx/entity';

export interface UserState extends EntityState<User>{
selectedUserId:number |null;
loading:boolean,
loaded:boolean;
error:string
}
export interface AppState extends fromRoot.AppState{
users:UserState;
}
export const userAdapter:EntityAdapter<User>=createEntityAdapter<User>();
export const defaultUser:UserState={
    entities:{},
    ids:[],
    selectedUserId:null,
    loaded:false,
    loading:false,
    error:""
}
export const initialState=userAdapter.getInitialState(defaultUser);
export function userReducer(state=initialState,action:userActions.Action):UserState{
switch (action.type) {
    /*******************case :get all users *************************** */
    case userActions.UserActionTypes.LOAD_USERS:{
        return{
            ...state,
            loading:true
        }
    }
    case userActions.UserActionTypes.LOAD_USERS_SUCCESS:{
        return userAdapter.addAll(action.payload,{
            ...state,
            loading:false,
            loaded:true
        })
    }
    case userActions.UserActionTypes.LOAD_USERS_FAIL:{
        return{
            ...state,
            entities:{},
            loading:false,
            loaded:false,
            error:action.payload
        }
    }
    /***********************case : get by Id************************ */
    case userActions.UserActionTypes.LOAD_USER_SUCCESS:{
        return userAdapter.addOne(action.payload,{
            ...state,
           selectedUserId:action.payload.id,
        })
    }
    case userActions.UserActionTypes.LOAD_USER_FAIL:{
        return{
            ...state,
            error:action.payload
        }
    }
    /*********************case : Create User******************************* */
    case userActions.UserActionTypes.CREATE_USER_SUCCESS:{
        return userAdapter.addOne(action.payload,state)
    }
    case userActions.UserActionTypes.CREATE_USER_FAIL:{
        return{
            ...state,
            error:action.payload
        }
    }
    /*********************case : Update User******************************* */
    case userActions.UserActionTypes.UPDATE_USER_SUCCESS:{
        return userAdapter.updateOne(action.payload,state)
    }
    case userActions.UserActionTypes.UPDATE_USER_FAIL:{
        return{
            ...state,
            error:action.payload
        }
    }
    /*********************case : Update User******************************* */
    case userActions.UserActionTypes.DELETE_USER_SUCCESS:{
        return userAdapter.removeOne(action.payload,state)
    }
    case userActions.UserActionTypes.DELETE_USER_FAIL:{
        return{
            ...state,
            error:action.payload
        }
    }
    default:{
        return state;
    }
        
}
}
const getUserFeatureState=createFeatureSelector<UserState>(
"users"
);
export const getUsers=createSelector(
    getUserFeatureState,
    userAdapter.getSelectors().selectAll
);
export const getUsersLoading=createSelector(
    getUserFeatureState,(state:UserState)=>state.loading
);
export const getUsersLoaded=createSelector(
    getUserFeatureState,(state:UserState)=>state.loaded
);
export const getError=createSelector(
    getUserFeatureState,(state:UserState)=>state.error
);
export const getCurrentUserId=createSelector(
    getUserFeatureState,(State:UserState)=>State.selectedUserId
)
export const getCurrentUser=createSelector(
    getUserFeatureState,
    getCurrentUserId,
    state=>state.entities[state.selectedUserId]
)