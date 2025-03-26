import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErrorComponent } from './message-error.component';

describe('MessageErrorComponent', () => {
  let component: MessageErrorComponent;
  let fixture: ComponentFixture<MessageErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageErrorComponent]
    });
    fixture = TestBed.createComponent(MessageErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
