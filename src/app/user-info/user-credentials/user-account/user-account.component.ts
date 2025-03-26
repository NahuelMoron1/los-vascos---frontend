import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { Userdata } from 'src/app/models/Userdata';
import { CookieService } from 'src/app/services/cookie.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UserDisplayService } from 'src/app/services/user-display.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
  displayService = inject(UserDisplayService);
  userdataService = inject(UserdataService);
  displayed = this.displayService.displayed;
  user: PublicUser = new PublicUser('', '', '', false);
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
  orderService = inject(OrdersService);
  cookieService = inject(CookieService);
  admin: boolean = false;

  async ngOnInit() {
    this.cookieService.returnUser().subscribe((data) => {
      this.user = data;
    });
    (await this.userdataService.returnUserdata(this.user.id)).subscribe(
      (userdata) => {
        this.userdata = userdata;
      }
    );
    this.admin = await this.isAdmin();
  }

  changeDisplay(name: string) {
    this.displayService.changeDisplay(name);
  }
  async isAdmin() {
    let tokenExist: boolean = false;
    (await this.cookieService.tokenExistTC('admin_token')).subscribe((data) => {
      tokenExist = data;
    });
    if (tokenExist) {
      return true;
    } else {
      return false;
    }
  }
}
