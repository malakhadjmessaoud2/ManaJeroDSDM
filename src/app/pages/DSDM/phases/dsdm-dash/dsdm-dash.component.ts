import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Contacts, RecentUsers, UserData } from '../../../../@core/data/users';
import { takeWhile } from 'rxjs/operators';
import { DsdmMethodeComponent } from '../dsdm-methode/dsdm-methode.component';

@Component({
  selector: 'ngx-dsdm-dash',
  templateUrl: './dsdm-dash.component.html',
  styleUrls: ['./dsdm-dash.component.scss']
})
export class DsdmDashComponent implements OnDestroy, OnInit{
  workProgress: number = 75; // ou toute autre valeur dynamique

  phaseChartOptions: any;
  sprintChartOptions: any;
  iterationChartOptions: any;

  ngOnInit() {
    // Sprints (cercle)
    this.sprintChartOptions = {
      title: {
        text: 'Total Sprints',
        left: 'center',
        top: '20px',
        textStyle: {
          color: '#000000'
        }
      },
      series: [
        {
          name: 'Sprints',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold',
              color: '#000000'
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1, name: 'Sprint 1', itemStyle: { color: '#FF6347' } },
            { value: 1, name: 'Sprint 2', itemStyle: { color: '#4682B4' } },
            { value: 1, name: 'Sprint 3', itemStyle: { color: '#32CD32' } },
            { value: 1, name: 'Sprint 4', itemStyle: { color: '#FFD700' } },
            { value: 1, name: 'Sprint 5', itemStyle: { color: '#8A2BE2' } },
          ],
        },
      ],
    };

    // Itérations (graphiques en courbe)
    this.iterationChartOptions = {
      title: {
        text: 'Total Itérations',
        left: 'center',
        top: '20px',
        textStyle: {
          color: '#000000'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Sprint 4', 'Sprint 5'],
        axisLine: {
          lineStyle: {
            color: '#000000'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#000000'
          }
        }
      },
      series: [
        {
          name: 'Itérations',
          type: 'line',
          data: [2, 3, 4, 5, 1],
          itemStyle: {
            color: '#FFA07A',
          },
        },
      ],
    };

        // Progression des Phases (graphe vertical)
    this.initPhaseChartOptions();

  }

  initPhaseChartOptions() {
    this.phaseChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Completé', 'Restant'],
        textStyle: { color: '#000000' },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Pré-Projet', 'Faisabilité', 'Fondations', 'Développement', 'Déploiement', 'Post-Projet'],
        axisLine: { lineStyle: { color: '#000000' } },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#000000' } },
      },
      series: [
        {
          name: 'Completé',
          type: 'bar',
          stack: 'total',
          label: { show: true, position: 'inside' },
          itemStyle: { color: '#1E90FF' },
          data: [this.DsdmMethodeComponent.preProjetCompletion.completed, 50, 90, 30, 60, 10],
        },
        {
          name: 'Restant',
          type: 'bar',
          stack: 'total',
          label: { show: true, position: 'inside' },
          itemStyle: { color: '#696969' },
          data: [this.DsdmMethodeComponent.preProjetCompletion.remaining, 50, 10, 70, 40, 90],
        },
      ],
    };
  }


  private alive = true;

  contacts: any[];
  recent: any[];

  constructor(private userService: UserData, private DsdmMethodeComponent : DsdmMethodeComponent) {
    forkJoin(
      this.userService.getContacts(),
      this.userService.getRecentUsers(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
