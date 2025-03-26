import { Injectable, inject } from '@angular/core';
import { OrderXproducts } from '../models/OrderXproduct';
import { OrdersAndProducts } from '../models/OrdersAndProducts';
import { Product } from '../models/Product';
import { OrdersXProductsService } from './orders-x-products.service';
import { OrdersService } from './orders.service';
import { ProductService } from './product.service';
import { Order } from '../models/Order';
import { BehaviorSubject } from 'rxjs';
import { CartProductService } from './cart-product.service';
import { CartProduct } from '../models/CartProduct';

@Injectable({
  providedIn: 'root',
})
export class OrderXProductsXOxpService {
  orderService = inject(OrdersService);
  cartProductService = inject(CartProductService);
  orders: Order[] = [];
  oxps: OrderXproducts[] = [];
  orderAndproducts: OrdersAndProducts[] = [];
  _orderAndproducts: BehaviorSubject<OrdersAndProducts[]> = new BehaviorSubject<
    OrdersAndProducts[]
  >([]);
  productService = inject(ProductService);
  oxpService = inject(OrdersXProductsService);
  selectedOrder: OrdersAndProducts = new OrdersAndProducts(
    new Order('', '', 0, 0, 0, 0, new Date(), '', '', false, '', '', ''),
    []
  );
  _selectedOrder: BehaviorSubject<OrdersAndProducts> =
    new BehaviorSubject<OrdersAndProducts>(this.selectedOrder);
  constructor() {}

  async getProducts(type: string, input: string | null) {
    if (type == 'admin') {
      (await this.orderService.readAdminOrders()).subscribe((orders) => {
        this.orders = orders;
      });
    } else if (type == 'search' && input != null) {
      (await this.orderService.searchOrders(input)).subscribe((orders) => {
        this.orders = orders;
      });
    } else {
      (await this.orderService.readOrders()).subscribe((orders) => {
        this.orders = orders;
      });
    }
    if (this.orders.length == 0) {
      this.orderAndproducts = [];
      this._orderAndproducts.next(this.orderAndproducts);
    }

    this.orderAndproducts = [];
    this._orderAndproducts.next(this.orderAndproducts);

    for (let i = 0; i < this.orders.length; i++) {
      let productsArray: CartProduct[] = [];
      (
        await this.cartProductService.readCartProducts(
          'order',
          this.orders[i].id
        )
      ).subscribe((products) => {
        productsArray = products;
      });
      let orderAndProductAux: OrdersAndProducts = new OrdersAndProducts(
        this.orders[i],
        productsArray
      );
      this.orderAndproducts.push(orderAndProductAux);
      this._orderAndproducts.next(this.orderAndproducts);
    }
    this.ordenacionPorInsercion();
    return this._orderAndproducts.asObservable();
  }
  async readOrderModify(id: string) {
    let orderAux = await this.orderService.readOneOrder(id);
    if (orderAux != null) {
      let productsArray: CartProduct[] = [];
      (
        await this.cartProductService.readCartProducts('order', orderAux.id)
      ).subscribe((result) => {
        productsArray = result;
      });
      let orderAndProductAux: OrdersAndProducts = new OrdersAndProducts(
        orderAux,
        productsArray
      );
      return orderAndProductAux;
    } else {
      return null;
    }
  }
  getOap() {
    return this._orderAndproducts.asObservable();
  }
  selectOrder(orderID: string) {
    let i = 0;
    let access = false;
    while (i < this.orderAndproducts.length && !access) {
      if (orderID == this.orderAndproducts[i].order.id) {
        this.selectedOrder = this.orderAndproducts[i];
        this._selectedOrder.next(this.selectedOrder);
        access = true;
      } else {
        i++;
      }
    }
  }
  selectedDefault() {
    if (this.orderAndproducts.length === 0) {
      return this._selectedOrder.asObservable(); // Si no hay órdenes, devuelve null
    }
    this.selectedOrder = this.orderAndproducts[0];
    this._selectedOrder.next(this.selectedOrder);
    for (let i = 1; i < this.orderAndproducts.length; i++) {
      let j = i - 1;
      if (
        this.orderAndproducts[j].order.orderDate <
        this.orderAndproducts[i].order.orderDate
      ) {
        this.selectedOrder = this.orderAndproducts[i];
        this._selectedOrder.next(this.selectedOrder);
      }
    }
    return this._selectedOrder.asObservable();
  }

  ordenacionPorInsercion() {
    const n = this.orderAndproducts.length;
    this.orderAndproducts.reverse();
    for (let i = 1; i < n; i++) {
      const current = this.orderAndproducts[i];
      let j = i - 1;

      while (
        j >= 0 &&
        (this.orderAndproducts[j].order.orderDate < current.order.orderDate ||
          this.orderAndproducts[j].order.orderDate === current.order.orderDate)
      ) {
        this.orderAndproducts[j + 1] = this.orderAndproducts[j];
        this._orderAndproducts.next(this.orderAndproducts);
        j--;
      }

      this.orderAndproducts[j + 1] = current;
      this._orderAndproducts.next(this.orderAndproducts);
    }
  }
}
