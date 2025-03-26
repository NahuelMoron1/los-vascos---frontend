import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedDataComponent } from './payed-data.component';

describe('PayedDataComponent', () => {
  let component: PayedDataComponent;
  let fixture: ComponentFixture<PayedDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayedDataComponent]
    });
    fixture = TestBed.createComponent(PayedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
