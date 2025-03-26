import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasOrderComponent } from './has-order.component';

describe('HasOrderComponent', () => {
  let component: HasOrderComponent;
  let fixture: ComponentFixture<HasOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HasOrderComponent]
    });
    fixture = TestBed.createComponent(HasOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
