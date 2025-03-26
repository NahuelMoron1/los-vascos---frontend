import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentDataComponent } from './shipment-data.component';

describe('ShipmentDataComponent', () => {
  let component: ShipmentDataComponent;
  let fixture: ComponentFixture<ShipmentDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentDataComponent]
    });
    fixture = TestBed.createComponent(ShipmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
