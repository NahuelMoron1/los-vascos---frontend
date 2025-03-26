import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesMenuComponent } from './branches-menu.component';

describe('BranchesMenuComponent', () => {
  let component: BranchesMenuComponent;
  let fixture: ComponentFixture<BranchesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
