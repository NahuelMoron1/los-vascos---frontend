import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productsArray: Array<Product> = [];
  productService = inject(ProductService);
  bffUrl = environment.endpoint;
  async ngOnInit() {
    (await this.productService.readProducts('rand', null)).subscribe(
      (products) => {
        this.productsArray = products;
      }
    );
  }
}
