import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IHighCharts } from 'src/app/model/IHighCharts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  Highcharts: typeof Highcharts;
  chartOptions: Highcharts.Options;
  @Input()
  highCharts: IHighCharts;
  constructor() {
  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.chartOptions = {
      chart: this.highCharts && this.highCharts.chartOptions,
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: this.highCharts && this.highCharts.xAxisOptions,
        crosshair: true
      }],
      yAxis: this.highCharts && this.highCharts.yAxisOptions,
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        // x: 120,
        verticalAlign: 'top',
        // y: 100,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
      series: this.highCharts && this.highCharts.seriesOptionsTypes
    };
  }
}
