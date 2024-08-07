import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Dsdm } from '../model/dsdm.model';
import { Project } from '../model/project.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feasibility } from '../model/feasibility.model';
import { Foundation } from '../model/foundation.model';
import { Sprint } from '../model/sprint.model';
import { Iteration } from '../model/iteration.model';
import { DeploymentPlan } from '../model/deployment-plan.model';
import { Release } from '../model/release.model';
import { KPI } from '../model/kpi.model';
import { Feedback } from '../model/feedback.model';
import { ImprovementPlan } from '../model/improvement-plan.model';
import { Report } from '../model/report.model';

@Injectable({
  providedIn: 'root'
})
export class PhaseServiceService {

  // Static project list
  private projects: Project[] = [
    { id: "1", title: 'Projet 1', status: 'En cours' },
    { id: "2", title: 'Projet 2', status: 'Terminé' },
    { id: "3", title: 'Projet 3', status: 'En attente' },
    { id: "4", title: 'projet 4', status: 'En cours' },
    { id: "5", title: 'EventMaster', status: 'En cours' },
    { id: "6", title: 'cap', status: 'En cours' }


  ];

  getProjets(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjetById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(projet => projet.id === id));
  }

  // API URLs
  private apiUrlDsdm = 'http://localhost:9090/dsdm';
  private apiUrlFeasibility = 'http://localhost:9090/feasibility';
  private apiUrlFoundation = 'http://localhost:9090/foundation';
  private apiUrlSprint = 'http://localhost:9090/sprint';
  private apiUrlIteration = 'http://localhost:9090/iteration';
  private apiUrlDeploymentPlan = 'http://localhost:9090/deploymentPlan';
  private apiUrlRelease = 'http://localhost:9090/release';
  private apiUrlKPI = 'http://localhost:9090/kpi';
  private apiUrlReport = 'http://localhost:9090/report';
  private apiUrlFeedback = 'http://localhost:9090/feedback';
  private apiUrlImprovementPlan = 'http://localhost:9090/improvementPlan';

  constructor(private http: HttpClient) {}

  // Phase 1
  getDsdmByProjectId(projectId: string): Observable<Dsdm | null> {
    return this.http.get<Dsdm | null>(`${this.apiUrlDsdm}/show/${projectId}`);
  }

  addDsdm(
    idProject: string,
    context: string,
    priorisation: string,
    status: string,
    startDate: string,
    endDate: string,
    idUser: string
  ): Observable<any> {
    const url = `${this.apiUrlDsdm}/add/${idProject}`;
    const params = new HttpParams()
      .set('context', context)
      .set('priorisation', priorisation)
      .set('status', status)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('id_user', idUser);

    return this.http.post(url, params);
  }
  updateDsdm(projectId: string, dsdmId: string, context: string, priorisation: string, status: string, startDate: string, endDate: string, id_user: string): Observable<Dsdm> {
    const url = `${this.apiUrlDsdm}/update/${projectId}/${dsdmId}`;
    let params = new HttpParams()
      .set('context', context)
      .set('priorisation', priorisation)
      .set('status', status)
      .set('startDate', startDate)
      .set('endDate', endDate)
      .set('id_user', id_user);

    return this.http.put<Dsdm>(url, {}, { params });
  }

  // Phase 2
  updateFeasibility(projectId: string, feasibilityId: string, technicalFeasibility: string, commercialFeasibility: string, mvp: string, releaseBoard: string, viability: string, id_user: string): Observable<Feasibility> {
    const url = `${this.apiUrlFeasibility}/updatefeasibility/${projectId}/${feasibilityId}`;
    let params = new HttpParams()
      .set('technicalFeasibility', technicalFeasibility)
      .set('commercialFeasibility', commercialFeasibility)
      .set('mvp', mvp)
      .set('releaseBoard', releaseBoard)
      .set('viability', viability)
      .set('id_user', id_user);

    return this.http.put<Feasibility>(url, {}, { params });
  }


  addFeasibility(
    idProject: string,
    technicalFeasibility: string,
    commercialFeasibility: string,
    mvp: string,
    releaseBoard: string,
    viability: string,
    idUser: string
  ): Observable<Feasibility> {
    const url = `${this.apiUrlFeasibility}/addfeasibility/${idProject}`;
    const params = new HttpParams()
      .set('technicalFeasibility', technicalFeasibility)
      .set('commercialFeasibility', commercialFeasibility)
      .set('mvp', mvp)
      .set('releaseBoard', releaseBoard)
      .set('viability', viability)
      .set('id_user', idUser);

    return this.http.post<Feasibility>(url, params);
  }

  getFeasibilityByProjectId(projectId: string): Observable<Feasibility | null> {
    return this.http.get<Feasibility | null>(`${this.apiUrlFeasibility}/showfeasibility/${projectId}`);
  }

  // Phase 3
  addFoundation(
    idProject: string,
    projectVision: string,
    userNeeds: string,
    projectCharter: string,
    requirements: string,
    idUser: string
  ): Observable<Foundation> {
    const url = `${this.apiUrlFoundation}/addfoundation/${idProject}`;
    const params = new HttpParams()
      .set('projectVision', projectVision)
      .set('userNeeds', userNeeds)
      .set('projectCharter', projectCharter)
      .set('requirements', requirements)
      .set('idUser', idUser); // Make sure this matches the backend parameter name

    return this.http.post<Foundation>(url, params);
  }

  getFoundationByProjectId(projectId: string): Observable<Foundation | null> {
    return this.http.get<Foundation | null>(`${this.apiUrlFoundation}/showfoundation/${projectId}`);
  }
