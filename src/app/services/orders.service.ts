import { Injectable, OnInit, inject } from '@angular/core';
import { Order } from '../models/Order';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { OrdersXProductsService } from './orders-x-products.service';
import { OrderXproducts } from '../models/OrderXproduct';
import { PublicUser } from '../models/PublicUser';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private myAppUrl: string;
  private myApiUrl: string;
  private orders: Order[] = [];
  private _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  userService = inject(UserService);
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);
  _user: BehaviorSubject<PublicUser> = new BehaviorSubject<PublicUser>(
    this.user
  );
  oxpService = inject(OrdersXProductsService);
  oxps: OrderXproducts[] = [];
  _oxps: BehaviorSubject<OrderXproducts[]> = new BehaviorSubject<
    OrderXproducts[]
  >([]);
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Orders/';
  }
  returnOrders() {
    return this._orders.asObservable();
  }
  isAdmin() {
    this.cookieService.returnAdmin().subscribe((data) => {
      this.admin = data;
    });
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
  async searchSellerOrders(input: string) {
    if (input != '') {
      if (this.isAdmin()) {
        let ordersSearched = await this.getSellerOrders(input);
        this.orders = [];
        this._orders.next(this.orders);
        if (ordersSearched) {
          this.orders = ordersSearched;
          this._orders.next(this.orders);
        }
      }
    }
    return this._orders.asObservable();
  }
  async searchOrders(input: string) {
    if (input != '') {
      if (!this.isAdmin()) {
        let ordersSearched = await this.getSearchedOrdersUser(input);
        if (ordersSearched) {
          this.orders = ordersSearched;
          this._orders.next(this.orders);
        }
      } else {
        let ordersSearched = await this.getSearchedOrders(input);
        if (ordersSearched) {
          this.orders = ordersSearched;
          this._orders.next(this.orders);
        }
      }
    } else {
      if (this.isAdmin()) {
        await this.readAdminOrders();
      } else {
        await this.readOrders();
      }
    }
    return this._orders.asObservable();
  }
  async readOneOrder(id: string) {
    let orderAux = await this.readOneOrderTC(id);
    if (orderAux) {
      return orderAux;
    } else {
      return null;
    }
  }
  async readOneOrderTC(id: string) {
    try {
      const data = await this.getOrder(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  returnUser() {
    return this._user.asObservable();
  }
  async readOrders() {
    let ordersAux = await this.findUserOrders();
    if (ordersAux != undefined) {
      if (ordersAux.length > 0) {
        this.orders = ordersAux;
        this._orders.next(this.orders);
      } else {
        this.orders = [];
        this._orders.next(this.orders);
      }
    } else {
      this.orders = [];
      this._orders.next(this.orders);
      await this.readOxp();
    }
    return this._orders.asObservable();
  }
  async readOxp() {
    for (let i = 0; i < this.orders.length; i++) {
      (await this.oxpService.readOxp(this.orders[i].id)).subscribe((oxp) => {
        this.oxps = oxp;
      });
      this._oxps.next(this.oxps);
    }
    return this._oxps.asObservable();
  }
  async findUserOrders() {
    try {
      this.user = await this.userService.getUserLogged();
      this._user.next(this.user);
      const data = await this.getOrdersByID().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async readAdminOrders() {
    let ordersAux = await this.getAdminOrdersTC();
    if (ordersAux) {
      this.orders = ordersAux;
      this._orders.next(this.orders);
    }
    return this._orders.asObservable();
  }

  async getAdminOrdersTC() {
    try {
      const data = await this.getOrdersAdmin().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getSearchedOrders(input: string) {
    try {
      const data = await this.getOrdersSearched(input).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getSellerOrders(input: string) {
    try {
      const data = await this.getOrdersBySeller(input).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async getSearchedOrdersUser(input: string) {
    try {
      const data = await this.getOrdersSearchedNotAdmin(
        input,
        this.user.id
      ).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.myAppUrl + this.myApiUrl, {
      withCredentials: true,
    });
  }
  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(this.myAppUrl + this.myApiUrl + id);
  }
  getOrdersNotPayed(): Observable<Order[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'user/debt/';
    return this.http.get<Order[]>(urlAux + this.user.id, {
      withCredentials: true,
    });
  }
  /*getOrdersByID() {
    let urlAux = this.myAppUrl + this.myApiUrl + 'user/'
    return this.http.get<Order[]>(urlAux + this.user.id, { withCredentials: true });
  }*/
  getOrdersByID() {
    const urlAux = this.myAppUrl + this.myApiUrl + 'user/';
    return this.http
      .get<Order[]>(urlAux + this.user.id, { withCredentials: true })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            console.error('Error 404: Usuario no encontrado.');
            // Aquí puedes ejecutar algún código adicional o retornar un valor vacío.
            return of([]); // Retorna un arreglo vacío o un valor por defecto.
          }
          // Si el error es otro, puedes volver a lanzarlo o manejarlo de forma diferente
          throw error;
        })
      );
  }
  getOrdersAdmin() {
    let urlAux = this.myAppUrl + this.myApiUrl;
    return this.http.get<Order[]>(urlAux + 'admin/attended', {
      withCredentials: true,
    });
  }
  getOrdersBySeller(seller: string) {
    let urlAux = this.myAppUrl + this.myApiUrl;
    return this.http.get<Order[]>(urlAux + 'seller/' + seller, {
      withCredentials: true,
    });
  }
  getOrdersSearched(input: string) {
    let urlAux = this.myAppUrl + this.myApiUrl;
    return this.http.get<Order[]>(urlAux + 'search/code/' + input, {
      withCredentials: true,
    });
  }
  getOrdersSearchedNotAdmin(input: string, userID: string) {
    let urlAux = this.myAppUrl + this.myApiUrl;
    return this.http.get<Order[]>(
      urlAux + 'search/code/user/' + input + '/' + userID,
      { withCredentials: true }
    );
  }
  deleteOrder(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }
  deleteOrders(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }
  saveOrder(
    productAux: Order,
    to: string,
    subject: string,
    html: string,
    htmlAux: string
  ): Observable<void> {
    let urlAux = this.myAppUrl + this.myApiUrl;
    const emailData = {
      order: productAux,
      to: to,
      subject: subject,
      text: '', // Puedes dejar esto vacío si solo envías HTML
      html: html,
      htmlAux: htmlAux,
    };
    return this.http.post<void>(urlAux, emailData, { withCredentials: true });
  }
  updateOrder(id: string, productAux: Order): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
