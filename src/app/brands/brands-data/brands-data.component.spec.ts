import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDataComponent } from './brands-data.component';

describe('BrandsDataComponent', () => {
  let component: BrandsDataComponent;
  let fixture: ComponentFixture<BrandsDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandsDataComponent]
    });
    fixture = TestBed.createComponent(BrandsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
