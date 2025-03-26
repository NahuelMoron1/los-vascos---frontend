import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { CookieService } from 'src/app/services/cookie.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-message-success',
  templateUrl: './message-success.component.html',
  styleUrls: ['./message-success.component.css'],
})
export class MessageSuccessComponent implements OnInit {
  userService = inject(UserService);
  cookieService = inject(CookieService);
  user: PublicUser = new PublicUser('', '', '', false);
  admin: PublicUser = new PublicUser('', '', '', false);

  async ngOnInit() {
    (await this.cookieService.getUser()).subscribe((data) => {
      this.user = data;
    });
    (await this.cookieService.getAdmin()).subscribe((data) => {
      this.admin = data;
    });
  }
}
