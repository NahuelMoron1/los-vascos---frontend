import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDataComponent } from './discount-data.component';

describe('DiscountDataComponent', () => {
  let component: DiscountDataComponent;
  let fixture: ComponentFixture<DiscountDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountDataComponent]
    });
    fixture = TestBed.createComponent(DiscountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
