import { Injectable } from '@angular/core';
import { CartProduct } from '../models/CartProduct';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  private myAppUrl: string;
  private myApiUrl: string;
  cartProducts: Array<CartProduct> = [];
  _cartProducts: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cart/'
  }

  getCartProductsAsObservable() {
    return this._cartProducts.asObservable();
  }

  async readCartProducts(option: string, value: string | null) {
    let cartAux = await this.getCartProductsTC(option, value);
    if (cartAux) {
      this.cartProducts = [];
      this.cartProducts = cartAux;
      this._cartProducts.next(this.cartProducts);
    }
    return this._cartProducts.asObservable();
  }

  async getCartProductsTC(option: string, value: string | null) {
    try {
      switch (option) {
        case 'order':
          if (value) {
            const data = await this.getCartProductsByOrder(value).toPromise();
            return data;
          }
          break;
        case 'product':
          if (value) {
            const data = await this.getCartProductsByProduct(value).toPromise();
            return data;
          }
          break;
        /*case 'id':
          if(value){
            const data = await this.getCartProduct(value).toPromise();
            return data;
          }
          break;*/
        default:
          const data = await this.getCartProducts().toPromise();
          return data;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async readByID(id: string) {
    let prodAux = await this.getByID(id);
    if (prodAux) {
      return prodAux;
    } else {
      return null;
    }
  }

  async getByID(id: string) {
    try {
      const data = await this.getCartProduct(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getCartProducts(): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]>(this.myAppUrl + this.myApiUrl, { withCredentials: true });
  }
  getCartProduct(id: string): Observable<CartProduct> {
    return this.http.get<CartProduct>(this.myAppUrl + this.myApiUrl + id);
  }
  getCartProductsByOrder(orderID: string): Observable<CartProduct[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'order/'
    return this.http.get<CartProduct[]>(urlAux + orderID);
  }
  getCartProductsByProduct(productID: string): Observable<CartProduct[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'product/'
    return this.http.get<CartProduct[]>(urlAux + productID);
  }
  deleteCartProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, { withCredentials: true });
  }
  deleteCartProducts(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  }
  saveCartProduct(productAux: CartProduct): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, productAux, { withCredentials: true });
  }
  updateCartProduct(id: string, productAux: CartProduct): Observable<void> {
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, productAux);
  }
}
