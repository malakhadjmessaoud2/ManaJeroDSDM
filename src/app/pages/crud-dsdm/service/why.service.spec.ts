import { TestBed } from '@angular/core/testing';

import { WhyService } from './why.service';

describe('WhyService', () => {
  let service: WhyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
