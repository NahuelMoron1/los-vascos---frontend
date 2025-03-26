export class CartProduct{
    id: string;
    name: string;
    price: number;
    quantity: number;
    optionSelected: string;
    orderID: string;

    constructor(id: string, name: string, price: number, quantity: number, optionSelected: string, orderID: string){
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.optionSelected = optionSelected;
        this.orderID = orderID;
    }
}