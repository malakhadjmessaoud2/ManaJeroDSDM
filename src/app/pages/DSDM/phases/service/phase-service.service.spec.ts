import { TestBed } from '@angular/core/testing';

import { PhaseServiceService } from './phase-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Dsdm } from '../model/dsdm.model';

describe('PhaseServiceService', () => {
  let service: PhaseServiceService;
  let httpMock: HttpTestingController;
  const apiUrlDsdm = 'http://localhost:9090/dsdm';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhaseServiceService],
    });
    service = TestBed.inject(PhaseServiceService);
    httpMock = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should fetch Dsdm by project ID', () => {
    const projectId = '123';
    const dummyDsdm: Dsdm = {
      id: '1',
      context: 'Project context',
      priorisation: 'High',
      status: 'In Progress',
      startDate: new Date('2023-08-01'),
      endDate: new Date('2023-12-01'),
      id_user: 'user123',
      project: 'Project ABC'
    };

    service.getDsdmByProjectId(projectId).subscribe(dsdm => {
      expect(dsdm).toEqual(dummyDsdm);
    });

    const req = httpMock.expectOne(`${apiUrlDsdm}/show/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyDsdm);
  });

  it('should return null when Dsdm is not found', () => {
    const projectId = '123';

    service.getDsdmByProjectId(projectId).subscribe(dsdm => {
      expect(dsdm).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrlDsdm}/show/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
