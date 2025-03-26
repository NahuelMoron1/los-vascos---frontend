import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTextComponent } from './company-text.component';

describe('CompanyTextComponent', () => {
  let component: CompanyTextComponent;
  let fixture: ComponentFixture<CompanyTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyTextComponent]
    });
    fixture = TestBed.createComponent(CompanyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