// Phase 3

updateFoundations(projectId: string, foundationId: string, projectVision: string, userNeeds: string, projectCharter: string, requirements: string, id_user: string): Observable<Foundation> {
  const url = `${this.apiUrlFoundation}/updatefoundation/${projectId}/${foundationId}`;
  let params = new HttpParams()
    .set('projectVision', projectVision)
    .set('userNeeds', userNeeds)
    .set('projectCharter', projectCharter)
    .set('requirements', requirements)
    .set('id_user', id_user);

  return this.http.put<Foundation>(url, {}, { params });
}
  // Phase 4
  // Sprint
  getSprintsByProjectId(projectId: string): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrlSprint}/showSprints/${projectId}`);
  }

  addSprint(projectId: string, name: string): Observable<Sprint> {
    const url = `${this.apiUrlSprint}/addSprint/${projectId}`;
    const params = new HttpParams()
      .set('name', name);
    return this.http.post<Sprint>(url, params);
  }

  // Iterations
  addIteration(sprintId: string, feature: string, deliverables: string): Observable<Iteration> {
    const url = `${this.apiUrlIteration}/addIteration/${sprintId}`;
    const params = new HttpParams()
      .set('feature', feature)
      .set('deliverables', deliverables);
    return this.http.post<Iteration>(url, params);
  }

  getIterationsBySprintId(sprintId: string): Observable<Iteration[]> {
    return this.http.get<Iteration[]>(`${this.apiUrlIteration}/ShowIterations/${sprintId}`);
  }

  // Phase 5
  // Deployment Plans
  getDeploymentPlansByProjectId(projectId: string): Observable<DeploymentPlan[]> {
    return this.http.get<DeploymentPlan[]>(`${this.apiUrlDeploymentPlan}/showDeploymentPlans/${projectId}`);
  }

  addDeploymentPlan(projectId: string, environment: string, dataMigration: string, preProdTests: string): Observable<DeploymentPlan> {
    const url = `${this.apiUrlDeploymentPlan}/addDeploymentPlan/${projectId}`;
    const params = new HttpParams()
      .set('environment', environment)
      .set('dataMigration', dataMigration)
      .set('preProdTests', preProdTests);
    return this.http.post<DeploymentPlan>(url, params);
  }

  // Releases
  addRelease(deploymentPlanId: string, name: string, details: string): Observable<Release> {
    const url = `${this.apiUrlRelease}/addRelease/${deploymentPlanId}`;
    const params = new HttpParams()
      .set('name', name)
      .set('details', details);
    return this.http.post<Release>(url, params);
  }

  getReleasesByDeploymentPlanId(deploymentPlanId: string): Observable<Release[]> {
    return this.http.get<Release[]>(`${this.apiUrlRelease}/showReleases/${deploymentPlanId}`);
  }

  // Phase 6
  // KPIs
  getKPIsByProjectId(projectId: string): Observable<KPI[]> {
    return this.http.get<KPI[]>(`${this.apiUrlKPI}/showKPIs/${projectId}`);
  }

  addKPI(projectId: string, name: string, value: string): Observable<KPI> {
    const url = `${this.apiUrlKPI}/addKPI/${projectId}`;
    const params = new HttpParams().set('name', name).set('value', value);
    return this.http.post<KPI>(url, params);
  }

  // Reports
  getReportsByProjectId(projectId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrlReport}/showReports/${projectId}`);
  }

  addReport(projectId: string, title: string, content: string): Observable<Report> {
    const url = `${this.apiUrlReport}/addReport/${projectId}`;
    const params = new HttpParams().set('title', title).set('content', content);
    return this.http.post<Report>(url, params);
  }

  // Feedbacks
  getFeedbacksByProjectId(projectId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrlFeedback}/showFeedbacks/${projectId}`);
  }

  addFeedback(projectId: string, content: string): Observable<Feedback> {
    const url = `${this.apiUrlFeedback}/addFeedback/${projectId}`;
    const params = new HttpParams().set('content', content);
    return this.http.post<Feedback>(url, params);
  }

  // Improvement Plans
  getImprovementPlansByProjectId(projectId: string): Observable<ImprovementPlan[]> {
    return this.http.get<ImprovementPlan[]>(`${this.apiUrlImprovementPlan}/showImprovementPlans/${projectId}`);
  }

  addImprovementPlan(projectId: string, content: string): Observable<ImprovementPlan> {
    const url = `${this.apiUrlImprovementPlan}/addImprovementPlan/${projectId}`;
    const params = new HttpParams().set('content', content);
    return this.http.post<ImprovementPlan>(url, params);
  }
}
