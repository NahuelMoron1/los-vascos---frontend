import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  userService = inject(UserService);
  user: PublicUser = new PublicUser('', '', '', false);
  updated: boolean = false;
  badEmail: boolean = false;
  async ngOnInit() {
    ////this.user = await this.userService.getUserLogged();
  }
  changePass() {}
}
