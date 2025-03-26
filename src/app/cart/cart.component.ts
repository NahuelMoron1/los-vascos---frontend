import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartService = inject(CartService);
  cartProducts: Array<Product> = [];
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.cartService.getProducts().subscribe(products => {
      this.cartProducts = products;
    })
  }
}
