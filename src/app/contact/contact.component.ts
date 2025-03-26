import { Component, inject } from '@angular/core';
import { EmailService } from '../services/email.service';
import { WaitService } from '../services/wait.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  emailService = inject(EmailService);
  waitService = inject(WaitService);
  bffurl = environment.endpoint;
  sent: boolean = false;
  error: boolean = false;

  async sendMessage() {
    this.waitService.displayWait(true);
    this.sent = false;
    this.error = false;
    const name = this.getString('nameInp');
    const from = this.getString('emailInp');
    const number = this.getNumber('phoneInp');
    const message = this.getString('messageInp');
    const to = 'info.losvascosdistribucion@gmail.com';
    const subject = 'Contacto por parte de la página web';
    const html = `<div style="display: flex; align-items: center; width: 50svw; background-color: rgb(0, 0, 0); color: rgb(255, 255, 255);">
    <div style="font-family: sans-serif; padding: 1vi; height: fit-content; background-color: black;">
        <div style="display: flex; flex-direction: column; align-items: center; background-color: rgb(0, 0, 0)">
            <img src="https://api.distribucionlosvascos.com/uploads/logos/losvascos.png" style="width: 40svw;" alt="">
        </div>
        <h1 style="color: rgb(221, 26, 0); text-align: center;">Mensaje de contacto de pagina web</h1>
        <p>Hola! Tenes un nuevo mensaje de contacto por parte de la pagina web</p>
        <p>Nombre de contacto: ${name}</p>
        <p>Email de contacto: ${from}</p>
        <p>Numero de contacto: ${number}</p>
        <p>Mensaje: ${message}</p>
       </div>
    </div>`;

    try {
      await this.emailService.sendEmailTC(to, subject, html);
      this.error = false;
      this.sent = true;
      this.waitService.displayWait(false);
    } catch (err) {
      this.sent = false;
      this.error = true;
      this.waitService.displayWait(false);
    }
  }
  getString(name: string): string {
    //La funcion sirve para leer cada uno de los input del html, siempre y cuando sean string
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = '';
    if (divAux != null && divAux != undefined) {
      miDiv = divAux.value;
    }
    return miDiv;
  }

  getNumber(name: string) {
    //Misma funcion que la de arriba pero para los numeros
    let divAux = document.getElementById(name) as HTMLInputElement;
    let miDiv = 0;
    if (divAux) {
      miDiv = parseFloat(divAux.value);
    }
    return miDiv;
  }
}
