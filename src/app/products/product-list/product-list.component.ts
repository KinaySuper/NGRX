import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';


import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State>, private productService: ProductService) { }

  ngOnInit(): void {
    // TODO unsubscribe
   this.store.select(getCurrentProduct).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });
    // TODO: unsubscribe
    this.store.select(getShowProductCode).subscribe(
      ShowProductCode => this.displayCode = ShowProductCode
      );
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());// we add () because const toggleProductCodes reference a function
  }
    // this.store.dispatch(
    //   { type: '[poduct] Toggle Product Code' }
    // );

    // this.displayCode = !this.displayCode;


  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct())
    }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}))
  }

}
