import { Injectable } from '@angular/core';
import { Cupon } from '../models/Cupon';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private myAppUrl: string;
  private myApiUrl: string;
  CuponsArray: Array<Cupon> = [];
  _CuponsArray: BehaviorSubject<Cupon[]> = new BehaviorSubject<Cupon[]>(this.CuponsArray);
  couponSearched: Cupon = new Cupon('', '', 0, new Date(), false, 0);
  _couponSearched: BehaviorSubject<Cupon> = new BehaviorSubject<Cupon>(this.couponSearched);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/coupon/'
  }

  async readCoupon(id: string) {
    const couponAux = await this.readCouponTC(id);
    if (couponAux) {
      this.couponSearched = couponAux;
      this._couponSearched.next(this.couponSearched);
    }
    return this.couponSearched;
  }

  async searchCoupon(code: string) {
    const couponAux = await this.searchCouponTC(code);
    if (couponAux) {
      this.couponSearched = couponAux;
      this._couponSearched.next(this.couponSearched);
    }
    return this.couponSearched;
  }

  async readCouponTC(id: string) {
    try {
      const data = await this.getCoupon(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async searchCouponTC(code: string) {
    try {
      const data = await this.searchCouponByCode(code).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  async readCoupons() {
    const brandsAux = await this.setCoupons();
    if (brandsAux != undefined) {
      for (let i = 0; i < brandsAux.length; i++) {
        this.CuponsArray.push(brandsAux[i]);
      }
      this._CuponsArray.next(this.CuponsArray);
    }
    return this._CuponsArray.asObservable();
  }

  async setCoupons() {
    try {
      const data = await this.getCoupons().toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  updateCouponService(couponAux: Cupon) {
    this.couponSearched = couponAux;
    this._couponSearched.next(this.couponSearched);
  }

  getSearched() {
    return this._couponSearched.asObservable();
  }

  getCoupons(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.myAppUrl + this.myApiUrl, { withCredentials: true });
  }
  getCoupon(id: string): Observable<Cupon> {
    return this.http.get<Cupon>(this.myAppUrl + this.myApiUrl + id);
  }
  searchCouponByCode(code: string): Observable<Cupon> {
    return this.http.get<Cupon>(this.myAppUrl + this.myApiUrl + 'search/' + code);
  }
  deleteCoupon(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, { withCredentials: true });
  }
  deleteCoupons(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  }
  saveCoupon(productAux: Cupon): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, productAux, { withCredentials: true });
  }
  updateCoupon(id: string, productAux: Cupon): Observable<void> {
    this.couponSearched = productAux;
    this._couponSearched.next(this.couponSearched);
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, productAux);
  }
}
