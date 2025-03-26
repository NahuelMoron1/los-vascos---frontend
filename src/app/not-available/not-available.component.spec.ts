import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAvailableComponent } from './not-available.component';

describe('NotAvailableComponent', () => {
  let component: NotAvailableComponent;
  let fixture: ComponentFixture<NotAvailableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotAvailableComponent]
    });
    fixture = TestBed.createComponent(NotAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
