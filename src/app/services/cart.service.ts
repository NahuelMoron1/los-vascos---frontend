import { inject, Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { BehaviorSubject } from 'rxjs';
import { CartProductService } from './cart-product.service';
import { CartProduct } from '../models/CartProduct';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProductService = inject(CartProductService);
  cartProductsArray: CartProduct[] = [];
  private cartProducts: Array<Product> = [];
  private subTotal: number = 0;
  private total: number = 0;
  private discount: number = 0;
  private delivery: number = 0;
  private _discount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _subTotal: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _Total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _products: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  constructor() {}

  getUser() {
    let userAux = localStorage.getItem('userLogged');
    let userLogged: User = new User('', '', '', '');
    if (userAux) {
      userLogged = JSON.parse(userAux);
    }
    return userLogged;
  }

  setDiscount(discountAux: number) {
    this.discount = discountAux;
    this._discount.next(this.discount);
    this.getTotal();
    return this._discount.asObservable();
  }

  getDiscount() {
    return this._discount.asObservable();
  }

  getProducts() {
    let productsAux = localStorage.getItem('cart');
    if (productsAux) {
      this.cartProducts = JSON.parse(productsAux);
      this._products.next(this.cartProducts);
    }
    return this._products.asObservable();
  }

  async getCartProducts() {
    for (let i = 0; i < this.cartProducts.length; i++) {
      let cartProdAux = await this.cartProductService.readByID(
        this.cartProducts[i].id
      );
      if (cartProdAux != null) {
        this.cartProductsArray.push(cartProdAux);
      }
    }
  }

  addNewProduct(productAux: Product, latestID: string) {
    productAux.latestID = latestID;
    this.cartProducts.push(productAux);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this._products.next(this.cartProducts);
  }

  saveCartAfterOrder(orderID: string) {
    localStorage.setItem('cartResolved', JSON.stringify(this.cartProducts));
    for (let i = 0; i < this.cartProducts.length; i++) {
      let productAux = this.cartProducts[i];
      let cartProductAux: CartProduct = new CartProduct(
        productAux.id,
        productAux.name,
        productAux.price,
        productAux.quantity,
        productAux.optionSelected,
        orderID
      );
      this.cartProductService
        .saveCartProduct(cartProductAux)
        .subscribe(() => {});
    }
    this.cartProducts = [];
    localStorage.removeItem('cart');
    this.cartProductsArray = [];
    this._products.next(this.cartProducts);
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.cartProductsArray.splice(index, 1);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this._products.next(this.cartProducts);
    this.subTotal = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      let priceProduct = 0;
      if (this.cartProducts[i].discount > 0) {
        priceProduct = this.cartProducts[i].priceDiscount;
      } else {
        priceProduct = this.cartProducts[i].price;
      }
      this.subTotal += priceProduct * this.cartProducts[i].quantity;
      this._subTotal.next(this.subTotal);
    }
    if (this.discount > 0) {
      this.discount = 0;
      this._discount.next(this.discount);
      localStorage.removeItem('coupon');
    }
    this.total = 0;
    this.total = this.subTotal + this.delivery - this.discount;
    this._Total.next(this.total);
    location.reload();
  }
  updateProduct(index: number, product: Product) {
    this.cartProducts[index] = product;
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this._products.next(this.cartProducts);
    this.subTotal = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      let priceProduct = 0;
      if (this.cartProducts[i].discount > 0) {
        priceProduct = this.cartProducts[i].priceDiscount;
      } else {
        priceProduct = this.cartProducts[i].price;
      }
      this.subTotal += priceProduct * this.cartProducts[i].quantity;
      this._subTotal.next(this.subTotal);
    }
    if (this.discount > 0) {
      this.discount = 0;
      this._discount.next(this.discount);
      localStorage.removeItem('coupon');
    }
    this.total = 0;
    this.total = this.subTotal + this.delivery - this.discount;
    this._Total.next(this.total);
  }
  getSubtotal() {
    this.subTotal = 0;
    for (let i = 0; i < this.cartProducts.length; i++) {
      let priceProduct = 0;
      if (this.cartProducts[i].discount > 0) {
        priceProduct = this.cartProducts[i].priceDiscount;
      } else {
        priceProduct = this.cartProducts[i].price;
      }
      this.subTotal += priceProduct * this.cartProducts[i].quantity;
      this._subTotal.next(this.subTotal);
    }
    this.total = 0;
    this.total = this.subTotal + this.delivery - this.discount;
    this._Total.next(this.total);
    return this._subTotal.asObservable();
  }

  getTotal() {
    this.total = 0;
    this.total = this.subTotal + this.delivery - this.discount;
    this._Total.next(this.total);

    return this._Total.asObservable();
  }
}
