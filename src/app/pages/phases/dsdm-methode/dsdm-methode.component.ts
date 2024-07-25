import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dsdm } from '../model/dsdm.model';
import { PhaseServiceService } from '../service/phase-service.service';

@Component({
  selector: 'ngx-dsdm-methode',
  templateUrl: './dsdm-methode.component.html',
  styleUrls: ['./dsdm-methode.component.scss']
})
export class DsdmMethodeComponent implements OnInit {

  project: string | undefined;
  projectTitle: string | undefined;
  dsdm: Dsdm | null = null;
  newDsdm: Dsdm = {
    id: '',
    name: '',
    desc: '',
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
          }
        });
      }
    });
  }

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
        this.newDsdm.name,
        this.newDsdm.desc,
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
}
