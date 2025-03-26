import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAccesibilitiesComponent } from './product-accesibilities.component';

describe('ProductAccesibilitiesComponent', () => {
  let component: ProductAccesibilitiesComponent;
  let fixture: ComponentFixture<ProductAccesibilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAccesibilitiesComponent]
    });
    fixture = TestBed.createComponent(ProductAccesibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
