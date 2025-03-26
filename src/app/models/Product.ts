import { Feature } from './Feature';

export class Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  subcategory: string = '';
  quantity: number = 1;
  description: string;
  features: Feature[] = [];
  discount: number;
  priceDiscount: number = 0;
  optionSelected: string = '';
  latestID: string = '';
  sells: number;
  temporaryFile: File | null = null;

  constructor(
    id: string,
    name: string,
    category: string,
    brand: string,
    price: number,
    image: string,
    discount: number,
    description: string,
    quantity: number,
    sells: number
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.brand = brand;
    this.price = price;
    this.image = image;
    this.discount = discount;
    this.description = description;
    this.quantity = quantity;
    this.priceDiscount = price - price * discount;
    this.sells = sells;
  }
}
