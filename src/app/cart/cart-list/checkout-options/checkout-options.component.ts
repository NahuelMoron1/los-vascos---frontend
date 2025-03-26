import { Component, OnInit, inject } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-options',
  templateUrl: './checkout-options.component.html',
  styleUrls: ['./checkout-options.component.css']
})
export class CheckoutOptionsComponent implements OnInit{
  discount: number = 0;
  subtotal: number = 0;
  total: number = 0;
  delivery: number = 0;
  cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.getDiscount().subscribe(discount => {
      this.discount = discount;
    });

    this.cartService.getSubtotal().subscribe(subtotal => {
      this.subtotal = subtotal;
    });

    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
    
  }
  formatNumber(numberAux: number) {
    return numberAux.toLocaleString();
}
}
