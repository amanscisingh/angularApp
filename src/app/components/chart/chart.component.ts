import { Component, OnInit,ViewChild } from '@angular/core';
// import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import {EmployeeFinal} from '../../EmployeeDataReady'
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  data = "Loading Chart..."
  chartLabelMap = new Map();
  labels: string[] = [];
  dataSet: number[] = [];

  calculateHours(startTime: string, endTime: string): number {
    const d1 = new Date(startTime);
    const d2 = new Date(endTime);
    return Math.abs(Math.round((d2.getTime() - d1.getTime()) / 3600000));
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.labels,
    datasets: [ {
      data: this.dataSet
    } ]
  };


  public pieChartType: ChartType = 'pie';



  constructor(private getData: GetDataService) { 

  }

  

  ngOnInit(): void {
    this.getData.getEmployees().subscribe(employees => {
      for (let employee of employees) {
        let hours = this.calculateHours(employee.StarTimeUtc, employee.EndTimeUtc).toString();
        if(this.chartLabelMap.get(hours)) {
          this.chartLabelMap.set(hours, this.chartLabelMap.get(hours)+1)
        } else {
          this.chartLabelMap.set(hours, 1)
        }
      }
      this.labels = Array.from(this.chartLabelMap.keys());
      this.labels = this.labels.map(label => label + ' hours');
      this.dataSet = Array.from(this.chartLabelMap.values());
      this.pieChartData.labels = this.labels;
      this.pieChartData.datasets[0].data = this.dataSet;
      this.data = '';
      this.chart?.chart?.update();
    })


  }

}
