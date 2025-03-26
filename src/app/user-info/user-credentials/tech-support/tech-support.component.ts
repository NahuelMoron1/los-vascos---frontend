import { Component, inject } from '@angular/core';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-tech-support',
  templateUrl: './tech-support.component.html',
  styleUrls: ['./tech-support.component.css'],
})
export class TechSupportComponent {
  emailService = inject(EmailService);
  sending: boolean = false;
  sended: boolean = false;
  getString(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input = '';
    if (inpAux) {
      input = inpAux.value;
    }
    return input;
  }
  getChecked() {
    const telephoneRadio = document.getElementById(
      'phoneContact'
    ) as HTMLInputElement;
    const emailRadio = document.getElementById(
      'emailContact'
    ) as HTMLInputElement;
    if (telephoneRadio.checked) {
      return 'Telefono';
    } else if (emailRadio.checked) {
      return 'Email';
    } else {
      return 'none';
    }
  }
  getNumber(name: string) {
    let inpAux = document.getElementById(name) as HTMLInputElement;
    let input = 0;
    if (inpAux) {
      input = parseInt(inpAux.value);
    }
    return input;
  }
  async sendMail() {
    this.sending = true;
    let html = this.getInputs();
    if (html != '') {
      let to = 'info.losvascosdistribucion@gmail.com';
      let subject = 'MENSAJE DE SOPORTE';
      let info = await this.emailService.sendEmailTC(to, subject, html);
      this.sending = false;
      this.sended = true;
      console.log(info);
    }
  }
  getInputs() {
    let firstname = this.getString('first-name');
    let lastname = this.getString('last-name');
    let phone = this.getNumber('telephoneinp');
    let email = this.getString('emailinp');
    let comments = this.getString('commentsinp');
    let checked = this.getChecked();
    if (
      firstname == '' ||
      lastname == '' ||
      phone == 0 ||
      email == '' ||
      comments == '' ||
      checked == 'none'
    ) {
      alert('No podes dejar campos vacios o sin marcar');
      return '';
    } else {
      let html = `<div style="display: flex; align-items: center; width: 100%; background-color: rgb(239, 239, 239);">
      <div style="font-family: sans-serif; border: 2px solid orange; padding: 1vi; height: fit-content; width: 35vi; background-color: white;">
          <div style="display: flex; flex-direction: column; align-items: center">
              <h2>TENES UN NUEVO MENSAJE DE SOPORTE</h2>
              <p>Mensaje recibido por ${firstname} ${lastname}</p>
          </div>
          <p>Comentarios del mensaje recibido: ${comments}</p>
          <p>Telefono del usuario: ${phone}</p>
          <p>Email del usuario: ${email}</p>
          <p>Preferencia de contacto del usuario: ${checked}</p>
        </div>
      </div>`;
      return html;
    }
  }
}
