import { createAction, props } from "@ngrx/store";
import { Product } from "../product";


export const toggleProductCode = createAction(
  '[product] Toggle Product Code'//name of the action then metadata(not needed here)wit props
)

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product}>() //the action needs to know wich product to set as the current product => props function
);

export const clearCurrentProduct = createAction(
  '[product] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product] Initialize Current Product'
)