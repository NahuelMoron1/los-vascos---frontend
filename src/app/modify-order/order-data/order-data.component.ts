import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { Order } from 'src/app/models/Order';
import { OrdersAndProducts } from 'src/app/models/OrdersAndProducts';
import { OrderXproducts } from 'src/app/models/OrderXproduct';
import { Product } from 'src/app/models/Product';
import { CartProductService } from 'src/app/services/cart-product.service';
import { OrderXProductsXOxpService } from 'src/app/services/order-x-products-x-oxp.service';
import { OrdersXProductsService } from 'src/app/services/orders-x-products.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css'],
})
export class OrderDataComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  orderID = this.activeRoute.snapshot.params['orderID']; //Se busca mediante la ruta el ID del producto al que se quiere acceder
  orderService = inject(OrdersService);
  orderSelected: Order = new Order(
    '',
    '',
    0,
    0,
    0,
    0,
    new Date(),
    '',
    '',
    false,
    '',
    '',
    ''
  );
  cartProductsService = inject(CartProductService);
  cartProducts: CartProduct[] = [];
  orderXproductsService = inject(OrderXProductsXOxpService);
  ordersXproductsService = inject(OrdersXProductsService);
  orderXproducts: OrdersAndProducts = new OrdersAndProducts(
    this.orderSelected,
    []
  );
  deletedProductsID: string[] = [];
  deleted: boolean = false;

  async ngOnInit() {
    let orderAndProductsAux = await this.orderXproductsService.readOrderModify(
      this.orderID
    );
    if (orderAndProductsAux != null) {
      this.orderXproducts = orderAndProductsAux;
      this.orderSelected = this.orderXproducts.order;
      this.cartProducts = this.orderXproducts.products;
    }
  }
  async modifyOrder() {
    await this.orderService
      .updateOrder(this.orderID, this.orderSelected)
      .toPromise();
    for (let i = 0; i < this.deletedProductsID.length; i++) {
      await this.cartProductsService
        .deleteCartProduct(this.deletedProductsID[i])
        .toPromise();
      await this.ordersXproductsService
        .deleteOrderXproductsByIDs(this.deletedProductsID[i], this.orderID)
        .toPromise();
    }
  }
  deleteProduct(productID: string) {
    let i = 0;
    let access = false;
    while (i < this.cartProducts.length && !access) {
      if (this.cartProducts[i].id == productID) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      let priceProduct =
        this.cartProducts[i].price * this.cartProducts[i].quantity;
      this.orderSelected.total = this.orderSelected.total - priceProduct;
      this.orderSelected.subtotal = this.orderSelected.subtotal - priceProduct;
      this.deletedProductsID.push(this.cartProducts[i].id);
      this.cartProducts.splice(i, 1);
      this.deleted = true;
    }
  }
  async incrementQuantity(product: CartProduct, index: number) {
    /* Cuando el usuario hace click en el boton +, se llama a esta funcion para que primero recorra la lista de productos, luego
    encuentre el producto y una vez que lo encuentra le cambia la cantidad, en este caso incrementando, pero realiza comprobaciones
    antes para no caer en fallos como por ejemplo revisar que la cantidad que el usuario desea no sea mayor a la del stock disponible */
    //if(product.quantity < product.stock){
    let i = 0;
    let access = false;
    while (i < this.cartProducts.length && !access) {
      if (this.cartProducts[i].id == product.id) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      this.cartProducts[i].quantity = this.cartProducts[i].quantity + 1;
      await this.cartProductsService
        .updateCartProduct(this.cartProducts[i].id, this.cartProducts[i])
        .toPromise();
    }
    //}
  }

  async decrementQuantity(product: CartProduct, index: number) {
    /* Cuando el usuario hace click en el boton -, se llama a esta funcion para que primero recorra la lista de productos, luego
    encuentre el producto y una vez que lo encuentra le cambia la cantidad, en este caso decrementando, pero realiza comprobaciones
    antes para no caer en fallos como por ejemplo revisar que la cantidad que el usuario desea no sea menor a 1 unidad, ya que podria
    caer en numeros menores a 0, lo que implicaria fallos a la hora de realizar la compra */
    if (product.quantity > 1) {
      let i = 0;
      let access = false;
      while (i < this.cartProducts.length && !access) {
        if (this.cartProducts[i].id == product.id) {
          access = true;
        } else {
          i++;
        }
      }
      if (access) {
        this.cartProducts[i].quantity = this.cartProducts[i].quantity - 1;
        await this.cartProductsService
          .updateCartProduct(this.cartProducts[i].id, this.cartProducts[i])
          .toPromise();
      }
    }
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
  formatNumber(number: number): string {
    //Funcion de front, se usa en HTML para mostrar los numeros grandes de forma mas legible.
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
  cancelDelete(id: string) {
    let i = 0;
    let access = false;
    while (i < this.cartProducts.length && !access) {
      if (this.deletedProductsID[i] == id) {
        access = true;
      } else {
        i++;
      }
    }
    if (access) {
      this.deletedProductsID.splice(i, 1);
      this.deleted = false;
    }
  }
  isOnDelete(id: string) {
    let i = 0;
    let access = false;
    while (i < this.cartProducts.length && !access) {
      if (this.deletedProductsID[i] == id) {
        access = true;
      } else {
        i++;
      }
    }
    return access;
  }
}
