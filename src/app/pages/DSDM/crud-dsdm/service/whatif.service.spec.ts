import { TestBed } from '@angular/core/testing';

import { WhatifService } from './whatif.service';

describe('WhatifService', () => {
  let service: WhatifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
