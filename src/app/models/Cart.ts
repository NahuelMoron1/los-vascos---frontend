import { Product } from "./Product";

export class Cart{
    id: string;
    products: Array<Product> = [];
    totalPrice: number;
    constructor(id: string, products: Array<Product>, totalPrice: number){
        this.id = id;
        this.products = products;
        this.totalPrice = totalPrice;
    }
}