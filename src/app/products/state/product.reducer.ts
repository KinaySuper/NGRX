import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions'

export interface State extends AppState.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    // currentProductId: number;
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    // currentProductId: 5,
    products: []
}

//select a slice of state
const getProductFeatureState = createFeatureSelector<ProductState>('products');

//select a bit of the slice of state that can be accessed down the state tree with the selector
export const getShowProductCode = createSelector(
    getProductFeatureState,
    //the selector
    state => state.showProductCode
);

// export const getCurrentProductId = createSelector(
//     getProductFeatureState,
//     state=> state.currentProductId
// );

// export const getCurrentProduct = createSelector(
//     getProductFeatureState,
//     getCurrentProductId,
//     (state, getCurrentProductId) => state.products.find(p => p.id === getCurrentProductId)
// );

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
);


export const getProducts=createSelector(
    getProductFeatureState,
    state => state.products    
);

export const productReducer = createReducer<ProductState>(
    //true to see if our initial state works
    initialState,
    //"on" function for each action that this reducer handles HANDLER
    on(ProductActions.toggleProductCode, (state): ProductState => {
        console.log('original state: ' + JSON.stringify(state));
        return {
            ...state, 
            showProductCode: !state.showProductCode,
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action):ProductState => {
        return  {
            ...state,
            currentProduct: action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initializeCurrentProduct, (state): ProductState => {
        return {
            ...state,
            currentProduct: {
                id: 0,
                productName:'',
                productCode:'New',
                description: '',
                starRating: 0
            }
        }
    })
);