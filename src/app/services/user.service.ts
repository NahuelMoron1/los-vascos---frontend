import { inject, Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PublicUser } from '../models/PublicUser';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  user: PublicUser = new PublicUser('', '', '', false);
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/Users/';
  }
  async getUserLogged() {
    (await this.cookieService.returnUser()).subscribe((data) => {
      this.user = data;
    });
    return this.user;
  }

  ///SEARCH USER

  async readUsersBySearch(input: string) {
    let usersAux = await this.searchUserTC(input);
    let users: PublicUser[] = [];
    if (usersAux) {
      users = usersAux;
    }
    return users;
  }

  async searchUserTC(input: string) {
    try {
      const data = await this.getUsersSearch(input).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUsersSearch(input: string): Observable<PublicUser[]> {
    return this.http.get<PublicUser[]>(
      this.myAppUrl + this.myApiUrl + 'search/search/' + input,
      { withCredentials: true }
    );
  }

  ///GET ONE USER

  async readUser(id: string) {
    let userAux = await this.getUserTC(id);
    let user = new User('', '', '', '');
    if (userAux) {
      user = userAux;
    }
    return user;
  }

  async getUserTC(id: string) {
    try {
      const data = await this.getUser(id).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.myAppUrl + this.myApiUrl + id, {
      withCredentials: true,
    });
  }

  ///GET USER BY EMAIL

  async readUserEmail(email: string) {
    let userAux = await this.recoverPasswordTC(email);
    if (userAux) {
      if (userAux.email == email) {
        let to = userAux.email;
        let subject = 'RECUPERACIÓN DE CONTRASEÑA';
        let html = `<div style="display: flex; align-items: center; width: 50svw; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);">
    <div style="font-family: sans-serif; padding: 1vi; height: fit-content; background-color: black;">
        <div style="display: flex; flex-direction: column align-items: center;">
            <img src="https://api.distribucionlosvascos.com/uploads/logos/losvascos.png" style="width: 40svw;" alt="">
        </div>
        <h1 style="color: rgb(221, 26, 0); text-align: center;">RECUPERAMOS TU CONTRASEÑA</h1>
        <p>Email: ${userAux.email}</p>
        <p>Contraseña: ${userAux.password}</p>
    </div>
</div>`;
        await this.sendEmail(to, subject, html).toPromise();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async recoverPasswordTC(email: string) {
    try {
      const data = await this.recoverPassword(email).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
  recoverPassword(email: string): Observable<User> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'recover/';
    return this.http.get<User>(urlAux + email);
  }

  async getUserEmailTC(email: string) {
    try {
      await this.getUserLogged();
      const data = await this.getUserByEmail(email).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUserByEmail(email: string): Observable<User> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'email/';
    if (this.user.email == '') {
      this.user.email = 'null';
    }
    return this.http.get<User>(urlAux + email + '/' + this.user.email, {
      withCredentials: true,
    });
  }

  ///GET USERS BY SELLER

  async readUsersBySeller(seller: string) {
    let usersAux = await this.getBySellerTC(seller);
    let users: User[] = [];
    if (usersAux) {
      users = usersAux;
    }
    return users;
  }

  async getBySellerTC(seller: string) {
    try {
      let usersAux = await this.getUsersBySeller(seller).toPromise();
      return usersAux;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return false;
    }
  }

  getUsersBySeller(seller: string): Observable<User[]> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'seller/';
    if (this.user.email == '') {
      this.user.email = 'null';
    }
    return this.http.get<User[]>(urlAux + seller + '/' + this.user.email, {
      withCredentials: true,
    });
  }

  ///GET USER BY NAME

  async readUserByName(name: string) {
    let userAux = await this.getUserNameTC(name);
    let user = new User('', '', '', '');
    if (userAux) {
      user = userAux;
    }
    return user;
  }

  async getUserNameTC(username: string) {
    try {
      const data = await this.getUserByName(username).toPromise();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }

  getUserByName(username: string): Observable<User> {
    let urlAux = this.myAppUrl + this.myApiUrl + 'username/';
    return this.http.get<User>(urlAux + username, { withCredentials: true });
  }

  ///DELETE USER
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, {
      withCredentials: true,
    });
  }

  ///DELETE USERS
  deleteUsers(): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}`, {
      withCredentials: true,
    });
  }

  ///POST USER
  saveUser(productAux: User): Observable<void> {
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}`,
      productAux,
      { withCredentials: true }
    );
  }

  ///LOGIN

  async loginEmail(email: string) {
    let userAux = await this.getUserEmailTC(email);
    if (userAux) {
      return userAux;
    } else {
      return null;
    }
  }

  async readLogin(email: string, password: string) {
    let userAux = await this.loginTC(email, password);
    if (userAux != null) {
      localStorage.setItem('userLogged', JSON.stringify(userAux)); //Se guarda en local storage una copia del usuario que se loguea, para saber que está logueado en cualquier parte de la pagina
      if (userAux.email == 'nahuelarielmoron1@gmail.com') {
        localStorage.setItem('admin', JSON.stringify(true)); //Se guarda en local storage una comprobacion de admin, para saber en cualquier parte de la pagina que el usuario logueado es admin
      }
      return true;
    } else {
      return false;
    }
  }

  async loginTC(email: string, password: string) {
    try {
      let userAux = await this.login(email, password).toPromise();
      if (userAux) {
        return userAux;
      } else {
        return null;
      }
    } catch (error: any) {
      if (error.status === 404 && error.error?.message) {
        console.error(error.error.message); // Accediendo al mensaje del backend
      } else {
        console.error('Error desconocido', error);
      }
      return null;
    }
  }

  login(email: string, password: string): Observable<User> {
    const userdata = {
      email,
      password,
    };
    const urlAux = this.myAppUrl + this.myApiUrl + 'login/';

    return this.http.post<User>(urlAux, userdata, {
      withCredentials: true, // Esto permite que las cookies se envíen y se reciban
    });
  }

  ///LOGOUT

  async logoutTC() {
    /// TRY CATCH CAllS LOGOUT();
    try {
      let access = await this.logout().toPromise();
      return access;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error obteniendo datos:', error.message);
      }
      return false;
    }
  }

  logout(): Observable<void> {
    const urlAux =
      this.myAppUrl + this.myApiUrl + 'validate/logout/user/logged';
    return this.http.post<void>(urlAux, '', { withCredentials: true });
  }

  ///EMAIL SEND
  sendEmail(to: string, subject: string, text: string): Observable<void> {
    const emailData = {
      to: to,
      subject: subject,
      text: text,
    };
    return this.http.post<void>(
      `${this.myAppUrl}${this.myApiUrl}` + 'email',
      emailData,
      { withCredentials: true }
    );
  }

  ///UPDATE USER
  updateUser(id: string, productAux: User): Observable<void> {
    return this.http.patch<void>(
      `${this.myAppUrl}${this.myApiUrl}${id}`,
      productAux
    );
  }
}
