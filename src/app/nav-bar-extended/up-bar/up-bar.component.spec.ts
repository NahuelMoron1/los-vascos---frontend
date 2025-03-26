import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpBarComponent } from './up-bar.component';

describe('UpBarComponent', () => {
  let component: UpBarComponent;
  let fixture: ComponentFixture<UpBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
