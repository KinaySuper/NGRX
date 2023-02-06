import { createAction, createReducer, on } from "@ngrx/store";

export const userReducer = createReducer(
    { hideUserName : true},
    on(createAction('[User] Toggle User Name'), state =>{
        console.log('original state : ' + JSON.stringify(state));
        return{ 
            ...state,
            hideUserName : !state.hideUserName,
            
        };
    })
);