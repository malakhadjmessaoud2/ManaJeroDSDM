import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dsdm } from '../model/dsdm.model';
import { PhaseServiceService } from '../service/phase-service.service';
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

@Component({
  selector: 'ngx-dsdm-methode',
  templateUrl: './dsdm-methode.component.html',
  styleUrls: ['./dsdm-methode.component.scss']
})
export class DsdmMethodeComponent implements OnInit {
  // Phase 6
  newKpi: KPI = new KPI();
  newReport: Report = new Report();
  newFeedback: Feedback = new Feedback();
  newImprovementPlan: ImprovementPlan = new ImprovementPlan();

  kpis: KPI[] = [];
  reports: Report[] = [];
  feedbacks: Feedback[] = [];
  improvementPlans: ImprovementPlan[] = [];

  // Phase 5
  deploymentPlans: DeploymentPlan[] = [];
  newDeploymentPlan: { environment: string; dataMigration: string; preProdTests: string } = { environment: '', dataMigration: '', preProdTests: '' };
  newRelease: { name: string; details: string } = { name: '', details: '' };

  // Phase 4
  sprints: Sprint[] = [];
  newSprint: { name: string } = { name: '' };
  newIteration: { feature: string; deliverables: string } = { feature: '', deliverables: '' };

  // Phase 3
  foundations: Foundation | null = null;
  newFoundations: Foundation = {
    id: '',
    projectVision: '',
    userNeeds: '',
    projectCharter: '',
    requirements: '',
    id_user: '',
    project: ''
  };

  // Phase 2
  feasibility: Feasibility | null = null;
  newFeasibility: Feasibility = {
    id: '',
    technicalFeasibility: '',
    commercialFeasibility: '',
    mvp: '',
    releaseBoard: '',
    viability: '',
    id_user: '',
    project: ''
  };

  // Phase 1
  project: string | undefined;
  projectTitle: string | undefined;
  dsdm: Dsdm | null = null;
  newDsdm: Dsdm = {
    id: '',
    context: '',
    priorisation: '',
    status: '',
    startDate: new Date(),
    endDate: new Date(),
    id_user: '',
    project: ''
  };

