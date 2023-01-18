import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { Widget } from 'src/app/core/models/dashboard/dashboard.model';

@Component({
  selector: 'app-gender-widget',
  templateUrl: './gender-widget.component.html',
  styleUrls: ['./gender-widget.component.scss'],
})
export class GenderWidgetComponent implements OnInit, OnChanges {
  @Input() data!: Widget[];
  public pieChartLegend = true;
  public pieChartLabels!: string[];
  public pieChartValues!: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartData!: ChartData<'pie', number[], string | string[]>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.configurePie();
    }
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  getLabels() {
    this.pieChartLabels = this.data.map((widget) => widget.name);
  }

  getDatasets() {
    this.pieChartValues = this.data.map((widget) => Number(widget.total));
  }

  configurePie() {
    this.getLabels();
    this.getDatasets();
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: this.pieChartValues,
        },
      ],
    };
  }
}
