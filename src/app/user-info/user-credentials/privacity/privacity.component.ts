import { Component, inject, OnInit } from '@angular/core';
import { PublicUser } from 'src/app/models/PublicUser';
import { User } from 'src/app/models/User';
import { UserDisplayService } from 'src/app/services/user-display.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-privacity',
  templateUrl: './privacity.component.html',
  styleUrls: ['./privacity.component.css'],
})
export class PrivacityComponent implements OnInit {
  user: PublicUser = new PublicUser('', '', '', false);
  userService = inject(UserService);
  displayService = inject(UserDisplayService);
  async ngOnInit() {
    ///this.user = await this.userService.getUserLogged();
  }
  changeDisplay(name: string) {
    this.displayService.changeDisplay(name);
  }
}
