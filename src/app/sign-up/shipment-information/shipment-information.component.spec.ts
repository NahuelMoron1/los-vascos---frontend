import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentInformationComponent } from './shipment-information.component';

describe('ShipmentInformationComponent', () => {
  let component: ShipmentInformationComponent;
  let fixture: ComponentFixture<ShipmentInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentInformationComponent]
    });
    fixture = TestBed.createComponent(ShipmentInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
