import { TestBed } from '@angular/core/testing';

import { UserDisplayService } from './user-display.service';

describe('UserDisplayService', () => {
  let service: UserDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
