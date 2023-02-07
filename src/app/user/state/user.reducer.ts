import { createAction, createReducer, on } from "@ngrx/store";
import { User } from "../user";

export interface state{
    users: userState;
};
export interface userState {
    hideUserName: boolean;
    currentUser: User;
}

export const userReducer = createReducer<userState>(
    { hideUserName : true} as userState,
    on(createAction('[User] Toggle User Name'), state =>{
        console.log('original state : ' + JSON.stringify(state));
        return{ 
            ...state,
            hideUserName : !state.hideUserName,
            
        };
    })
);