import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IFinance } from 'src/app/model/finance';
import { IHighCharts } from 'src/app/model/IHighCharts';
import * as Highcharts from 'highcharts';
import { Month } from 'src/app/model/enum/month';
import { YearOptions } from 'src/app/model/enum/yearOptions';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})

export class RevenueComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts;
  @Input() graphData: IFinance[];
  highCharts: IHighCharts;
  monthlyChartLabels: string[] = Object.values(Month);
  yearOptions: string[] = Object.values(YearOptions);
  yearlyChartLabels: string[] = ['2016', '2017', '2018', '2019'];
  graphLabel: YearOptions = YearOptions.Yearly;
  constructor() {
  }

  ngOnDestroy() {
    this.Highcharts.erase(this.Highcharts.charts, this.Highcharts.charts[0]);
  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.highCharts = {
      chartOptions: {
        zoomType: 'xy'
      },
      xAxisOptions: this.yearlyChartLabels,
      yAxisOptions: [{ // Primary yAxis
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        title: {
          text: 'CP (%)',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }, { // Secondary yAxis
        title: {
          text: 'Revenue ($)',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} $',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }],
      seriesOptionsTypes: this.getGraphSeries(this.graphLabel)
    };
  }

  onYearChange(year: YearOptions): void {
    this.graphLabel = year;
    this.highCharts.seriesOptionsTypes = this.getGraphSeries(year);
    const series: Highcharts.Options = {
      series: this.getGraphSeries(year),
      xAxis: { categories: this.monthlyChartLabels }
    };
    this.Highcharts.charts[0].update(series);
  }

  getGraphSeries(year: YearOptions): Highcharts.SeriesOptionsType[] {
    let revenue: number[] = [];
    let customerProfitability: number[] = [];

    if (year === YearOptions.Yearly) {
      this.yearlyChartLabels.forEach((yearOption: YearOptions) => {
        revenue.push(this.getYearlyData(yearOption).revenue.reduce((prev, curr) => prev + curr));
        const cp = this.getYearlyData(yearOption).customerProfitability;
        const cpAverage = cp.reduce((prev, curr) => prev + curr) / cp.length;
        customerProfitability.push(cpAverage);
      });

    } else {
      revenue = this.getYearlyData(year).revenue;
      customerProfitability = this.getYearlyData(year).customerProfitability;
    }
    const graphSeries = [
      {
        name: 'Revenue ($)',
        type: 'column',
        yAxis: 1,
        data: revenue,
        tooltip: {
          valueSuffix: ' $'
        }
      },
      {
        name: 'CP (%)',
        type: 'spline',
        data: customerProfitability,
        tooltip: {
          valueSuffix: ' %'
        }
      }] as Highcharts.SeriesOptionsType[];

    return graphSeries;
  }

  getYearlyData(year: YearOptions) {
    const revenue = this.graphData && this.graphData.filter((finance: IFinance) => finance.Year === year)
      .map((finance: IFinance) => finance.Revenue);
    const customerProfitability = this.graphData && this.graphData.filter((finance: IFinance) => finance.Year === year)
      .map((finance: IFinance) => finance.CustomerProfitability);
    return { revenue, customerProfitability };
  }
}
