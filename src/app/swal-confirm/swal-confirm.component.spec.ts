import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwalConfirmComponent } from './swal-confirm.component';

describe('SwalConfirmComponent', () => {
  let component: SwalConfirmComponent;
  let fixture: ComponentFixture<SwalConfirmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwalConfirmComponent]
    });
    fixture = TestBed.createComponent(SwalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
