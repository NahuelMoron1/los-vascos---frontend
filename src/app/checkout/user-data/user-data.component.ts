import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit{
  cartService = inject(CartService);
  products: Array<Product> = [];
  subtotal: number = 0;
  total: number = 0;
  ngOnInit(): void {
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.cartService.getSubtotal().subscribe(subtotal => {
      this.subtotal = subtotal;
    });

    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }
}
