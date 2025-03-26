import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css',
})
export class LoginButtonComponent implements OnInit {
  products?: Product[];
  cartService = inject(CartService);
  cookieService = inject(CookieService);
  logged: boolean = false;
  userService = inject(UserService);
  async ngOnInit() {
    this.logged = await this.isLogged();
    this.cartService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
  async isLogged() {
    (await this.cookieService.tokenExistTC('access_token')).subscribe(
      (data) => {
        this.logged = data;
      }
    );
    return this.logged;
  }
  async logout() {
    try {
      await this.userService.logoutTC();
      window.location.href = '';
    } catch (error) {
      console.log('Hubo un error!');
    }
  }
}
