import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutOptionsComponent } from './checkout-options.component';

describe('CheckoutOptionsComponent', () => {
  let component: CheckoutOptionsComponent;
  let fixture: ComponentFixture<CheckoutOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutOptionsComponent]
    });
    fixture = TestBed.createComponent(CheckoutOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
