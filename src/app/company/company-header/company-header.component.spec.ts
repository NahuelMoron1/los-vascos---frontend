import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHeaderComponent } from './company-header.component';

describe('CompanyHeaderComponent', () => {
  let component: CompanyHeaderComponent;
  let fixture: ComponentFixture<CompanyHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyHeaderComponent]
    });
    fixture = TestBed.createComponent(CompanyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
