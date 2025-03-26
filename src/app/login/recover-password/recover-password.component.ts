import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent {
  userService = inject(UserService);
  userSearched: User = new User('', '', '', '');
  sended: boolean = false;
  async recoverPassword() {
    let emailAux = document.getElementById('emailInp') as HTMLInputElement;
    if (emailAux) {
      let email = emailAux.value;
      if (email != '') {
        this.sended = true;
        await this.userService.readUserEmail(email);
      }
    }
  }
}
