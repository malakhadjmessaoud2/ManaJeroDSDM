import { TestBed } from '@angular/core/testing';

import { ComposantService } from './composant.service';

describe('ComposantService', () => {
  let service: ComposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
