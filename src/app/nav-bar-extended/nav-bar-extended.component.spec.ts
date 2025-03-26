import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarExtendedComponent } from './nav-bar-extended.component';

describe('NavBarExtendedComponent', () => {
  let component: NavBarExtendedComponent;
  let fixture: ComponentFixture<NavBarExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarExtendedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
