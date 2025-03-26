import { Component, OnInit, inject } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { Userdata } from 'src/app/models/Userdata';
import { CookieService } from 'src/app/services/cookie.service';
import { UserDisplayService } from 'src/app/services/user-display.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  displayService = inject(UserDisplayService);
  userdataService = inject(UserdataService);
  displayed = this.displayService.displayed;
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);
  userdata: Userdata = new Userdata(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    0,
    '',
    ''
  );
  cookieService = inject(CookieService);

  async ngOnInit() {
    if (this.displayed == 'adminSupport') {
    } else {
      (await this.cookieService.getUser()).subscribe((data) => {
        this.user = data;
      });
      const usersAux = await this.getUserData();
      if (usersAux != undefined) {
        this.userdata = usersAux;
      }
      (await this.cookieService.getAdmin()).subscribe((data) => {
        this.admin = data;
      });
    }
  }

  changeDisplay(name: string) {
    this.displayService.changeDisplay(name);
  }
  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }

  async getUserData() {
    /* La funcion se conecta con el servicio de userdata para leer la base de datos de la informacion del envio para los usuarios */
    try {
      const data = await this.userdataService
        .getUserdataByUserID(this.user.id)
        .toPromise();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
}
