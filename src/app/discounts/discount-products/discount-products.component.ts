import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-discount-products',
  templateUrl: './discount-products.component.html',
  styleUrls: ['./discount-products.component.css']
})
export class DiscountProductsComponent implements OnInit{
  productService = inject(ProductService);
  products: Array<Product> = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.productService.changeLoading('true').subscribe(loadAux => {
      this.loading = loadAux;
    });
      this.productService.returnObservable().subscribe(products => {
        this.products = products;
      });
      this.productService.changeLoading('false').subscribe(loadAux => {
        this.loading = loadAux;
      });
  }
}
