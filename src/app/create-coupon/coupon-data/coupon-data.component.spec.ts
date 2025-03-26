import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponDataComponent } from './coupon-data.component';

describe('CouponDataComponent', () => {
  let component: CouponDataComponent;
  let fixture: ComponentFixture<CouponDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponDataComponent]
    });
    fixture = TestBed.createComponent(CouponDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
