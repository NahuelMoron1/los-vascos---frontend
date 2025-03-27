import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/user.service';
import { WaitService } from 'src/app/services/wait.service';

@Component({
  selector: 'app-register-data',
  templateUrl: './register-data.component.html',
  styleUrls: ['./register-data.component.css'],
})
export class RegisterDataComponent implements OnInit {
  emailFormat: boolean = true;
  passwordFormat: boolean = true;
  emailRepeated: boolean = false;
  searchTerm: string = '';
  passTerm: string = '';
  usernameTerm: string = '';
  priceTerm: string = '';
  noPass: boolean = false;
  noMail: boolean = false;
  noUsername: boolean = false;
  userService = inject(UserService);
  dataCreated: boolean = false;
  admin: PublicUser = new PublicUser('', '', '', false);
  cookieService = inject(CookieService);
  waitSvc = inject(WaitService);

  async ngOnInit() {
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  async verifyEmail() {
    if (this.searchTerm != '') {
      this.noMail = false;
      let userAux = await this.getUser();
      if (userAux != undefined) {
        this.emailRepeated = true;
      } else {
        this.emailRepeated = false;
      }
    } else {
      this.emailRepeated = false;
    }
  }
  async verifyPassword() {
    if (this.passTerm != '') {
      this.noPass = false;
      const hasUpperCase = /[A-Z]/.test(this.passTerm);
      const hasLowerCase = /[a-z]/.test(this.passTerm);
      const hasNumber = /[0-9]/.test(this.passTerm);
      const hasValidLength = this.passTerm.length >= 8;
      if (hasUpperCase && hasLowerCase && hasNumber && hasValidLength) {
        this.passwordFormat = true;
      } else {
        this.passwordFormat = false;
      }
    } else {
      this.passwordFormat = true;
    }
  }
  async getUser(): Promise<User | undefined> {
    try {
      const data = await this.userService
        .getUserByEmail(this.searchTerm)
        .toPromise();
      console.log(data?.id);
      return data;
    } catch (error) {
      console.warn('Not found');
      return undefined;
    }
  }
  async createUser() {
    this.waitSvc.displayWait(true);
    if (this.passTerm == '') {
      this.noPass = true;
    }
    if (this.searchTerm == '') {
      this.noMail = true;
    }
    if (this.usernameTerm == '') {
      this.noUsername = true;
    }
    if (
      this.searchTerm != '' &&
      this.passTerm != '' &&
      this.usernameTerm != '' &&
      this.passwordFormat
    ) {
      let newUser = new User(
        this.generateRandomId(16),
        this.getString('emailInp'),
        this.getString('passwordInp'),
        this.getString('usernameInp')
      );
      newUser.client = true;
      try {
        ///this.userService.saveUser(newUser).subscribe(() => {});
        await this.userService.saveUser(newUser).toPromise();
        this.dataCreated = true;
        localStorage.setItem('userCreated', JSON.stringify(true));
        if (this.isAdmin()) {
          this.waitSvc.displayWait(false);
          window.location.href = `/admin/signup/shipmentData/${newUser.id}`;
        } else {
          this.waitSvc.displayWait(false);
          window.location.href = `signup/shipmentdata/${newUser.id}`;
        }
      } catch (err: any) {
        if ((err.status = '304')) {
          this.emailRepeated = true;
        }
        this.waitSvc.displayWait(false);
        return;
      }
    }
  }
  getString(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: string = '';
    if (inpAux) {
      input = inpAux.value;
    }
    return input;
  }
  getNumber(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input: number = 0;
    if (inpAux) {
      input = parseInt(inpAux.value);
    }
    return input;
  }
  generateRandomId(length: number = 16): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  isAdmin() {
    //funcion para detectar si el usuario logueado es administrador
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
}
