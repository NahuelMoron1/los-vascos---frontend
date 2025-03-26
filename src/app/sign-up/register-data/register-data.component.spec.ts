import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDataComponent } from './register-data.component';

describe('RegisterDataComponent', () => {
  let component: RegisterDataComponent;
  let fixture: ComponentFixture<RegisterDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterDataComponent]
    });
    fixture = TestBed.createComponent(RegisterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
