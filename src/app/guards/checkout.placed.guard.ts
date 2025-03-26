import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "../models/Order";
import { OrdersService } from "../services/orders.service";

export const checkoutPlacedGuard = async() => {
    const router = inject(Router);
    const orderService = inject(OrdersService);
    let orders: Array<Order> = [];
    try {
        const data = await orderService.getOrders().toPromise();
        let ordersAux = data;
        if(ordersAux != undefined){
            orders = ordersAux;
            if(orders.length > 0){
                router.navigate(['/checkout/orderExist']);
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
      } catch (error) {
        console.error('Error obteniendo datos:', error);
        throw error; // Puedes manejar el error de acuerdo a tus necesidades
      }
}