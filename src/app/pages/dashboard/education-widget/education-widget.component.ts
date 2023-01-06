import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartType, ChartData, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Widget } from 'src/app/core/models/dashboard/dashboard.model';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-education-widget',
  templateUrl: './education-widget.component.html',
  styleUrls: ['./education-widget.component.scss'],
})
export class EducationWidgetComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DatalabelsPlugin];
  public barChartData!: ChartData<'bar'>;
  @Input() data!: Widget[];
  public barChartLabels!: string[];
  public barChartValues!: number[];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {},
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.configurePie();
    }
  }

  getLabels() {
    this.barChartLabels = this.data.map((widget) => widget.name);
  }

  getDatasets() {
    this.barChartValues = this.data.map((widget) => Number(widget.total));
  }

  configurePie() {
    this.getLabels();
    this.getDatasets();
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [...this.barChartValues],
          label: 'Count',
        },
      ],
    };
  }
}
