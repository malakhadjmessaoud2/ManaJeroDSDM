import { TestBed } from '@angular/core/testing';

import { HowService } from './how.service';

describe('HowService', () => {
  let service: HowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
