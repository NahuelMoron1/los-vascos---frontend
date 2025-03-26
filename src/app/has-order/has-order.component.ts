import { Component, OnInit, inject } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../models/Order';

@Component({
  selector: 'app-has-order',
  templateUrl: './has-order.component.html',
  styleUrls: ['./has-order.component.css']
})
export class HasOrderComponent implements OnInit{
    ngOnInit() {
      window.scrollTo(0, 0);
    }
}
