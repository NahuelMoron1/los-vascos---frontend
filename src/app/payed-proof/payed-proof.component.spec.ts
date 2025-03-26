import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedProofComponent } from './payed-proof.component';

describe('PayedProofComponent', () => {
  let component: PayedProofComponent;
  let fixture: ComponentFixture<PayedProofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayedProofComponent]
    });
    fixture = TestBed.createComponent(PayedProofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
