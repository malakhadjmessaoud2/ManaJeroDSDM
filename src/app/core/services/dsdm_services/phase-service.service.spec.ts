import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhaseServiceService } from './phase-service.service';
import { Dsdm } from '../../models/dsdm_models/dsdm.model';

describe('PhaseServiceService', () => {
  let service: PhaseServiceService;
  let httpMock: HttpTestingController;

  // Configuration de l'environnement de test avant chaque test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PhaseServiceService]
    });

    // Initialisation des instances du service et du contrôleur HTTP mocké
    service = TestBed.inject(PhaseServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Vérification qu'il n'y a pas de requêtes HTTP en attente après chaque test
  afterEach(() => {
    httpMock.verify();
  });

  // Test de la méthode getDsdmByProjectId
  it('should retrieve a Dsdm by project ID', () => {
    const dummyDsdm: Dsdm = {
      id: '1',
      context: 'Context',
      priorisation: 'Priorisation',
      status: 'Status',
      startDate: new Date(),
      endDate: new Date(),
      id_user: 'User1',
      project: 'Project1'
    };

    service.getDsdmByProjectId('1').subscribe(dsdm => {
      expect(dsdm).toEqual(dummyDsdm);
    });

    // Vérifie que la requête HTTP a été effectuée avec la méthode GET
    const request = httpMock.expectOne(`${service['apiUrlDsdm']}/show/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyDsdm); // Renvoie un dummy Dsdm en réponse à la requête
  });

  // Test de la méthode addDsdm
  it('should add a new Dsdm', () => {
    const dummyDsdm: Dsdm = {
      id: '1',
      context: 'Context',
      priorisation: 'Priorisation',
      status: 'Status',
      startDate: new Date(),
      endDate: new Date(),
      id_user: 'User1',
      project: 'Project1'
    };

    service.addDsdm('1', 'Context', 'Priorisation', 'Status', '2024-01-01', '2024-01-31', 'User1')
      .subscribe(dsdm => {
        expect(dsdm).toEqual(dummyDsdm);
      });

    // Vérifie que la requête HTTP a été effectuée avec la méthode POST
    const request = httpMock.expectOne(`${service['apiUrlDsdm']}/add/1`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyDsdm); // Renvoie un dummy Dsdm en réponse à la requête
  });

  // Test de la méthode updateDsdm
  it('should update a Dsdm', () => {
    const updatedDsdm: Dsdm = {
      id: '1',
      context: 'Updated Context',
      priorisation: 'Updated Priorisation',
      status: 'Updated Status',
      startDate: new Date(),
      endDate: new Date(),
      id_user: 'User1',
      project: 'Project1'
    };

    service.updateDsdm('1', '1', 'Updated Context', 'Updated Priorisation', 'Updated Status', '2024-01-01', '2024-01-31', 'User1')
      .subscribe(dsdm => {
        expect(dsdm).toEqual(updatedDsdm);
      });

    // Vérifie que la requête HTTP a été effectuée avec la méthode PUT
    const request = httpMock.expectOne(`${service['apiUrlDsdm']}/update/1/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedDsdm); // Renvoie un dummy Dsdm en réponse à la requête
  });

});
