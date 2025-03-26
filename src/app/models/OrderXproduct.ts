export class OrderXproducts{
    id: string;
    orderId: string;
    productId: string;
    quantity: number;

    constructor(id: string,orderId: string, productId: string, quantity: number){
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
    }
}