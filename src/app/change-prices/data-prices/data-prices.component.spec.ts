import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPricesComponent } from './data-prices.component';

describe('DataPricesComponent', () => {
  let component: DataPricesComponent;
  let fixture: ComponentFixture<DataPricesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataPricesComponent]
    });
    fixture = TestBed.createComponent(DataPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
