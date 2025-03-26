import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicUser } from '../models/PublicUser';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private myAppUrl: string;
  private myApiUrl: string;
  user: PublicUser = new PublicUser('', '', '', false);
  _user: BehaviorSubject<PublicUser> = new BehaviorSubject<PublicUser>(
    this.user
  );
  admin: PublicUser = new PublicUser('', '', '', false);
  _admin: BehaviorSubject<PublicUser> = new BehaviorSubject<PublicUser>(
    this.admin
  );
  isLogged: boolean = false;
  isAdmin: boolean = false;
  _islogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isLogged
  );
  _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isAdmin
  );

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cookies/';
  }

  changeUser(userAux: PublicUser) {
    this.user = userAux;
    this._user.next(this.user);
    return this._user.asObservable();
  }

  returnUser() {
    return this._user.asObservable();
  }

  returnLogged() {
    return this._islogged.asObservable();
  }

  returnAdmin() {
    return this._admin.asObservable();
  }

  async getAdmin() {
    (await this.tokenExistTC('admin_token')).subscribe((data) => {
      this.isAdmin = data;
    });
    if (this.isAdmin) {
      let userAux = await this.getTokenTC('admin_token');
      if (userAux != null) {
        this.admin = userAux;
        this._admin.next(this.admin);
      }
    }
    return this._admin.asObservable();
  }

  async getUser() {
    (await this.tokenExistTC('access_token')).subscribe((data) => {
      this.isLogged = data;
    });
    if (this.isLogged) {
      let userAux = await this.getTokenTC('access_token');
      if (userAux != null) {
        this.user = userAux;
        this._user.next(this.user);
      }
    }
    return this._user.asObservable();
  }

  async getTokenTC(cookieName: string) {
    let data = await this.getToken(cookieName).toPromise();
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  async tokenExistTC(cookieName: string) {
    let tokenAux = await this.tokenExist(cookieName).toPromise();
    if (tokenAux != undefined) {
      if (cookieName == 'admin_token') {
        this.isAdmin = tokenAux;
        this._isAdmin.next(this.isAdmin);
        return this._isAdmin.asObservable();
      }
      this.isLogged = tokenAux;
      this._islogged.next(this.isLogged);
    }
    return this._islogged.asObservable();
  }

  async setSuperAdmin(admin: string): Promise<boolean> {
    try {
      let adminAux = await this.getSuperAdmin(admin).toPromise();
      if (adminAux) {
        return adminAux;
      } else {
        return false;
      }
    } catch (Error) {
      console.log(Error);
      return false;
    }
  }

  tokenExist(cookieName: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.myAppUrl + this.myApiUrl + 'check/' + cookieName,
      {
        withCredentials: true, // Esto permite que las cookies se envíen y se reciban
      }
    );
  }
  /*getToken(cookieName: string): Observable<PublicUser> {
    return this.http.get<PublicUser>(this.myAppUrl + this.myApiUrl + 'get/' + cookieName, {
      withCredentials: true // Esto permite que las cookies se envíen y se reciban
    });
  }*/
  getToken(cookieName: string): Observable<PublicUser | null> {
    return this.http
      .get<PublicUser>(`${this.myAppUrl}${this.myApiUrl}get/${cookieName}`, {
        withCredentials: true, // Esto permite que las cookies se envíen y se reciban
      })
      .pipe(
        catchError((error) => {
          console.error(`Error al obtener el token para ${cookieName}:`, error);
          return of(null); // Retorna `null` en caso de error para manejarlo de forma segura
        })
      );
  }
  getSuperAdmin(admin: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.myAppUrl + this.myApiUrl + 'superadmin/' + admin,
      { withCredentials: true }
    );
  }
}
