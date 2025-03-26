export class Options {
  id: string;
  name: string;
  productID: string;
  stock: number;
  price: number;

  constructor(
    id: string,
    name: string,
    productID: string,
    stock: number,
    price: number
  ) {
    this.id = id;
    this.name = name;
    this.productID = productID;
    this.stock = stock;
    this.price = price;
  }
}
