import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Dsdm } from "../model/dsdm.model";
import { PhaseServiceService } from "../service/phase-service.service";
import { Feasibility } from "../model/feasibility.model";
import { Foundation } from "../model/foundation.model";
import { Sprint } from "../model/sprint.model";
import { Iteration } from "../model/iteration.model";
import { DeploymentPlan } from "../model/deployment-plan.model";
import { Release } from "../model/release.model";
import { KPI } from "../model/kpi.model";
import { Feedback } from "../model/feedback.model";
import { ImprovementPlan } from "../model/improvement-plan.model";
import { Report } from "../model/report.model";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DsdmDashComponent } from "../dsdm-dash/dsdm-dash.component";

@Component({
  selector: "ngx-dsdm-methode",
  templateUrl: "./dsdm-methode.component.html",
  styleUrls: ["./dsdm-methode.component.scss"],
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
  newDeploymentPlan: {
    environment: string;
    dataMigration: string;
    preProdTests: string;
  } = { environment: "", dataMigration: "", preProdTests: "" };
  newRelease: { name: string; details: string } = { name: "", details: "" };
  showDeploymentPlanForm = false;

  // Phase 3
  foundations: Foundation | null = null;
  newFoundations: Foundation = {
    id: "",
    projectVision: "",
    userNeeds: "",
    projectCharter: "",
    requirements: "",
    id_user: "",
    project: "",
  };
  public isEditModeFoundations: boolean = false;

  // Phase 2
  feasibility: Feasibility | null = null;
  newFeasibility: Feasibility = {
    id: "",
    technicalFeasibility: "",
    commercialFeasibility: "",
    mvp: "",
    releaseBoard: "",
    viability: "",
    id_user: "",
    project: "",
  };

  // Phase 1

  project: string | undefined;
  projectTitle: string | undefined;
  dsdm: Dsdm | null = null;
  newDsdm: Dsdm = {
    id: "",
    context: "",
    priorisation: "",
    status: "",
    startDate: new Date(),
    endDate: new Date(),
    id_user: "",
    project: "",
  };

  isEditMode: boolean = false;
  public editor = ClassicEditor;

  public editorConfig: any = {

    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "link",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "blockQuote",
        "|",
        "imageUpload",
        "insertTable",
        "mediaEmbed",
        "|",
        "fontSize",
        "fontFamily",
        "highlight",
        "|",
        "codeBlock",
        "horizontalLine",
      ],
    },
    language: "en",
    readOnly: false,
  };
  public displayEditorConfig = {
    ...this.editorConfig,
    readOnly: true, // always read-only for display
  };

  onReady(editor: any) {
    console.log("Editor is ready to use!", editor);
  }

  onChange(event: any) {
    console.log("Editor content changed:", event);
  }

  onBlur(event: any) {
    console.log("Editor lost focus:", event);
  }

  onFocus(event: any) {
    console.log("Editor is focused:", event);
  }

  constructor(
    private route: ActivatedRoute,
    private phaseService: PhaseServiceService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.project = params["projectId"];
      if (this.project) {
        this.phaseService.getProjetById(this.project).subscribe((proj) => {
          if (proj) {
            this.projectTitle = proj.title;
            this.loadDsdmForProject(proj.id);
            this.loadFeasibilityForProject(proj.id);
            this.loadFoundationsForProject(proj.id);
            this.loadSprintsForProject(proj.id);
            this.loadDeploymentPlansForProject(proj.id);
            this.loadKPIs(proj.id);
            this.loadArchivedKPIs(proj.id);

            this.loadReports(proj.id);
            this.loadFeedbacks(proj.id);
            this.loadArchivedFeedbacks(proj.id);

            this.loadImprovementPlans(proj.id);
            this.loadArchivedImprovementPlans(proj.id);


          }
        });
      }
    });
    this.updateEditorConfig();
  }
  updateEditorConfig(): void {
    this.editorConfig.readOnly = !this.isEditMode;
  }

  // Phase 1
  @ViewChild(DsdmDashComponent) dsdmDashComponent: DsdmDashComponent;

  preProjetCompletion: { completed: number, remaining: number } ;
  calculatePreProjetCompletion(): void {
    console.log('Début du calcul pour PRE-PROJET');

    if (this.dsdm) {
        console.log('Les données DSDM sont disponibles:', this.dsdm);

        const fields = ['context', 'priorisation', 'status', 'startDate', 'endDate'];
        console.log('Champs à vérifier:', fields);

        const filledFields = fields.filter(field => {
            const fieldValue = this.dsdm![field];
            console.log(`Vérification du champ "${field}":`, fieldValue);
            return fieldValue && fieldValue !== '';
        }).length;

        console.log('Nombre de champs remplis:', filledFields);

        if (filledFields === fields.length) {
            this.preProjetCompletion = { completed: 100, remaining: 0 };
        } else {
            const completionPercentage = (filledFields / fields.length) * 100;
            this.preProjetCompletion = { completed: completionPercentage, remaining: 100 - completionPercentage };
        }

        console.log('Avancement du PRE-PROJET :', this.preProjetCompletion);

        // Mettez à jour les options du graphique ici
        this.dsdmDashComponent.initPhaseChartOptions();
    } else {
        console.log('Les données DSDM ne sont pas disponibles.');
        this.preProjetCompletion = { completed: 0, remaining: 100 };
        this.dsdmDashComponent.initPhaseChartOptions();


    }
}

  loadDsdmForProject(projectId: string): void {
    this.phaseService.getDsdmByProjectId(projectId).subscribe((dsdm) => {
      this.dsdm = dsdm;
      this.calculatePreProjetCompletion();

    });
  }

  addDsdm(): void {
    if (this.project) {
      this.newDsdm.project = this.project;
      this.newDsdm.id_user = "userId"; // Remplacez par l'ID utilisateur réel

      this.phaseService
        .addDsdm(
          this.newDsdm.project,
          this.newDsdm.context,
          this.newDsdm.priorisation,
          this.newDsdm.status,
          this.newDsdm.startDate.toString().split("T")[0], // Convertir LocalDate à string au format yyyy-MM-dd
          this.newDsdm.endDate.toString().split("T")[0], // Convertir LocalDate à string au format yyyy-MM-dd
          this.newDsdm.id_user
        )
        .subscribe(
          (response) => {
            console.log("DSDM added successfully", response);
            this.loadDsdmForProject(this.project); // Recharger les données après ajout
          },
          (error) => {
            console.error("Error adding DSDM", error);
          }
        );
    }
  }
  editDsdm(): void {
    if (this.newDsdm && this.project) {
      console.log(
        "context",
        this.newDsdm.context,
        "edite mode",
        this.isEditMode
      );
      this.phaseService
        .updateDsdm(
          this.project,
          this.newDsdm.id,
          this.newDsdm.context,
          this.newDsdm.priorisation,
          this.newDsdm.status,
          this.newDsdm.startDate.toString().split("T")[0],
          this.newDsdm.endDate.toString().split("T")[0],
          this.newDsdm.id_user
        )
        .subscribe(
          (response) => {
            console.log("DSDM updated successfully", response);
            this.loadDsdmForProject(this.project); // Reload the data after updating
          this.isEditMode = false;

          },
          (error) => {
            console.error("Error updating DSDM", error);
          }
        );
    }
  }

  enableEditMode(): void {
    if (this.dsdm) {
      this.newDsdm = { ...this.dsdm }; // Copy current dsdm values to newDsdm for editing
    }
    this.isEditMode = true;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    if (this.project) {
      this.loadDsdmForProject(this.project); // Reload original data
    }
  }

  // Phase 2
  feasibilityCompletion: { completed: number; remaining: number };

  loadFeasibilityForProject(projectId: string): void {
    this.phaseService
      .getFeasibilityByProjectId(projectId)
      .subscribe((feasibility) => {
        this.feasibility = feasibility;
        this.calculateFeasibilityCompletion(); // Appelle le calcul après le chargement de la faisabilité

      });
  }
  calculateFeasibilityCompletion(): void {
    console.log('Début du calcul pour FAISABILITÉ');

    if (this.feasibility) {
      console.log('Les données de faisabilité sont disponibles:', this.feasibility);

      const fields = [
        'technicalFeasibility',
        'commercialFeasibility',
        'mvp',
        'releaseBoard',
        'viability'
      ];
      console.log('Champs à vérifier:', fields);

      const filledFields = fields.filter(field => {
        const fieldValue = this.feasibility![field];
        console.log(`Vérification du champ "${field}":`, fieldValue);
        return fieldValue && fieldValue !== '';
      }).length;

      console.log('Nombre de champs remplis:', filledFields);

      if (filledFields === fields.length) {
        this.feasibilityCompletion = { completed: 100, remaining: 0 };
      } else {
        const completionPercentage = (filledFields / fields.length) * 100;
        this.feasibilityCompletion = {
          completed: completionPercentage,
          remaining: 100 - completionPercentage
        };
      }

      console.log('Avancement de la FAISABILITÉ :', this.feasibilityCompletion);

      // Mettre à jour les options du graphique ici
      this.dsdmDashComponent.initPhaseChartOptions();
    } else {
      console.log('Les données de faisabilité ne sont pas disponibles.');
      this.feasibilityCompletion = { completed: 0, remaining: 100 };
      this.dsdmDashComponent.initPhaseChartOptions();
    }
  }


  addFeasibility(): void {
    if (this.project) {
      this.newFeasibility.project = this.project;
      this.newFeasibility.id_user = "userId"; // Replace with actual user ID

      this.phaseService
        .addFeasibility(
          this.newFeasibility.project,
          this.newFeasibility.technicalFeasibility,
          this.newFeasibility.commercialFeasibility,
          this.newFeasibility.mvp,
          this.newFeasibility.releaseBoard,
          this.newFeasibility.viability,
          this.newFeasibility.id_user
        )
        .subscribe(
          (response) => {
            console.log("Feasibility added successfully", response);
            this.loadFeasibilityForProject(this.project); // Reload data after addition
          },
          (error) => {
            console.error("Error adding Feasibility", error);
          }
        );
    }
  }

  isEditModeFeasibility: boolean = false;

  enableEditModeFeasibility(): void {
    if (this.feasibility) {
      this.newFeasibility = { ...this.feasibility };
    }
    this.isEditModeFeasibility = true;
  }

  cancelEditFeasibility(): void {
    this.isEditModeFeasibility = false;
    if (this.project) {
      this.loadFeasibilityForProject(this.project); // Recharger les données originales
    }
  }
  editFeasibility(): void {
    if (this.feasibility) {
      this.newFeasibility = {
        id: this.feasibility.id,
        technicalFeasibility: this.feasibility.technicalFeasibility,
        commercialFeasibility: this.feasibility.commercialFeasibility,
        mvp: this.feasibility.mvp,
        releaseBoard: this.feasibility.releaseBoard,
        viability: this.feasibility.viability,
        id_user: this.feasibility.id_user,
        project: this.feasibility.project,
      };
      this.isEditModeFeasibility = true;
    } else {
      console.error("Feasibility data not available for editing");
    }
  }
  saveFeasibility(): void {
    if (this.newFeasibility && this.project) {
      this.phaseService
        .updateFeasibility(
          this.project,
          this.newFeasibility.id,
          this.newFeasibility.technicalFeasibility,
          this.newFeasibility.commercialFeasibility,
          this.newFeasibility.mvp,
          this.newFeasibility.releaseBoard,
          this.newFeasibility.viability,
          this.newFeasibility.id_user
        )
        .subscribe(
          (response) => {
            console.log("Feasibility updated successfully", response);
            this.loadFeasibilityForProject(this.project); // Reload the data after updating
            this.isEditModeFeasibility = false;
          },
          (error) => {
            console.error("Error updating feasibility", error);
          }
        );
    }
  }

  // Phase 3

  foundationCompletion: { completed: number; remaining: number };

  loadFoundationsForProject(projectId: string): void {
    this.phaseService.getFoundationByProjectId(projectId).subscribe(
      (foundations) => {
        this.foundations = foundations;
        this.calculateFoundationCompletion();
      },
      (error) => {
        console.error('Error fetching foundations:', error);
        // Handle the error scenario
        this.foundationCompletion = { completed: 0, remaining: 100 };
        this.dsdmDashComponent.initPhaseChartOptions();
      }
    );
  }
  calculateFoundationCompletion(): void {
    console.log('Début du calcul pour FONDATIONS');

    if (this.foundations) {
        console.log('Les données de fondations sont disponibles:', this.foundations);

        const fields = [
          'projectVision',
           'userNeeds',
            'projectCharter',
             'requirements'
            ];
        console.log('Champs à vérifier:', fields);

        const filledFields = fields.filter(field => {
            const fieldValue = this.foundations![field];
            console.log(`Vérification du champ "${field}":`, fieldValue);
            return fieldValue && fieldValue !== '';
        }).length;

        console.log('Nombre de champs remplis:', filledFields);

        if (filledFields === fields.length) {
            this.foundationCompletion = { completed: 100, remaining: 0 };
        } else {
            const completionPercentage = (filledFields / fields.length) * 100;
            this.foundationCompletion = {
               completed: completionPercentage,
               remaining: 100 - completionPercentage };
        }

        console.log('Avancement des FONDATIONS :', this.foundationCompletion);

        // Mettez à jour les options du graphique ici
        this.dsdmDashComponent.initPhaseChartOptions();
    } else {
        console.log('Les données de fondations ne sont pas disponibles.');
        this.foundationCompletion = { completed: 0, remaining: 100 };
        this.dsdmDashComponent.initPhaseChartOptions();
    }
}
  addFoundations(): void {
    if (this.project) {
      this.newFoundations.project = this.project;
      this.newFoundations.id_user = "userId"; // Replace with actual user ID

      this.phaseService
        .addFoundation(
          this.newFoundations.project,
          this.newFoundations.projectVision,
          this.newFoundations.userNeeds,
          this.newFoundations.projectCharter,
          this.newFoundations.requirements,
          this.newFoundations.id_user
        )
        .subscribe(
          (response) => {
            console.log("Foundation added successfully", response);
            this.loadFoundationsForProject(this.project); // Reload data after addition
          },
          (error) => {
            console.error("Error adding Foundation", error);
          }
        );
    }
  }
  editFoundations(): void {
    if (this.foundations) {
      this.newFoundations = {
        id: this.foundations.id,
        projectVision: this.foundations.projectVision,
        userNeeds: this.foundations.userNeeds,
        projectCharter: this.foundations.projectCharter,
        requirements: this.foundations.requirements,
        id_user: this.foundations.id_user,
        project: this.foundations.project,
      };
      this.isEditModeFoundations = true;
    } else {
      console.error("Foundations data not available for editing");
    }
  }
  saveFoundations(): void {
    if (this.newFoundations && this.project) {
      this.phaseService
        .updateFoundations(
          this.project,
          this.newFoundations.id,
          this.newFoundations.projectVision,
          this.newFoundations.userNeeds,
          this.newFoundations.projectCharter,
          this.newFoundations.requirements,
          this.newFoundations.id_user
        )
        .subscribe(
          (response) => {
            console.log("Foundations updated successfully", response);
            this.loadFoundationsForProject(this.project); // Reload the data after updating
            this.isEditModeFoundations = false;
          },
          (error) => {
            console.error("Error updating foundations", error);
          }
        );
    }
  }
  cancelEditFoundations(): void {
    this.isEditModeFoundations = false;
    if (this.project) {
      this.loadFoundationsForProject(this.project); // Recharger les données originales
    }
  }

  // Phase 4
  sprints: Sprint[] = [];
  newSprint: Sprint = { id: "", name: "", projectId: "", iterations: [] };
  newIteration: { feature: string; deliverables: string } = {
    feature: "",
    deliverables: "",
  };
  public showSprintForm: boolean = false;
  // To separate archived and non-archived sprints
  archivedSprints: Sprint[] = [];
  nonArchivedSprints: Sprint[] = [];
  loadIterationsForSprint(sprintId: string): void {
    this.phaseService
      .getIterationsBySprintId(sprintId)
      .subscribe((iterations) => {
        const sprint = this.sprints.find((s) => s.id === sprintId);
        if (sprint) {
          sprint.iterations = iterations;
          this.updateIterationChart();

        }
      });
  }
  updateIterationChart(): void {
    const sprintNames = this.sprints.map((sprint, index) => `Sprint ${index + 1}`);
    const iterationCounts = this.sprints.map((sprint) => sprint.iterations.length);

    // Call the DsdmDashComponent to update the chart
    this.dsdmDashComponent.updateIterationChart(sprintNames, iterationCounts);
  }
  // Load sprints and categorize them
  loadSprintsForProject(projectId: string): void {
    this.phaseService.getSprintsByProjectId(projectId).subscribe((sprints) => {
      this.sprints = sprints;
      this.archivedSprints = sprints.filter((sprint) => sprint.archived);
      this.nonArchivedSprints = sprints.filter((sprint) => !sprint.archived);

      // Load iterations for each sprint
      let iterationsLoaded = 0;
      this.sprints.forEach((sprint) => {
        this.phaseService.getIterationsBySprintId(sprint.id).subscribe((iterations) => {
          sprint.iterations = iterations;
          iterationsLoaded++;
          // Once all iterations are loaded, update the chart
          if (iterationsLoaded === this.sprints.length) {
            this.updateIterationChart();
          }
        });

      });

      this.calculateSprintCompletion();
      this.updateSprintChart();
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  updateSprintChart(): void {
    console.log("Updating sprint chart with sprints:", this.sprints);

    const sprintData = this.sprints.map((sprint, index) => ({
      value: 1,
      name: `Sprint ${index + 1}`,
      itemStyle: { color: this.getRandomColor() },
    }));

    console.log("Sprint data for chart:", sprintData);

    // Mise à jour du graphique via DsdmDashComponent
    this.dsdmDashComponent.updateSprintChart(sprintData);
  }

  sprintCompletion: { completed: number; remaining: number };
  calculateSprintCompletion(): void {
    if (this.sprints && this.sprints.length > 0) {
      const filledSprints = this.sprints.filter(sprint => sprint.name && sprint.name !== '').length;
      const completionPercentage = (filledSprints / this.sprints.length) * 100;
      this.sprintCompletion = { completed: completionPercentage, remaining: 100 - completionPercentage };
      this.dsdmDashComponent.initSprintChartOptions();
    } else {
      this.sprintCompletion = { completed: 0, remaining: 100 };
      this.dsdmDashComponent.initSprintChartOptions();
    }
  }

  // Method to update a sprint
  newSprintName = ""; // Nouveau nom de sprint
  isEditModeSprint: boolean = false; // État pour savoir si on est en mode édition
  editingSprint = null; // Référence au sprint en cours de modification
  editingSprintName: string = "";
  toggleSprintEdit(sprint: Sprint) {
    if (this.isEditModeSprint && this.editingSprint.id === sprint.id) {
      this.isEditModeSprint = false;
      this.editingSprint = {};
      this.editingSprintName = ""; // Clear the name when exiting edit mode
    } else {
      this.isEditModeSprint = true;
      this.editingSprint = sprint;
      this.editingSprintName = sprint.name; // Set the current name for editing
    }
  }
  // Méthode pour activer le mode édition pour un sprint spécifique
  editSprint(sprint: Sprint): void {
    if (sprint) {
      this.newSprint = {
        id: sprint.id,
        name: sprint.name,
        projectId: sprint.projectId,
        iterations: sprint.iterations,
      };
      this.isEditModeSprint = true;
    } else {
      console.error("Sprint data not available for editing");
    }
  }
  // Méthode pour sauvegarder les modifications d'un sprint
  saveSprint() {
    if (this.isEditModeSprint && this.editingSprint) {
      // Call the service method to update the sprint
      this.phaseService
        .updateSprint(
          this.editingSprint.projectId,
          this.editingSprint.id,
          this.editingSprintName
        )
        .subscribe(
          (updatedSprint) => {
            // Find the index of the sprint being edited
            const index = this.sprints.findIndex(
              (sprint) => sprint.id === this.editingSprint.id
            );

            if (index !== -1) {
              // Update the name of the sprint in the list
              this.sprints[index].name = updatedSprint.name;
            }

            // Reset the editing state
            this.isEditModeSprint = false;
            this.editingSprint = null;
            this.editingSprintName = ""; // Clear the name after saving
          },
          (error) => {
            console.error("Error updating sprint:", error);
            // Handle error (e.g., show a notification to the user)
          }
        );
    }
  }
  // Method to archive a sprint
  archiveSprint(sprint: Sprint): void {
    this.phaseService.archiveSprint(sprint.projectId, sprint.id).subscribe(
      (archivedSprint) => {
        sprint.archived = true; // Update state locally
        console.log("Sprint archived successfully", archivedSprint);
        this.loadSprintsForProject(sprint.projectId); // Reload the sprints after archive
      },
      (error) => {
        console.error("Error archiving Sprint", error);
      }
    );
  }

  deleteSprint(sprint: Sprint): void {
    if (
      confirm(`Are you sure you want to delete the sprint: ${sprint.name}?`)
    ) {
      this.phaseService.deleteSprint(sprint.projectId, sprint.id).subscribe(
        () => {
          console.log("Sprint deleted successfully");
          this.loadSprintsForProject(sprint.projectId); // Reload the sprints after deletion
        },
        (error) => {
          console.error("Error deleting Sprint", error);
        }
      );
    }
  }
  toggleSprintForm(): void {
    this.showSprintForm = !this.showSprintForm;
  }
  toggleIterationForm(sprint: Sprint): void {
    sprint.showIterationForm = !sprint.showIterationForm;
  }

  addSprint(): void {
    if (this.project && this.newSprint.name) {
      this.phaseService.addSprint(this.project, this.newSprint.name).subscribe(
        (sprint) => {
          console.log("Sprint added successfully", sprint);
          this.loadSprintsForProject(this.project); // Reload the list after adding
          this.newSprint.name = ""; // Reset form field
        },
        (error) => {
          console.error("Error adding Sprint", error);
        }
      );
    }
  }
  addIteration(sprint: Sprint): void {
    if (this.newIteration.feature && this.newIteration.deliverables) {
      this.phaseService
        .addIteration(
          sprint.id,
          this.newIteration.feature,
          this.newIteration.deliverables
        )
        .subscribe(
          (iteration) => {
            console.log("Iteration added successfully", iteration);
            this.loadIterationsForSprint(sprint.id); // Reload the list after adding
            this.newIteration.feature = ""; // Reset form field
            this.newIteration.deliverables = ""; // Reset form field
          },
          (error) => {
            console.error("Error adding Iteration", error);
          }
        );
    }
  }
  editingIteration: Iteration | null = null;
  // Méthode pour démarrer l'édition d'une itération
  editIteration(sprint: Sprint, iteration: Iteration): void {
    this.editingIteration = { ...iteration }; // Crée une copie de l'itération pour l'édition
    this.toggleIterationForm(sprint); // Affiche le formulaire d'édition
  }
  // Méthode pour annuler l'édition
  cancelEditIteration(): void {
    this.editingIteration = null; // Réinitialise l'itération en cours d'édition
  }
  // Méthode pour mettre à jour une itération
  updateIteration(sprint: Sprint): void {
    if (
      this.editingIteration &&
      this.editingIteration.feature &&
      this.editingIteration.deliverables
    ) {
      this.phaseService
        .updateIteration(
          sprint.id,
          this.editingIteration.id,
          this.editingIteration.feature,
          this.editingIteration.deliverables
        )
        .subscribe(
          (updatedIteration) => {
            console.log("Iteration updated successfully", updatedIteration);
            this.loadIterationsForSprint(sprint.id); // Recharger la liste après la mise à jour
            this.editingIteration = null; // Réinitialiser l'itération en cours d'édition
          },
          (error) => {
            console.error("Error updating Iteration", error);
          }
        );
    }
  }
  deleteIteration(sprint: Sprint, iteration: Iteration): void {
    if (
      confirm(
        `Are you sure you want to delete the iteration: ${iteration.feature}?`
      )
    ) {
      this.phaseService.deleteIteration(sprint.id, iteration.id).subscribe(
        () => {
          console.log("Iteration deleted successfully");
          // Mise à jour de l'interface utilisateur après suppression
          this.loadIterationsForSprint(sprint.id);
        },
        (error) => {
          console.error("Error deleting Iteration", error);
        }
      );
    }
  }
  archiveIteration(sprint: Sprint, iteration: Iteration): void {
    this.phaseService.archiveIteration(sprint.id, iteration.id).subscribe(
      (archivedIteration) => {
        iteration.archived = true; // Mettez à jour l'état localement
        console.log("Iteration archived successfully", archivedIteration);
      },
      (error) => {
        console.error("Error archiving Iteration", error);
      }
    );
  }
  // Phase 5

  editingDeploymentPlan: any = null;
  isEditModeDeploymentPlan = false;
  toggleDeploymentPlanForm() {
    this.showDeploymentPlanForm = !this.showDeploymentPlanForm;
    this.isEditModeDeploymentPlan = false;
    this.newDeploymentPlan = {
      environment: '',
      dataMigration: '',
      preProdTests: ''};
  }
  toggleReleaseForm(plan) {
    plan.showReleaseForm = !plan.showReleaseForm;
    this.isEditModeRelease = false;
    this.newRelease = {
      name: '',
      details: ''
    };
  }
  loadDeploymentPlansForProject(projectId: string): void {
    this.phaseService
      .getDeploymentPlansByProjectId(projectId)
      .subscribe((deploymentPlans) => {
        this.deploymentPlans = deploymentPlans;
        // Load releases for each deployment plan
        this.deploymentPlans.forEach((plan) => {
          this.loadReleasesForDeploymentPlan(plan.id);
        });
        this.calculateDeploymentPlanCompletion();

      });
  }
  deploymentPlanCompletion: { completed: number; remaining: number };

calculateDeploymentPlanCompletion(): void {
  console.log('Début du calcul pour DEPLOIEMENT');

  if (this.deploymentPlans && this.deploymentPlans.length > 0) {
    console.log('Les données de déploiement sont disponibles:', this.deploymentPlans);

    const fields = ['environment', 'dataMigration', 'preProdTests'];
    console.log('Champs à vérifier:', fields);

    let totalFilledFields = 0;
    let totalFields = fields.length * this.deploymentPlans.length;

    this.deploymentPlans.forEach((plan) => {
      const filledFields = fields.filter(field => {
        const fieldValue = plan[field];
        console.log(`Vérification du champ "${field}" pour le plan ${plan.id}:`, fieldValue);
        return fieldValue && fieldValue !== '';
      }).length;

      totalFilledFields += filledFields;
    });

    console.log('Nombre total de champs remplis:', totalFilledFields);

    if (totalFilledFields === totalFields) {
      this.deploymentPlanCompletion = { completed: 100, remaining: 0 };
    } else {
      const completionPercentage = (totalFilledFields / totalFields) * 100;
      this.deploymentPlanCompletion = {
        completed: completionPercentage,
        remaining: 100 - completionPercentage
      };
    }

    console.log('Avancement du DEPLOIEMENT :', this.deploymentPlanCompletion);

    // Mettre à jour les options du graphique ici
    this.dsdmDashComponent.initPhaseChartOptions();
  } else {
    console.log('Les données de déploiement ne sont pas disponibles.');
    this.deploymentPlanCompletion = { completed: 0, remaining: 100 };
    this.dsdmDashComponent.initPhaseChartOptions();
  }
}


  loadReleasesForDeploymentPlan(deploymentPlanId: string): void {
    this.phaseService
      .getReleasesByDeploymentPlanId(deploymentPlanId)
      .subscribe((releases) => {
        const plan = this.deploymentPlans.find(
          (dp) => dp.id === deploymentPlanId
        );
        if (plan) {
          plan.releases = releases;
        }
      });
  }

  addDeploymentPlan(): void {
    if (
      this.project &&
      this.newDeploymentPlan.environment &&
      this.newDeploymentPlan.dataMigration &&
      this.newDeploymentPlan.preProdTests
    ) {
      this.phaseService
        .addDeploymentPlan(
          this.project,
          this.newDeploymentPlan.environment,
          this.newDeploymentPlan.dataMigration,
          this.newDeploymentPlan.preProdTests
        )
        .subscribe(
          (deploymentPlan) => {
            console.log("Deployment Plan added successfully", deploymentPlan);
            this.loadDeploymentPlansForProject(this.project); // Reload the list after adding
            this.newDeploymentPlan = {
              environment: "",
              dataMigration: "",
              preProdTests: "",
            }; // Reset form fields
          },
          (error) => {
            console.error("Error adding Deployment Plan", error);
          }
        );
    }
  }

  addRelease(deploymentPlan: DeploymentPlan): void {
    if (this.newRelease.name && this.newRelease.details) {
      this.phaseService
        .addRelease(
          deploymentPlan.id,
          this.newRelease.name,
          this.newRelease.details
        )
        .subscribe(
          (release) => {
            console.log("Release added successfully", release);
            this.loadReleasesForDeploymentPlan(deploymentPlan.id); // Reload the list after adding
            this.newRelease = { name: "", details: "" }; // Reset form fields
          },
          (error) => {
            console.error("Error adding Release", error);
          }
        );
    }
  }

  // Toggle edit mode for deployment plan
  toggleDeploymentPlanEdit(plan: any) {
    this.isEditModeDeploymentPlan = !this.isEditModeDeploymentPlan;
    if (this.isEditModeDeploymentPlan) {
      this.editingDeploymentPlan = { ...plan };
    } else {
      this.editingDeploymentPlan = null;
    }
  }

  // Save the edited deployment plan
  saveDeploymentPlan() {
    if (this.isEditModeDeploymentPlan && this.editingDeploymentPlan) {
      // Call the service method to update the deployment plan
      this.phaseService
        .updateDeploymentPlan(
          this.editingDeploymentPlan.projectId,
          this.editingDeploymentPlan.id,
          this.editingDeploymentPlan.environment,
          this.editingDeploymentPlan.dataMigration,
          this.editingDeploymentPlan.preProdTests
        )
        .subscribe(
          (updatedDeploymentPlan) => {
            // Find the index of the deployment plan being edited
            const index = this.deploymentPlans.findIndex(
              (plan) => plan.id === this.editingDeploymentPlan.id
            );

            if (index !== -1) {
              // Update the deployment plan in the list
              this.deploymentPlans[index] = updatedDeploymentPlan;
            }

            // Reset the editing state
            this.isEditModeDeploymentPlan = false;
            this.editingDeploymentPlan = null;
          },
          (error) => {
            console.error("Error updating deployment plan:", error);
            // Handle error (e.g., show a notification to the user)
          }
        );
    }
  }


// Method to archive a deployment plan
archiveDeploymentPlan(deploymentPlan: DeploymentPlan): void {
  this.phaseService.archiveDeploymentPlan(deploymentPlan.projectId, deploymentPlan.id).subscribe(
    (archivedDeploymentPlan) => {
      deploymentPlan.archived = true; // Update state locally
      console.log("Deployment Plan archived successfully", archivedDeploymentPlan);
      this.loadDeploymentPlansForProject(deploymentPlan.projectId); // Reload the deployment plans after archive
    },
    (error) => {
      console.error("Error archiving Deployment Plan", error);
    }
  );
}


  // Delete a deployment plan
  deleteDeploymentPlan(deploymentPlan: DeploymentPlan): void {
    if (
      confirm(`Are you sure you want to delete the deployment plan: ${deploymentPlan.environment}?`)
    ) {
      this.phaseService.deleteDeploymentPlan(deploymentPlan.projectId, deploymentPlan.id).subscribe(
        () => {
          console.log("Deployment Plan deleted successfully");
          this.loadDeploymentPlansForProject(deploymentPlan.projectId); // Reload the deployment plans after deletion
        },
        (error) => {
          console.error("Error deleting Deployment Plan", error);
        }
      );
    }
  }

  editingRelease: Release | null = null;
  isEditModeRelease = false;
// Méthode pour mettre à jour une release
updateRelease(plan: DeploymentPlan): void {
  if (
    this.editingRelease &&
    this.editingRelease.name && // Vérifie que le nom est défini
    this.editingRelease.details // Vérifie que les détails sont définis
  ) {
    this.phaseService
      .updateRelease(
        plan.id, // ID du plan de déploiement
        this.editingRelease.id, // ID de la release
        this.editingRelease.name, // Nom de la release
        this.editingRelease.details // Détails de la release
      )
      .subscribe(
        (updatedRelease) => {
          console.log("Release updated successfully", updatedRelease);
          this.loadReleasesForDeploymentPlan(plan.id); // Recharge la liste après la mise à jour
          this.cancelEditRelease(); // Réinitialise la release en cours d'édition et cache le formulaire
        },
        (error) => {
          console.error("Error updating Release", error);
        }
      );
  }
}


  // Afficher le formulaire d'édition
  editRelease(plan: DeploymentPlan, release: Release): void {
    console.log('Editing release:', release);
    this.editingRelease = { ...release }; // Crée une copie de la release pour l'édition
    this.isEditModeRelease = true; // Active le mode édition
   // toggleReleaseForm(plan);
  }



// Méthode pour annuler l'édition d'une release
cancelEditRelease(): void {
  this.editingRelease = null; // Réinitialise la release en cours d'édition
// Cache le formulaire d'édition
}

// Archive a release
archiveRelease(plan: DeploymentPlan, release: Release): void {
  this.phaseService.archiveRelease(plan.id, release.id).subscribe(
    (archivedRelease) => {
      release.archived = true; // Mettez à jour l'état localement pour refléter l'archivage
      console.log("Release archived successfully", archivedRelease);
      this.loadReleasesForDeploymentPlan(plan.id); // Recharger la liste des releases après l'archivage
    },
    (error) => {
      console.error("Error archiving Release", error);
    }
  );
}


deleteRelease(plan: DeploymentPlan, release: Release): void {
  if (
    confirm(`Are you sure you want to delete the release: ${release.name}?`)
  ) {
    this.phaseService.deleteRelease(plan.id, release.id).subscribe(
      () => {
        console.log("Release deleted successfully");
        // Mise à jour de l'interface utilisateur après suppression
        this.loadReleasesForDeploymentPlan(plan.id); // Recharge la liste des releases pour le plan de déploiement
      },
      (error) => {
        console.error("Error deleting Release", error);
      }
    );
  }
}


// Get non-archived deployment plans
get nonArchivedDeploymentPlans() {
  return this.deploymentPlans.filter(plan => !plan.archived);
}

// Get archived deployment plans
get archivedDeploymentPlans() {
  return this.deploymentPlans.filter(plan => plan.archived);
}



  // Phase 6
  archivedKpis: KPI[] = [];
  postProjectCompletion: { completed: number; remaining: number } = { completed: 0, remaining: 100 };

  calculatePostProjectCompletion(): void {
    console.log('Début du calcul pour POST-PROJET');

    let completedParts = 0;
    const totalParts = 4; // Il y a 4 parties: KPI, Report, Feedback, ImprovementPlan

    // Vérifier si tous les KPIs sont remplis
    const kpisFilled = this.kpis.every(kpi => kpi.name && kpi.name !== '' && kpi.value !== '');
    if (kpisFilled && this.kpis.length > 0) {
      completedParts++;
    }

    // Vérifier si tous les Reports sont remplis
    const reportsFilled = this.reports.every(report => report.title && report.title !== '' && report.content !== '');
    if (reportsFilled && this.reports.length > 0) {
      completedParts++;
    }

    // Vérifier si tous les Feedbacks sont remplis
    const feedbacksFilled = this.feedbacks.every(feedback => feedback.content && feedback.content !== '');
    if (feedbacksFilled && this.feedbacks.length > 0) {
      completedParts++;
    }

    // Vérifier si tous les ImprovementPlans sont remplis
    const improvementPlansFilled = this.improvementPlans.every(plan => plan.content && plan.content !== '');
    if (improvementPlansFilled && this.improvementPlans.length > 0) {
      completedParts++;
    }

    const completionPercentage = (completedParts / totalParts) * 100;
    this.postProjectCompletion = { completed: completionPercentage, remaining: 100 - completionPercentage };

    console.log('Avancement du POST-PROJET:', this.postProjectCompletion);

    // Mettre à jour les options du graphique ici
    this.dsdmDashComponent.initPhaseChartOptions();
  }

  loadKPIs(projectId: string): void {
    this.phaseService.getKPIsByProjectId(projectId).subscribe((data: KPI[]) => {
      this.kpis = data.filter(kpi => !kpi.archived);
      this.calculatePostProjectCompletion();

    });
  }
  loadArchivedKPIs(projectId: string): void {
    this.phaseService.getKPIsByProjectId(projectId).subscribe((data: KPI[]) => {
      this.archivedKpis = data.filter(kpi => kpi.archived);
    });
  }
  editKpi(kpi: KPI): void {
    // Implémentation de l'édition du KPI (exemple basique)
    const newName = prompt('Entrez le nouveau nom du KPI:', kpi.name);
    const newValue = prompt('Entrez la nouvelle valeur du KPI:', kpi.value);
    if (newName && newValue) {
      this.phaseService.updateKPI(this.project, kpi.id, newName, newValue).subscribe((updatedKpi: KPI) => {
        kpi.name = updatedKpi.name;
        kpi.value = updatedKpi.value;
      });
    }
  }

  archiveKpi(kpi: KPI): void {
    this.phaseService.archiveKPI(this.project, kpi.id).subscribe((archivedKpi: KPI) => {
      kpi.archived = true;
      this.kpis = this.kpis.filter(k => k.id !== kpi.id);
      this.archivedKpis.push(archivedKpi);
    });
  }

  deleteKpi(kpi: KPI): void {
    this.phaseService.deleteKPI(this.project, kpi.id).subscribe(() => {
      this.archivedKpis = this.archivedKpis.filter(k => k.id !== kpi.id);
    });
  }


  archivedReports: Report[] = [];


  loadReports(projectId: string): void {
    this.phaseService
      .getReportsByProjectId(projectId)
      .subscribe((data: Report[]) => {
        this.reports = data.filter(report => !report.archived);
        this.calculatePostProjectCompletion();

      });
  }
  loadArchivedReports(projectId: string): void {
    this.phaseService.getReportsByProjectId(projectId).subscribe((data: Report[]) => {
      this.archivedReports = data.filter(report => report.archived);

    });
  }


  addReport(): void {
    this.phaseService
      .addReport(this.project, this.newReport.title, this.newReport.content)
      .subscribe((data: Report) => {
        this.reports.push(data);
        this.newReport = new Report();
      });
  }
  editReport(report: Report): void {
    const newTitle = prompt('Entrez le nouveau titre du rapport:', report.title);
    const newContent = prompt('Entrez le nouveau contenu du rapport:', report.content);
    if (newTitle && newContent) {
      this.phaseService.updateReport(this.project, report.id, newTitle, newContent)
        .subscribe((updatedReport: Report) => {
          report.title = updatedReport.title;
          report.content = updatedReport.content;
        });
    }
  }

  archiveReport(report: Report): void {
    this.phaseService.archiveReport(this.project, report.id).subscribe((archivedReport: Report) => {
      report.archived = true;
      this.reports = this.reports.filter(r => r.id !== report.id);
      this.archivedReports.push(archivedReport);
    });
  }

  deleteReport(report: Report): void {
    if (report.archived) {
      this.phaseService.deleteReport(this.project, report.id).subscribe(() => {
        this.archivedReports = this.archivedReports.filter(r => r.id !== report.id);
      });
    }
  }

  archivedImprovementPlans: ImprovementPlan[] = [];

  loadImprovementPlans(projectId: string): void {
    this.phaseService
      .getImprovementPlansByProjectId(projectId).subscribe((data: ImprovementPlan[]) => {
        this.improvementPlans = data.filter(plan => !plan.archived);
        this.calculatePostProjectCompletion();

         });
  }
  loadArchivedImprovementPlans(projectId: string): void {
    this.phaseService.getImprovementPlansByProjectId(projectId).subscribe((data: ImprovementPlan[]) => {
      this.archivedImprovementPlans = data.filter(plan => plan.archived);
    });
  }



  editImprovementPlan(plan: ImprovementPlan): void {
    const newContent = prompt('Entrez le nouveau contenu du Plan d’Amélioration:', plan.content);
    if (newContent) {
      this.phaseService.updateImprovementPlan(this.project, plan.id, newContent).subscribe((updatedPlan: ImprovementPlan) => {
        plan.content = updatedPlan.content;
      });
    }
  }

  archiveImprovementPlan(plan: ImprovementPlan): void {
    this.phaseService.archiveImprovementPlan(this.project, plan.id).subscribe((archivedPlan: ImprovementPlan) => {
      plan.archived = true;
      this.improvementPlans = this.improvementPlans.filter(p => p.id !== plan.id);
      this.archivedImprovementPlans.push(archivedPlan);
    });
  }

  deleteImprovementPlan(plan: ImprovementPlan): void {
    if (plan.archived) {
      this.phaseService.deleteImprovementPlan(this.project, plan.id).subscribe(() => {
        this.archivedImprovementPlans = this.archivedImprovementPlans.filter(p => p.id !== plan.id);
      });
    }
  }

  addKpi(): void {
    this.phaseService
      .addKPI(this.project, this.newKpi.name, this.newKpi.value)
      .subscribe((data: KPI) => {
        this.kpis.push(data);
        this.newKpi = new KPI();
      });
  }
  archivedFeedbacks: Feedback[] = [];

  loadFeedbacks(projectId: string): void {
    this.phaseService
      .getFeedbacksByProjectId(projectId)
      .subscribe((data: Feedback[]) => {
        this.feedbacks = data.filter(f => !f.archived);
        this.calculatePostProjectCompletion();

      });
  }
  loadArchivedFeedbacks(projectId: string): void {
    this.phaseService.getFeedbacksByProjectId(projectId).subscribe((data: Feedback[]) => {
      this.archivedFeedbacks = data.filter(f => f.archived);
    });
  }
  addFeedback(): void {
    this.phaseService
      .addFeedback(this.project, this.newFeedback.content)
      .subscribe((data: Feedback) => {
        this.feedbacks.push(data);
        this.newFeedback = new Feedback();
      });
  }

  editFeedback(feedback: Feedback): void {
    const newContent = prompt('Entrez le nouveau contenu du Feedback:', feedback.content);
    if (newContent) {
      this.phaseService.updateFeedback(this.project, feedback.id, newContent).subscribe((updatedFeedback: Feedback) => {
        feedback.content = updatedFeedback.content;
      });
    }
  }

  archiveFeedback(feedback: Feedback): void {
    this.phaseService.archiveFeedback(this.project, feedback.id).subscribe((archivedFeedback: Feedback) => {
      feedback.archived = true;
      this.feedbacks = this.feedbacks.filter(f => f.id !== feedback.id);
      this.archivedFeedbacks.push(archivedFeedback);
    });
  }

  deleteFeedback(feedback: Feedback): void {
    if (feedback.archived) {
      this.phaseService.deleteFeedback(this.project, feedback.id).subscribe(() => {
        this.archivedFeedbacks = this.archivedFeedbacks.filter(f => f.id !== feedback.id);
      });
    }
  }
  addImprovementPlan(): void {
    this.phaseService
      .addImprovementPlan(this.project, this.newImprovementPlan.content)
      .subscribe((data: ImprovementPlan) => {
        this.improvementPlans.push(data);
        this.newImprovementPlan = new ImprovementPlan();
      });
  }

}
