import { Component, OnInit, inject } from '@angular/core';
import { adminGuard } from 'src/app/guards/admin.guard';
import { PublicUser } from 'src/app/models/PublicUser';
import { CookieService } from 'src/app/services/cookie.service';
import { UserDisplayService } from 'src/app/services/user-display.service';

@Component({
  selector: 'app-user-credentials',
  templateUrl: './user-credentials.component.html',
  styleUrls: ['./user-credentials.component.css'],
})
export class UserCredentialsComponent implements OnInit {
  displayService = inject(UserDisplayService);
  displayed: string = '';
  cookieService = inject(CookieService);
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);

  async ngOnInit() {
    this.displayService._displayed.subscribe((data) => {
      this.displayed = data;
    });
    this.getParameters();
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  getParameters() {
    if (localStorage.getItem('userOrders')) {
      this.displayService.changeDisplay('myOrders');
      localStorage.removeItem('userOrders');
      return true;
    } else {
      return false;
    }
  }
  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
}
