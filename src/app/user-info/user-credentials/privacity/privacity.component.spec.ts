import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacityComponent } from './privacity.component';

describe('PrivacityComponent', () => {
  let component: PrivacityComponent;
  let fixture: ComponentFixture<PrivacityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacityComponent]
    });
    fixture = TestBed.createComponent(PrivacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
