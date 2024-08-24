import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() preProjetCompletion!: any;
  @Input() feasibilityCompletion!: any;
  @Input() foundationCompletion!: any;
  @Input() sprintCompletion!: any;
  @Input() deploymentPlanCompletion!: any;
  @Input() postProjectCompletion!: any;

  workProgress: any; // ou toute autre valeur dynamique

  phaseChartOptions: any;
  sprintChartOptions: any;
  iterationChartOptions: any;

  ngOnInit() {
    // Sprints (cercle)
    this.initSprintChartOptions();
    // Itérations (graphiques en courbe)
    this.initIterationChartOptions();
    // Progression des Phases (graphe vertical)
    this.initPhaseChartOptions();

  }
  calculateWorkProgress() {
    const totalCompleted =
      (this.DsdmMethodeComponent.preProjetCompletion?.completed || 0) +
      (this.DsdmMethodeComponent.feasibilityCompletion?.completed || 0) +
      (this.DsdmMethodeComponent.foundationCompletion?.completed || 0) +
      (this.DsdmMethodeComponent.sprintCompletion?.completed || 0) +
      (this.DsdmMethodeComponent.deploymentPlanCompletion?.completed || 0) +
      (this.DsdmMethodeComponent.postProjectCompletion?.completed || 0);

    const maxPossibleCompletion = 100 * 6; // 6 phases, chacune ayant un maximum de 100%

    this.workProgress = (totalCompleted / maxPossibleCompletion) * 100;
  }
// Itérations (graphiques en courbe)
initIterationChartOptions(): void {
  this.iterationChartOptions = {
      title: {
          text: 'Total Iterations',
          left: 'center',
          top: '20px',
          textStyle: {
              color: '#000000'
          }
      },
      xAxis: {
          type: 'category',
          data: [], // Initial empty data
          axisLine: {
              lineStyle: {
                  color: '#000000'
              }
          }
      },
      yAxis: {
          type: 'value',
          min: 0,          // Set minimum value to 0
          max: 10,         // Set maximum value (you can adjust this depending on your data)
          interval: 1,     // Force the y-axis to show integers
          axisLine: {
              lineStyle: {
                  color: '#000000'
              }
          }
      },
      series: [
          {
              name: 'Iterations',
              type: 'line',
              data: [], // Initial empty data
              itemStyle: {
                  color: '#FFA07A',
              },
          },
      ],
  };
}


  updateIterationChart(sprintNames: string[], iterationCounts: number[]): void {
    // Update the xAxis data with sprint names
    this.iterationChartOptions.xAxis.data = sprintNames;

    // Update the series data with iteration counts
    this.iterationChartOptions.series[0].data = iterationCounts;

    // Trigger a chart refresh
    this.iterationChartOptions = { ...this.iterationChartOptions };
    console.log('Updated iteration chart:', this.iterationChartOptions);
  }
    // Sprints (cercle)
  initSprintChartOptions(): void {
    this.sprintChartOptions = {
      title: {
        text: 'Total Sprints',
        left: 'center',
        top: '20px',
        textStyle: {
          color: '#000000',
        },
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        padding: 10,
        itemGap: 15, // Increase the gap between legend items
        textStyle: {
          color: '#000000',
          fontSize: 14,
        },
      },
      series: [
        {
          name: 'Sprints',
          type: 'pie',
          radius: ['45%', '75%'], // Increase the inner and outer radius
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20', // Adjust font size to fit better
              fontWeight: 'bold',
              color: '#000000',
            },
          },
          labelLine: {
            show: false,
          },
          data: [], // Data will be dynamically updated
        },
      ],
    };
  }
  updateSprintChart(sprintData: any[]): void {
    // Update the chart data
    this.sprintChartOptions.series[0].data = sprintData;
    console.log('Updated chart data:', this.sprintChartOptions.series[0].data);
  }
  // Progression des Phases (graphe vertical)
  initPhaseChartOptions() {
    this.calculateWorkProgress(); // Calculer la progression avant d'initialiser le graphique

    this.phaseChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Completed', 'Remaining', 'Progress'],
        textStyle: { color: '#000000' },
      },
      grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Pre-Project', 'Faisability', 'Fondations', 'Developpement', 'Deployement', 'Post-Project'],
        axisLine: { lineStyle: { color: '#000000' } },
        axisLabel: {
          fontSize: 10,
          interval: 0,
          rotate: -45,
        },
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#000000' } },
      },
      series: [
        {
          name: 'Completed',
          type: 'bar',
          stack: 'total',
          label: { show: true, position: 'inside' },
          itemStyle: { color: '#1E90FF' },
          data: [
            this.DsdmMethodeComponent.preProjetCompletion?.completed || 0,
            this.DsdmMethodeComponent.feasibilityCompletion?.completed || 0,
            this.DsdmMethodeComponent.foundationCompletion?.completed || 0,
            this.DsdmMethodeComponent.sprintCompletion?.completed || 0,
            this.DsdmMethodeComponent.deploymentPlanCompletion?.completed || 0,
            this.DsdmMethodeComponent.postProjectCompletion?.completed || 0,
          ],
        },
        {
          name: 'Remaining',
          type: 'bar',
          stack: 'total',
          label: { show: true, position: 'inside' },
          itemStyle: { color: '#696969' },
          data: [
            this.DsdmMethodeComponent.preProjetCompletion?.remaining || 0,
            this.DsdmMethodeComponent.feasibilityCompletion?.remaining || 0,
            this.DsdmMethodeComponent.foundationCompletion?.remaining || 0,
            this.DsdmMethodeComponent.sprintCompletion?.remaining || 0,
            this.DsdmMethodeComponent.deploymentPlanCompletion?.remaining || 0,
            this.DsdmMethodeComponent.postProjectCompletion?.remaining || 0,
          ],
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
