import { Component, inject, OnInit } from '@angular/core';
import { DiscountsService } from 'src/app/services/discounts.service';

@Component({
  selector: 'app-discount-messages',
  templateUrl: './discount-messages.component.html',
  styleUrls: ['./discount-messages.component.css']
})
export class DiscountMessagesComponent implements OnInit{
  added: boolean = false;
  deleted: boolean = false;
  discountService = inject(DiscountsService);

  ngOnInit(): void {
      this.discountService.returnAdded().subscribe(added => {
        this.added = added;
      });
      this.discountService.returnDeleted().subscribe(deleted => {
        this.deleted = deleted;
      });
  }
}
