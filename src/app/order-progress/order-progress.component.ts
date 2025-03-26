import { Component } from '@angular/core';

@Component({
  selector: 'app-order-progress',
  templateUrl: './order-progress.component.html',
  styleUrls: ['./order-progress.component.css']
})
export class OrderProgressComponent {
  reserved: boolean = true;
  comprobante: boolean = false;
  confirmed: boolean = false;
  preparation: boolean = false;
  sent: boolean = false;
}
