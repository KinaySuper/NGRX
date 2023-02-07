import { createAction, createReducer, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    products: Producstate;
}

export interface Producstate {
    showProductCode: boolean;
    currentProduct: Product;
    products:Product[];
}

export const productReducer = createReducer<Producstate>(
    //true to see if our initil stae works
    { showProductCode: true } as Producstate,
    //"on" function for each action that this reducer handles
    on(createAction('[poduct] Toggle Product Code'), (state): Producstate => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode,
        };
    })
);