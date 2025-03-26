import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsDetailComponent } from './buttons-detail.component';

describe('ButtonsDetailComponent', () => {
  let component: ButtonsDetailComponent;
  let fixture: ComponentFixture<ButtonsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsDetailComponent]
    });
    fixture = TestBed.createComponent(ButtonsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
