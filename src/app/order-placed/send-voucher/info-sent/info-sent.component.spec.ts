import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSentComponent } from './info-sent.component';

describe('InfoSentComponent', () => {
  let component: InfoSentComponent;
  let fixture: ComponentFixture<InfoSentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSentComponent]
    });
    fixture = TestBed.createComponent(InfoSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
