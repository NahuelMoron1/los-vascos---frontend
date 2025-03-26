import { Component, OnInit, inject } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrdersAndProducts } from 'src/app/models/OrdersAndProducts';
import { OrderXProductsXOxpService } from 'src/app/services/order-x-products-x-oxp.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserDisplayService } from 'src/app/services/user-display.service';

@Component({
  selector: 'app-orders-info',
  templateUrl: './orders-info.component.html',
  styleUrls: ['./orders-info.component.css']
})
export class OrdersInfoComponent implements OnInit{
  orderService = inject(OrdersService);
  orders: Order[] = [];
  orderxproductsxoxpService = inject(OrderXProductsXOxpService);
  ordersAndProducts: OrdersAndProducts[] = [];
  oxpHtml: OrdersAndProducts[] = [];
  displayService = inject(UserDisplayService);
  
  async ngOnInit() {
      this.orderxproductsxoxpService.getOap().subscribe(products => {
        this.ordersAndProducts = products;
      })
    this.orderxproductsxoxpService.ordenacionPorInsercion();
      this.limitOxp();
  }
  limitOxp(){
    for(let i=0; i<3; i++){
      this.oxpHtml.push(this.ordersAndProducts[i]);
    }
  }

  changeDisplay(name: string, orderID: string){
    this.orderxproductsxoxpService.selectOrder(orderID);
    this.displayService.changeDisplay(name);
  }

  getDates(orderDate: Date): string {
    let newDate = new Date(orderDate);
    if (!(newDate instanceof Date) || isNaN(newDate.getTime())) {
        throw new Error("Invalid date");
    }
    
    let day = newDate.getDate().toString().padStart(2, '0');
    let month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    let year = newDate.getFullYear().toString();

    return `${day}/${month}/${year}`;
}
}
