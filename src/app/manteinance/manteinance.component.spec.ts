import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManteinanceComponent } from './manteinance.component';

describe('ManteinanceComponent', () => {
  let component: ManteinanceComponent;
  let fixture: ComponentFixture<ManteinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManteinanceComponent]
    });
    fixture = TestBed.createComponent(ManteinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
