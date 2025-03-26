import { TestBed } from '@angular/core/testing';

import { OrderXProductsXOxpService } from './order-x-products-x-oxp.service';

describe('OrderXProductsXOxpService', () => {
  let service: OrderXProductsXOxpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderXProductsXOxpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
