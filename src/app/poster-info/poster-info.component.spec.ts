import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterInfoComponent } from './poster-info.component';

describe('PosterInfoComponent', () => {
  let component: PosterInfoComponent;
  let fixture: ComponentFixture<PosterInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosterInfoComponent]
    });
    fixture = TestBed.createComponent(PosterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
