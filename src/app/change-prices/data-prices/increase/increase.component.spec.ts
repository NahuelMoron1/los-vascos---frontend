import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseComponent } from './increase.component';

describe('IncreaseComponent', () => {
  let component: IncreaseComponent;
  let fixture: ComponentFixture<IncreaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncreaseComponent]
    });
    fixture = TestBed.createComponent(IncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
