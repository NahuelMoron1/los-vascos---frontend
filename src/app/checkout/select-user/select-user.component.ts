import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { PublicUser } from 'src/app/models/PublicUser';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'src/app/services/cookie.service';
import { OptionsService } from 'src/app/services/options.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css'],
})
export class SelectUserComponent implements OnInit {
  userService = inject(UserService);
  cookieService = inject(CookieService);
  userdataService = inject(UserdataService);
  cartService = inject(CartService);
  optionService = inject(OptionsService);
  productService = inject(ProductService);
  products: Array<Product> = [];
  users: PublicUser[] = [];
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);
  userSelected: PublicUser = new PublicUser('', '', '', false);
  userID: string = '';
  select: string = 'Seleccione una opcion';
  async ngOnInit() {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
    this.cartService.getProducts().subscribe((products) => {
      this.products = products;
    });
    /*if (this.isAdmin()) {
      this.users = await this.userService.readUsersBySeller(
        this.admin.username
      );
      this.users.unshift(this.user);
      this.userSelected = this.user;
      localStorage.setItem('userSelected', JSON.stringify(this.userSelected));
    }*/
  }
  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
  async selectUser(event: Event) {
    if (this.isAdmin()) {
      localStorage.removeItem('userSelected');
      const selectedValue = (event.target as HTMLSelectElement).value;
      this.userID = selectedValue;
      this.userSelected = await this.userService.readUser(this.userID);
      (
        await this.userdataService.returnUserdata(this.userSelected.id)
      ).subscribe(() => {});
      for (let i = 0; i < this.products.length; i++) {
        const optionSelected = await this.getOption(this.products[i]);
        if (optionSelected) {
          this.products[i].price = optionSelected.price;
          this.cartService.updateProduct(i, this.products[i]);
        }
      }
      localStorage.setItem('userSelected', JSON.stringify(this.userSelected));
    }
  }
  async getOption(productAux: Product) {
    try {
      const data = await this.optionService
        .getProductOptionsByTwo(productAux.latestID, productAux.optionSelected)
        .toPromise();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
}
