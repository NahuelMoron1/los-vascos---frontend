import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountButtonsComponent } from './discount-buttons.component';

describe('DiscountButtonsComponent', () => {
  let component: DiscountButtonsComponent;
  let fixture: ComponentFixture<DiscountButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountButtonsComponent]
    });
    fixture = TestBed.createComponent(DiscountButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
