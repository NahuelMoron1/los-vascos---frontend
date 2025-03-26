import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  isProduct?: boolean;
  isBrand?: boolean;
  isCategory?: boolean;
  constructor(private router: Router) {
    window.scrollTo(0, 0);
    this.isProduct = this.router.url.includes('product');
    this.isBrand = this.router.url.includes('brand');
    this.isCategory = this.router.url.includes('category');
  }
}
