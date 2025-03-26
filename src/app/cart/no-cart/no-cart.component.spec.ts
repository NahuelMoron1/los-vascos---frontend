import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCartComponent } from './no-cart.component';

describe('NoCartComponent', () => {
  let component: NoCartComponent;
  let fixture: ComponentFixture<NoCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoCartComponent]
    });
    fixture = TestBed.createComponent(NoCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
