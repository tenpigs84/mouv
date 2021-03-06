import { ChangeDetectionStrategy, Component } from '@angular/core';
import { multi, single } from './data';

@Component({
  selector: 'app-chart-ngx-charts-pie',
  template: `
    <ngx-charts-pie-chart
      [view]="view"
      [scheme]="colorScheme"
      [results]="single"
      [legend]="showLegend"
      [explodeSlices]="explodeSlices"
      [labels]="showLabels"
      [doughnut]="doughnut"
      [gradient]="gradient"
      (select)="onSelect($event)"
    >
    </ngx-charts-pie-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartNgxChartsPieComponent {
  single!: any[];
  multi!: any[];

  view: [number, number] = [700, 400];

  // options
  showLegend = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  gradient = false;

  constructor() {
    Object.assign(this, { single, multi });
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
