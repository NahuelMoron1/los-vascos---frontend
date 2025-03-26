import { Component, inject, OnInit } from '@angular/core';
import { OrdersAndProducts } from '../models/OrdersAndProducts';
import { OrderXProductsXOxpService } from '../services/order-x-products-x-oxp.service';
import { adminGuard } from '../guards/admin.guard';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit{
  oxpService = inject(OrderXProductsXOxpService);
  ordersAndProducts: OrdersAndProducts[] = [];
  cookieService = inject(CookieService);
  async ngOnInit() {
    if(await this.isAdmin()){
      (await this.oxpService.getProducts('admin', null)).subscribe(products => {
        this.ordersAndProducts = products;
       });
    }else{
      (await this.oxpService.getProducts('', null)).subscribe(products => {
        this.ordersAndProducts = products;
       });
    }
  }
  async isAdmin(){
    let tokenExist: boolean = false;
    (await this.cookieService.tokenExistTC('admin_token')).subscribe(data => {
      tokenExist = data;
    });
    if(tokenExist){
        return true;
    }else{
        return false;
    }
}
}
