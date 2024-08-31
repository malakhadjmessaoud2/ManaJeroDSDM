import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../../models/dsdm_models/project.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Dsdm } from '../../models/dsdm_models/dsdm.model';
import { Feasibility } from '../../models/dsdm_models/feasibility.model';
import { Foundation } from '../../models/dsdm_models/foundation.model';
import { Sprint } from '../../models/dsdm_models/sprint.model';
import { Iteration } from '../../models/dsdm_models/iteration.model';
import { DeploymentPlan } from '../../models/dsdm_models/deployment-plan.model';
import { Release } from '../../models/dsdm_models/release.model';
import { KPI } from '../../models/dsdm_models/kpi.model';
import { Feedback } from '../../models/dsdm_models/feedback.model';
import { ImprovementPlan } from '../../models/dsdm_models/improvement-plan.model';
import { Report } from '../../models/dsdm_models/report.model';


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
    { id: "6", title: 'cap', status: 'En cours' },
    { id: "7", title: 'réservation', status: 'En cours' },
    { id: "8", title: 'Projet 8', status: 'Terminé' },
    { id: "9", title: 'Projet 9', status: 'Terminé' },
    { id: "10", title: 'Projet 10', status: 'Terminé' },
    { id: "11", title: 'Projet 11', status: 'Terminé' },
    { id: "12", title: 'Projet 12', status: 'Terminé' },




  ];

  getProjets(): Observable<Project[]> {
    return of(this.projects);
  }

  getProjetById(id: string): Observable<Project | undefined> {
    return of(this.projects.find(projet => projet.id === id));
  }

  // API URLs
  private apiUrlDsdm = 'http://localhost:8085/ManajeroBackend/dsdm';
  private apiUrlFeasibility = 'http://localhost:8085/ManajeroBackend/feasibility';
  private apiUrlFoundation = 'http://localhost:8085/ManajeroBackend/foundation';
  private apiUrlSprint = 'http://localhost:8085/ManajeroBackend/sprint';
  private apiUrlIteration = 'http://localhost:8085/ManajeroBackend/iteration';
  private apiUrlDeploymentPlan = 'http://localhost:8085/ManajeroBackend/deploymentPlan';
  private apiUrlRelease = 'http://localhost:8085/ManajeroBackend/release';
  private apiUrlKPI = 'http://localhost:8085/ManajeroBackend/kpi';
  private apiUrlReport = 'http://localhost:8085/ManajeroBackend/report';
  private apiUrlFeedback = 'http://localhost:8085/ManajeroBackend/feedback';
  private apiUrlImprovementPlan = 'http://localhost:8085/ManajeroBackend/improvementPlan';

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
  updateSprint(projectId: string, id: string, name: string): Observable<Sprint> {
    const url = `${this.apiUrlSprint}/updateSprint/${projectId}/${id}`;
    const params = new HttpParams().set('name', name);
    return this.http.put<Sprint>(url, {}, { params });
  }
  archiveSprint(projectId: string, id: string): Observable<Sprint> {
    const url = `${this.apiUrlSprint}/archiveSprint/${projectId}/${id}`;
    return this.http.put<Sprint>(url, {});
  }
  deleteSprint(projectId: string, id: string): Observable<void> {
    const url = `${this.apiUrlSprint}/deleteSprint/${projectId}/${id}`;
    return this.http.delete<void>(url);
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

  updateIteration(sprintId: string, id: string, feature: string, deliverables: string): Observable<Iteration> {
    const url = `${this.apiUrlIteration}/updateIteration/${sprintId}/${id}`;
    let params = new HttpParams()
      .set('feature', feature)
      .set('deliverables', deliverables);
    return this.http.put<Iteration>(url, {}, { params });
  }
  archiveIteration(sprintId: string, id: string): Observable<Iteration> {
    const url = `${this.apiUrlIteration}/archiveIteration/${sprintId}/${id}`;
    return this.http.put<Iteration>(url, {});
}
  deleteIteration(sprintId: string, id: string): Observable<void> {
    const url = `${this.apiUrlIteration}/deleteIteration/${sprintId}/${id}`;
    return this.http.delete<void>(url);
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
   updateDeploymentPlan(projectId: string, id: string, environment: string, dataMigration: string, preProdTests: string): Observable<DeploymentPlan> {
    const url = `${this.apiUrlDeploymentPlan}/updateDeploymentPlan/${projectId}/${id}`;
    const params = new HttpParams()
      .set('environment', environment)
      .set('dataMigration', dataMigration)
      .set('preProdTests', preProdTests);
    return this.http.put<DeploymentPlan>(url, {}, { params });
  }

  archiveDeploymentPlan(projectId: string, id: string): Observable<DeploymentPlan> {
    const url = `${this.apiUrlDeploymentPlan}/archiveDeploymentPlan/${projectId}/${id}`;
    return this.http.put<DeploymentPlan>(url, {});
  }

  deleteDeploymentPlan(projectId: string, id: string): Observable<void> {
    const url = `${this.apiUrlDeploymentPlan}/deleteDeploymentPlan/${projectId}/${id}`;
    return this.http.delete<void>(url);
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
  updateRelease(deploymentPlanId: string, id: string, name: string, details: string): Observable<Release> {
    const url = `${this.apiUrlRelease}/updateRelease/${deploymentPlanId}/${id}`;
    let params = new HttpParams()
      .set('name', name)
      .set('details', details);
    return this.http.put<Release>(url, {}, { params });
  }
  archiveRelease(deploymentPlanId: string, id: string): Observable<Release> {
    const url = `${this.apiUrlRelease}/archiveRelease/${deploymentPlanId}/${id}`;
    return this.http.put<Release>(url, {});
  }
  deleteRelease(deploymentPlanId: string, id: string): Observable<void> {
    const url = `${this.apiUrlRelease}/deleteRelease/${deploymentPlanId}/${id}`;
    return this.http.delete<void>(url);
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
  updateKPI(projectId: string, id: string, name: string, value: string): Observable<KPI> {
    const url = `${this.apiUrlKPI}/updateKPI/${projectId}/${id}`;
    const params = new HttpParams().set('name', name).set('value', value);
    return this.http.put<KPI>(url, {}, { params });
}

archiveKPI(projectId: string, id: string): Observable<KPI> {
    const url = `${this.apiUrlKPI}/archiveKPI/${projectId}/${id}`;
    return this.http.put<KPI>(url, {});
}

deleteKPI(projectId: string, id: string): Observable<void> {
    const url = `${this.apiUrlKPI}/deleteKPI/${projectId}/${id}`;
    return this.http.delete<void>(url);
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
  updateReport(projectId: string, id: string, title: string, content: string): Observable<Report> {
    const url = `${this.apiUrlReport}/updateReport/${projectId}/${id}`;
    const params = new HttpParams().set('title', title).set('content', content);
    return this.http.put<Report>(url, {}, { params });
  }

  archiveReport(projectId: string, id: string): Observable<Report> {
    const url = `${this.apiUrlReport}/archiveReport/${projectId}/${id}`;
    return this.http.put<Report>(url, {});
  }

  deleteReport(projectId: string, id: string): Observable<void> {
    const url = `${this.apiUrlReport}/deleteReport/${projectId}/${id}`;
    return this.http.delete<void>(url);
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
updateFeedback(projectId: string, id: string, content: string): Observable<Feedback> {
  const url = `${this.apiUrlFeedback}/updateFeedback/${projectId}/${id}`;
  const params = new HttpParams().set('content', content);
  return this.http.put<Feedback>(url, {}, { params });
}

archiveFeedback(projectId: string, id: string): Observable<Feedback> {
  const url = `${this.apiUrlFeedback}/archiveFeedback/${projectId}/${id}`;
  return this.http.put<Feedback>(url, {});
}

deleteFeedback(projectId: string, id: string): Observable<void> {
  const url = `${this.apiUrlFeedback}/deleteFeedback/${projectId}/${id}`;
  return this.http.delete<void>(url);
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
   updateImprovementPlan(projectId: string, id: string, content: string): Observable<ImprovementPlan> {
    const url = `${this.apiUrlImprovementPlan}/updateImprovementPlan/${projectId}/${id}`;
    const params = new HttpParams().set('content', content);
    return this.http.put<ImprovementPlan>(url, {}, { params });
  }
  archiveImprovementPlan(projectId: string, id: string): Observable<ImprovementPlan> {
    const url = `${this.apiUrlImprovementPlan}/archiveImprovementPlan/${projectId}/${id}`;
    return this.http.put<ImprovementPlan>(url, {});
  }
  deleteImprovementPlan(projectId: string, id: string): Observable<void> {
    const url = `${this.apiUrlImprovementPlan}/deleteImprovementPlan/${projectId}/${id}`;
    return this.http.delete<void>(url);
  }
}
