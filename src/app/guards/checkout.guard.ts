import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { CartService } from "../services/cart.service";
import { Product } from "../models/Product";

export const checkoutGuard = () => {
    let cartservice = inject(CartService);
    let products: Array<Product> = [];
    const router = inject(Router);
    cartservice.getProducts().subscribe(productsAux => {
        products = productsAux;
      })
    if(products.length > 0){
        return true;
    }else{
        router.navigate(['']);
        return false;
    }
}