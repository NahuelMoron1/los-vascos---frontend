import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  whatsappNumber = ''; // Incluye el código del país sin '+'
  whatsappMessage = 'Hola! Quiero hacer una consulta sobre un producto. ';

  email = 'info.losvascosdistribucion@gmail.com';
  subject = 'Consulta sobre productos';
  body = 'Hola, estoy interesado en conocer más sobre ciertos productos';

  whatsappLink(): string {
    const encodedMessage = encodeURIComponent(this.whatsappMessage);
    return `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
  }

  gmailLink(): string {
    const encodedSubject = encodeURIComponent(this.subject);
    const encodedBody = encodeURIComponent(this.body);
    return `mailto:${this.email}?subject=${encodedSubject}&body=${encodedBody}`;
  }
}
