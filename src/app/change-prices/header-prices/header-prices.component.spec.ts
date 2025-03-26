import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPricesComponent } from './header-prices.component';

describe('HeaderPricesComponent', () => {
  let component: HeaderPricesComponent;
  let fixture: ComponentFixture<HeaderPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderPricesComponent]
    });
    fixture = TestBed.createComponent(HeaderPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
