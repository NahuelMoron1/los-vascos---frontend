import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBoughtsComponent } from './my-boughts.component';

describe('MyBoughtsComponent', () => {
  let component: MyBoughtsComponent;
  let fixture: ComponentFixture<MyBoughtsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBoughtsComponent]
    });
    fixture = TestBed.createComponent(MyBoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
