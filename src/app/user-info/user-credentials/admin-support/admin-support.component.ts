import { Component, inject } from '@angular/core';
import { OrdersAndProducts } from 'src/app/models/OrdersAndProducts';
import { PublicUser } from 'src/app/models/PublicUser';
import { CookieService } from 'src/app/services/cookie.service';
import { OrderXProductsXOxpService } from 'src/app/services/order-x-products-x-oxp.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserService } from 'src/app/services/user.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-admin-support',
  templateUrl: './admin-support.component.html',
  styleUrls: ['./admin-support.component.css'],
})
export class AdminSupportComponent {
  orderxproductsxoxpService = inject(OrderXProductsXOxpService);
  ordersAndProducts: OrdersAndProducts[] = [];
  orderService = inject(OrdersService);
  userService = inject(UserService);
  user: PublicUser = new PublicUser('', '', '', false);
  userdataService = inject(UserdataService);
  cookieService = inject(CookieService);
  searchTerm: string = '';
  users: PublicUser[] = [];
  userAux: PublicUser = new PublicUser('', '', '', false);

  async searchUserInput() {
    if (this.searchTerm != '') {
      this.users = await this.userService.readUsersBySearch(this.searchTerm);
    } else {
      this.users = [];
    }
  }

  async searchUserClick(username: string) {
    this.users = [];
    this.searchTerm = '';
    if (username != '') {
      this.user = await this.userService.readUserByName(username);
      this.cookieService.changeUser(this.user).subscribe((data) => {
        this.user = data;
      });
      (await this.userdataService.returnUserdata(this.user.id)).subscribe(
        (userdata) => {}
      ); ///LA INFO DE USUARIO SE ACTUAlIZA PARA VER LA INFO DEL USUARIO BUSCADO
      (await this.orderxproductsxoxpService.getProducts('', null)).subscribe(
        (products) => {
          this.ordersAndProducts = products;
        }
      );
    }
  }

  getInput(name: string) {
    let miInp = document.getElementById(name) as HTMLInputElement;
    let inpValue = '';
    if (miInp) {
      inpValue = miInp.value;
    }
    return inpValue;
  }

  getDates(orderDate: Date): string {
    let newDate = new Date(orderDate);
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
      throw new Error('Invalid date');
    }

    let day = newDate.getDate().toString().padStart(2, '0');
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    let year = newDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }
}
