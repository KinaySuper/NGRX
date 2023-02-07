import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
    products: Productstate;
}

export interface Productstate {
    showProductCode: boolean;
    currentProductId: number;
    products: Product[];
}

const initialState: Productstate = {
    showProductCode: true,
    currentProductId: 5,
    products: []
}

//select a slice of state
const getProductFeatureState = createFeatureSelector<Productstate>('products');

//select a bit of the slice of state that can be accessed down the state tree with the selector
export const getShowProductCode = createSelector(
    getProductFeatureState,
    //the selector
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state=> state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, getCurrentProductId) => state.products.find(p => p.id === getCurrentProductId)
);

export const getProducts=createSelector(
    getProductFeatureState,
    state => state.products
);

export const productReducer = createReducer<Productstate>(
    //true to see if our initial state works
    initialState,
    //"on" function for each action that this reducer handles
    on(createAction('[poduct] Toggle Product Code'), (state): Productstate => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state,
            showProductCode: !state.showProductCode,
        };
    })
);