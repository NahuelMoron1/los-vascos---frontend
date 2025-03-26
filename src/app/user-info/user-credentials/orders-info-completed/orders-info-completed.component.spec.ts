import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersInfoCompletedComponent } from './orders-info-completed.component';

describe('OrdersInfoCompletedComponent', () => {
  let component: OrdersInfoCompletedComponent;
  let fixture: ComponentFixture<OrdersInfoCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersInfoCompletedComponent]
    });
    fixture = TestBed.createComponent(OrdersInfoCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
