import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeaturesComponent } from './add-features.component';

describe('AddFeaturesComponent', () => {
  let component: AddFeaturesComponent;
  let fixture: ComponentFixture<AddFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeaturesComponent]
    });
    fixture = TestBed.createComponent(AddFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
