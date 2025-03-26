import { TestBed } from '@angular/core/testing';

import { CartProductService } from './cart-product.service';

describe('CartProductService', () => {
  let service: CartProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
