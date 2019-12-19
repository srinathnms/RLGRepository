import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AssociateRoles } from 'src/app/model/enum/associateRoles';
import { Month } from 'src/app/model/enum/month';
import { YearOptions } from 'src/app/model/enum/yearOptions';
import * as Highcharts from 'highcharts';
import { IFinance } from 'src/app/model/finance';
import { IHighCharts } from 'src/app/model/IHighCharts';

@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.css']
})
export class TeamViewComponent implements OnInit, OnDestroy {
  @Input() graphData: IFinance[];
  Highcharts: typeof Highcharts;
  highCharts: IHighCharts;
  chartOptions: Highcharts.Options;
  yearOptions = ['Yearly', '2016', '2017', '2018', '2019'];
  yearOption = this.yearOptions[0];
  graphTypes = Object.values(AssociateRoles);
  graphType = AssociateRoles.Overall;
  monthlyChartLabels: string[] = Object.keys(Month);
  yearlyChartLabels: string[] = ['2016', '2017', '2018', '2019'];
  graphLabels: string[] = this.yearlyChartLabels;
  constructor() { }

  ngOnDestroy() {
    this.Highcharts.erase(this.Highcharts.charts, this.Highcharts.charts[0]);
  }

  ngOnInit() {
    this.Highcharts = Highcharts;
    this.highCharts = {
      chartOptions: {
        type: 'column'
      },
      xAxisOptions: this.yearlyChartLabels,
      yAxisOptions: [{
        title: {
          text: 'Number of associates',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],
      seriesOptionsTypes: this.getGraphSeries(this.yearOption, this.graphType) as Highcharts.SeriesOptionsType[]
    };
  }

  updateGraph(): void {
    const series: Highcharts.Options = {
      legend: { enabled: this.shouldDisplayLegend() },
      series: this.getGraphSeries(this.yearOption, this.graphType) as Highcharts.SeriesOptionsType[],
      xAxis: { categories: this.graphLabels }
    };
    this.Highcharts.charts[0].update(series);
  }

  onYearChange(year: string): void {
    this.yearOption = year;
    this.updateGraph();
  }

  onTeamViewTypeChange(type: AssociateRoles): void {
    this.graphType = type;
    this.updateGraph();
  }

  getGraphSeries(yearOption: string, graphType: AssociateRoles): Highcharts.SeriesOptionsType[] {
    let onsiteData: number[] = [];
    let offshoreData: number[] = [];
    this.graphLabels = this.monthlyChartLabels;
    switch (graphType) {
      case AssociateRoles.Overall: {
        if (yearOption === YearOptions.Yearly) {
          return this.getYearlyData(AssociateRoles.Overall);
        }
        this.graphLabels = this.monthlyChartLabels;
        onsiteData = this.graphData.filter(x => x.Year === yearOption).map(y => y.TotalOnsite);
        offshoreData = this.graphData.filter(x => x.Year === yearOption).map(y => y.TotalOffshore);
        return ([
          {
            name: 'Onsite',
            data: onsiteData
          },
          {
            name: 'Offshore',
            data: offshoreData
          }
        ]) as Highcharts.SeriesOptionsType[];
      }
      case AssociateRoles.BillableRoles: {
        if (yearOption === YearOptions.Yearly) {
          return this.getYearlyData(AssociateRoles.BillableRoles);
        }
        onsiteData = this.graphData.filter(x => x.Year === yearOption).map(y => y.BilledOnsite);
        offshoreData = this.graphData.filter(x => x.Year === yearOption).map(y => y.BilledOffshore);
        return ([
          {
            name: 'Onsite',
            data: onsiteData
          },
          {
            name: 'Offshore',
            data: offshoreData
          }
        ]) as Highcharts.SeriesOptionsType[];
      }
      case AssociateRoles.Buffer: {
        if (this.yearOption === YearOptions.Yearly) {
          return this.getYearlyData(AssociateRoles.Buffer);
        }
        const bufferData = this.graphData.filter(x => x.Year === yearOption).map(y => y.Buffer);
        return ([
          {
            name: 'Buffer',
            data: bufferData
          },
          {
            data: []
          }
        ]) as Highcharts.SeriesOptionsType[];
      }
    }
  }

  getYearlyData(type: AssociateRoles): Highcharts.SeriesOptionsType[] {
    this.graphLabels = this.yearlyChartLabels;
    if (type === AssociateRoles.Buffer) {
      return (
        [{
          name: 'Buffer',
          data: [this.getYearlyMaximumValue(YearOptions.Year_2016, false),
          this.getYearlyMaximumValue(YearOptions.Year_2017, false),
          this.getYearlyMaximumValue(YearOptions.Year_2018, false),
          this.getYearlyMaximumValue(YearOptions.Year_2019, false)]
        },
        {

          data: []
        }]
      ) as Highcharts.SeriesOptionsType[];
    }
    return ([
      {
        name: 'Onsite',
        data: [this.getYearlyMaximumValue(YearOptions.Year_2016, true),
        this.getYearlyMaximumValue(YearOptions.Year_2017, true),
        this.getYearlyMaximumValue(YearOptions.Year_2018, true),
        this.getYearlyMaximumValue(YearOptions.Year_2019, true)]
      },
      {
        name: 'Offshore',
        data: [this.getYearlyMaximumValue(YearOptions.Year_2016, false),
        this.getYearlyMaximumValue(YearOptions.Year_2017, false),
        this.getYearlyMaximumValue(YearOptions.Year_2018, false),
        this.getYearlyMaximumValue(YearOptions.Year_2019, false)]
      }
    ]) as Highcharts.SeriesOptionsType[];
  }

  getYearlyMaximumValue(yearOption: YearOptions, isOnsiteData: boolean): number {
    const data = this.graphData.filter(x => x.Year === yearOption);
    let values: number[] = [];
    switch (this.graphType) {
      case AssociateRoles.Overall:
        {
          values = isOnsiteData ? data.map(x => x.TotalOnsite) : data.map(x => x.TotalOffshore);
          return this.getMaximumValue(values);
        }
      case AssociateRoles.BillableRoles:
        {
          values = isOnsiteData ? data.map(x => x.BilledOnsite) : data.map(x => x.BilledOffshore);
          return this.getMaximumValue(values);
        }
      case AssociateRoles.Buffer:
        {
          values = data.map(x => x.Buffer);
          return this.getMaximumValue(values);
        }
    }
  }

  getMaximumValue(data: number[]): number {
    return Math.max(...data);
  }

  shouldDisplayLegend(): boolean {
    return this.graphType !== AssociateRoles.Buffer;
  }
}
