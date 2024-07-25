// services/phase-service.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dsdm } from '../model/dsdm.model';
import { Project } from '../model/project.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhaseServiceService {


  private projects: Project[] = [
    { id: "1", title: 'Projet 1', status: 'En cours' },
    { id: "2", title: 'Projet 2', status: 'Terminé' },
    { id: "3", title: 'Projet 3', status: 'En attente' }
  ];

  getProjets(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjetById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(projet => projet.id === id));
  }

  createDsdmLink(dsdm: Dsdm): Observable<void> {
    // Implémenter la logique pour enregistrer dsdm dans la base de données ici
    console.log('Création d\'une liaison DSDM pour le projet:', dsdm.project);
    return of();
  }
  private apiUrl = 'http://localhost:9090/dsdm';

  constructor(private http: HttpClient) { }



  createDsdm(dsdm: Dsdm): Observable<Dsdm> {
    return this.http.post<Dsdm>(`${this.apiUrl}/add`, dsdm);
  }

  getDsdmByProjectId(projectId: string): Observable<Dsdm | null> {
    return this.http.get<Dsdm | null>(`${this.apiUrl}/show/${projectId}`);
  }


  addDsdm(
    idProject: string,
    name: string,
    desc: string,
    status: string,
    startDate: string,
    endDate: string,
    idUser: string
  ): Observable<any> {
    const url = `${this.apiUrl}/add/${idProject}`;

    const params = new HttpParams()
      .set('name', name)
      .set('desc', desc)
      .set('status', status)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('id_user', idUser);

    return this.http.post(url, params);
  }
}
