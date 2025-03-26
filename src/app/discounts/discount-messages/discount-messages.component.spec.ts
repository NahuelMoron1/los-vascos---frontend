import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountMessagesComponent } from './discount-messages.component';

describe('DiscountMessagesComponent', () => {
  let component: DiscountMessagesComponent;
  let fixture: ComponentFixture<DiscountMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountMessagesComponent]
    });
    fixture = TestBed.createComponent(DiscountMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
