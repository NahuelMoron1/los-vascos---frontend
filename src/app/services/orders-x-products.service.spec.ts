import { TestBed } from '@angular/core/testing';

import { OrdersXProductsService } from './orders-x-products.service';

describe('OrdersXProductsService', () => {
  let service: OrdersXProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersXProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
