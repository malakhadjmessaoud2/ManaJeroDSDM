// components/list-project.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../core/models/project.model';
import { PhaseServiceService } from '../../../../core/services/phase-service.service';

@Component({
    selector: 'ngx-list-project',
    templateUrl: './list-project.component.html',
    styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

    projects: Project[] = [];

    constructor(private phaseService: PhaseServiceService, private router: Router) { }

    ngOnInit(): void {
        this.getProjets();
    }

    getProjets(): void {
        this.phaseService.getProjets().subscribe(projects => {
            this.projects = projects;
        });
    }

    voirDsdm(projectId: string): void {
        this.router.navigate(['pages/phases/dsdm-methode'], { queryParams: { projectId } });
    }

    getStatusClass(status: string): string {
        switch (status) {
            case 'En cours':
                return 'status-in-progress';
            case 'Terminé':
                return 'status-completed';
            case 'En attente':
                return 'status-pending';
            default:
                return '';
        }
    }
}
