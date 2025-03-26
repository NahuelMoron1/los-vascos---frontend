import { TestBed } from '@angular/core/testing';

import { UserXcouponService } from './user-xcoupon.service';

describe('UserXcouponService', () => {
  let service: UserXcouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserXcouponService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
