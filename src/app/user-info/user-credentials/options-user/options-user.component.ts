import { Component, OnInit, inject } from '@angular/core';
import { adminGuard } from 'src/app/guards/admin.guard';
import { PublicUser } from 'src/app/models/PublicUser';
import { CookieService } from 'src/app/services/cookie.service';
import { UserDisplayService } from 'src/app/services/user-display.service';

@Component({
  selector: 'app-options-user',
  templateUrl: './options-user.component.html',
  styleUrls: ['./options-user.component.css'],
})
export class OptionsUserComponent implements OnInit {
  displayService = inject(UserDisplayService);
  displayed = this.displayService.displayed;
  cookieService = inject(CookieService);
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);
  displaySubmenu: boolean = false;
  displayCoupon: boolean = false;

  async ngOnInit() {
    this.cookieService.returnUser().subscribe((data) => {
      this.user = data;
    });
    this.cookieService.returnAdmin().subscribe((data) => {
      this.admin = data;
    });
  }

  toggleSubmenu(type: string) {
    if (type == 'user') {
      if (this.displaySubmenu) {
        this.displaySubmenu = false;
      } else {
        this.displaySubmenu = true;
      }
    } else if (type == 'coupon') {
      if (this.displayCoupon) {
        this.displayCoupon = false;
      } else {
        this.displayCoupon = true;
      }
    }
  }
  changeDisplay(name: string) {
    this.displayService.changeDisplay(name);
    window.scrollTo(0, 0);
  }

  isAdmin() {
    if (this.admin.email != '') {
      return true;
    } else {
      return false;
    }
  }
}