  constructor(private route: ActivatedRoute, private phaseService: PhaseServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.project = params['projectId'];
      if (this.project) {
        this.phaseService.getProjetById(this.project).subscribe(proj => {
          if (proj) {
            this.projectTitle = proj.title;
            this.loadDsdmForProject(proj.id);
            this.loadFeasibilityForProject(proj.id);
            this.loadFoundationsForProject(proj.id);
            this.loadSprintsForProject(proj.id);
            this.loadDeploymentPlansForProject(proj.id);
            this.loadKPIs(proj.id);
            this.loadReports(proj.id);
            this.loadFeedbacks(proj.id);
            this.loadImprovementPlans(proj.id);
          }
        });
      }
    });
  }

  // Phase 1
  loadDsdmForProject(projectId: string): void {
    this.phaseService.getDsdmByProjectId(projectId).subscribe(dsdm => {
      this.dsdm = dsdm;
    });
  }

  addDsdm(): void {
    if (this.project) {
      this.newDsdm.project = this.project;
      this.newDsdm.id_user = 'userId'; // Remplacez par l'ID utilisateur réel

      this.phaseService.addDsdm(
        this.newDsdm.project,
        this.newDsdm.context,
        this.newDsdm.priorisation,
        this.newDsdm.status,
        this.newDsdm.startDate.toString().split('T')[0], // Convertir LocalDate à string au format yyyy-MM-dd
        this.newDsdm.endDate.toString().split('T')[0], // Convertir LocalDate à string au format yyyy-MM-dd
        this.newDsdm.id_user
      ).subscribe(
        response => {
          console.log('DSDM added successfully', response);
          this.loadDsdmForProject(this.project); // Recharger les données après ajout
        },
        error => {
          console.error('Error adding DSDM', error);
        }
      );
    }
  }

  // Phase 2
  loadFeasibilityForProject(projectId: string): void {
    this.phaseService.getFeasibilityByProjectId(projectId).subscribe(feasibility => {
      this.feasibility = feasibility;
    });
  }

  addFeasibility(): void {
    if (this.project) {
      this.newFeasibility.project = this.project;
      this.newFeasibility.id_user = 'userId'; // Replace with actual user ID

      this.phaseService.addFeasibility(
        this.newFeasibility.project,
        this.newFeasibility.technicalFeasibility,
        this.newFeasibility.commercialFeasibility,
        this.newFeasibility.mvp,
        this.newFeasibility.releaseBoard,
        this.newFeasibility.viability,
        this.newFeasibility.id_user
      ).subscribe(
        response => {
          console.log('Feasibility added successfully', response);
          this.loadFeasibilityForProject(this.project); // Reload data after addition
        },
        error => {
          console.error('Error adding Feasibility', error);
        }
      );
    }
  }

  editFeasibility(): void {
    this.newFeasibility = { ...this.feasibility };
    this.feasibility = null;
  }

  // Phase 3
  loadFoundationsForProject(projectId: string): void {
    this.phaseService.getFoundationByProjectId(projectId).subscribe(foundations => {
      this.foundations = foundations;
    });
  }

  addFoundations(): void {
    if (this.project) {
      this.newFoundations.project = this.project;
      this.newFoundations.id_user = 'userId'; // Replace with actual user ID

      this.phaseService.addFoundation(
        this.newFoundations.project,
        this.newFoundations.projectVision,
        this.newFoundations.userNeeds,
        this.newFoundations.projectCharter,
        this.newFoundations.requirements,
        this.newFoundations.id_user
      ).subscribe(
        response => {
          console.log('Foundation added successfully', response);
          this.loadFoundationsForProject(this.project); // Reload data after addition
        },
        error => {
          console.error('Error adding Foundation', error);
        }
      );
    }
  }

  editFoundations(): void {
    this.newFoundations = { ...this.foundations };
    this.foundations = null;
  }

  // Phase 4
  loadSprintsForProject(projectId: string): void {
    this.phaseService.getSprintsByProjectId(projectId).subscribe(sprints => {
      this.sprints = sprints;
      // Load iterations for each sprint
      this.sprints.forEach(sprint => {
        this.loadIterationsForSprint(sprint.id);
      });
    });
  }

  loadIterationsForSprint(sprintId: string): void {
    this.phaseService.getIterationsBySprintId(sprintId).subscribe(iterations => {
      const sprint = this.sprints.find(s => s.id === sprintId);
      if (sprint) {
        sprint.iterations = iterations;
      }
    });
  }

  addSprint(): void {
    if (this.project && this.newSprint.name) {
      this.phaseService.addSprint(this.project, this.newSprint.name).subscribe(
        sprint => {
          console.log('Sprint added successfully', sprint);
          this.loadSprintsForProject(this.project); // Reload the list after adding
          this.newSprint.name = ''; // Reset form field
        },
        error => {
          console.error('Error adding Sprint', error);
        }
      );
    }
  }

  addIteration(sprint: Sprint): void {
    if (this.newIteration.feature && this.newIteration.deliverables) {
      this.phaseService.addIteration(sprint.id, this.newIteration.feature, this.newIteration.deliverables).subscribe(
        iteration => {
          console.log('Iteration added successfully', iteration);
          this.loadIterationsForSprint(sprint.id); // Reload the list after adding
          this.newIteration.feature = ''; // Reset form field
          this.newIteration.deliverables = ''; // Reset form field
        },
        error => {
          console.error('Error adding Iteration', error);
        }
      );
    }
  }

  editIteration(sprint: Sprint, iteration: Iteration): void {
    // Implement edit logic if needed
  }

  // Phase 5
  loadDeploymentPlansForProject(projectId: string): void {
    this.phaseService.getDeploymentPlansByProjectId(projectId).subscribe(deploymentPlans => {
      this.deploymentPlans = deploymentPlans;
      // Load releases for each deployment plan
      this.deploymentPlans.forEach(plan => {
        this.loadReleasesForDeploymentPlan(plan.id);
      });
    });
  }

  loadReleasesForDeploymentPlan(deploymentPlanId: string): void {
    this.phaseService.getReleasesByDeploymentPlanId(deploymentPlanId).subscribe(releases => {
      const plan = this.deploymentPlans.find(dp => dp.id === deploymentPlanId);
      if (plan) {
        plan.releases = releases;
      }
    });
  }

  addDeploymentPlan(): void {
    if (this.project && this.newDeploymentPlan.environment && this.newDeploymentPlan.dataMigration && this.newDeploymentPlan.preProdTests) {
      this.phaseService.addDeploymentPlan(this.project, this.newDeploymentPlan.environment, this.newDeploymentPlan.dataMigration, this.newDeploymentPlan.preProdTests).subscribe(
        deploymentPlan => {
          console.log('Deployment Plan added successfully', deploymentPlan);
          this.loadDeploymentPlansForProject(this.project); // Reload the list after adding
          this.newDeploymentPlan = { environment: '', dataMigration: '', preProdTests: '' }; // Reset form fields
        },
        error => {
          console.error('Error adding Deployment Plan', error);
        }
      );
    }
  }

  addRelease(deploymentPlan: DeploymentPlan): void {
    if (this.newRelease.name && this.newRelease.details) {
      this.phaseService.addRelease(deploymentPlan.id, this.newRelease.name, this.newRelease.details).subscribe(
        release => {
          console.log('Release added successfully', release);
          this.loadReleasesForDeploymentPlan(deploymentPlan.id); // Reload the list after adding
          this.newRelease = { name: '', details: '' }; // Reset form fields
        },
        error => {
          console.error('Error adding Release', error);
        }
      );
    }
  }

  editRelease(deploymentPlan: DeploymentPlan, release: Release): void {
    // Implement edit logic if needed
  }

  // Phase 6
  loadKPIs(projectId: string): void {
    this.phaseService.getKPIsByProjectId(projectId).subscribe((data: KPI[]) => {
      this.kpis = data;
    });
  }

  loadReports(projectId: string): void {
    this.phaseService.getReportsByProjectId(projectId).subscribe((data: Report[]) => {
      this.reports = data;
    });
  }

  loadFeedbacks(projectId: string): void {
    this.phaseService.getFeedbacksByProjectId(projectId).subscribe((data: Feedback[]) => {
      this.feedbacks = data;
    });
  }

  loadImprovementPlans(projectId: string): void {
    this.phaseService.getImprovementPlansByProjectId(projectId).subscribe((data: ImprovementPlan[]) => {
      this.improvementPlans = data;
    });
  }

  addKpi(): void {
    this.phaseService.addKPI(this.project, this.newKpi.name, this.newKpi.value).subscribe((data: KPI) => {
      this.kpis.push(data);
      this.newKpi = new KPI();
    });
  }

  addReport(): void {
    this.phaseService.addReport(this.project, this.newReport.title, this.newReport.content).subscribe((data: Report) => {
      this.reports.push(data);
      this.newReport = new Report();
    });
  }

  addFeedback(): void {
    this.phaseService.addFeedback(this.project, this.newFeedback.content).subscribe((data: Feedback) => {
      this.feedbacks.push(data);
      this.newFeedback = new Feedback();
    });
  }

  addImprovementPlan(): void {
    this.phaseService.addImprovementPlan(this.project, this.newImprovementPlan.content).subscribe((data: ImprovementPlan) => {
      this.improvementPlans.push(data);
      this.newImprovementPlan = new ImprovementPlan();
    });
  }
}
