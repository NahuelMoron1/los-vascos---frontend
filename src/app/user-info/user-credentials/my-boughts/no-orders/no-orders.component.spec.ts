import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOrdersComponent } from './no-orders.component';

describe('NoOrdersComponent', () => {
  let component: NoOrdersComponent;
  let fixture: ComponentFixture<NoOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoOrdersComponent]
    });
    fixture = TestBed.createComponent(NoOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
