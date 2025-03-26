import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/Order';
import { OrdersService } from '../services/orders.service';
import { CookieService } from '../services/cookie.service';
import { PublicUser } from '../models/PublicUser';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css'],
})
export class OrderPlacedComponent implements OnInit {
  orderService = inject(OrdersService);
  order: Order = new Order(
    '',
    '',
    0,
    0,
    0,
    0,
    new Date(),
    '',
    '',
    false,
    '',
    '',
    ''
  );
  activeRoute = inject(ActivatedRoute);
  id = this.activeRoute.snapshot.params['id'];
  async ngOnInit() {
    window.scrollTo(0, 0);
    try {
      const data = await this.orderService.getOrder(this.id).toPromise();
      if (data != undefined) {
      } else {
        window.location.href = '';
      }
    } catch (error) {
      console.error('Error obteniendo datos:', error);
      window.location.href = '';
      throw error; // Puedes manejar el error de acuerdo a tus necesidades
    }
  }
}
