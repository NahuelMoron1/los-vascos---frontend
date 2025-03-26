import { Injectable } from '@angular/core';
import { UserXcoupon } from '../models/UserXcoupon';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserXcouponService {
  private myAppUrl: string;
  private myApiUrl: string;
  userXcoupon: UserXcoupon = new UserXcoupon('', '', '');
  _userXcoupon: BehaviorSubject<UserXcoupon> = new BehaviorSubject<UserXcoupon>(this.userXcoupon);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/userXcoupon/'
  }
  async readUser(userID: string, couponID: string) {
    let userAux = await this.getUserTC(userID, couponID);
    if (userAux) {
      this.userXcoupon = userAux;
    }
    return this.userXcoupon;
  }
  returnUser() {
    return this._userXcoupon.asObservable();
  }
  async getUserTC(userID: string, couponID: string) {
    try {
      const data = await this.getUser(userID, couponID).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  getUser(userID: string, couponID: string): Observable<UserXcoupon> {
    return this.http.get<UserXcoupon>(this.myAppUrl + this.myApiUrl + userID + '/' + couponID);
  }
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, { withCredentials: true });
  }
  deleteUsers(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, { withCredentials: true });
  }
  saveUser(productAux: UserXcoupon): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, productAux, { withCredentials: true });
  }
  updateUser(id: string, productAux: UserXcoupon): Observable<void> {
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, productAux);
  }
}
