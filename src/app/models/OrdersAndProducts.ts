import { CartProduct } from "./CartProduct";
import { Order } from "./Order";

export class OrdersAndProducts{
    order: Order;
    products: CartProduct[] = [];
    constructor(order: Order, products: CartProduct[]){
        this.order = order;
        this.products = products;
    }
}