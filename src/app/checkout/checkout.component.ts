import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from '../services/cookie.service';
import { PublicUser } from '../models/PublicUser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cookieService = inject(CookieService);
  admin: PublicUser = new PublicUser('', '', '', false);
  async ngOnInit() {
    window.scrollTo(0, 0);
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
  isAdmin() {
    return this.admin.email != '';
  }
}
