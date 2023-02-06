import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
    //true to see if our initil stae works
    { showProductCode: true },
    //"on" function for each action that this reducer handles
    on(createAction('[poduct] Toggle Product Code'), state => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode,
        };
    })
);