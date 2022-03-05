import { Component, OnInit } from '@angular/core';

import {EmployeeFinal} from '../../EmployeeDataReady'

import { GetDataService } from '../../services/get-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  allEmployees: EmployeeFinal[] = [];

  calculateHours(startTime: string, endTime: string): number {
    const d1 = new Date(startTime);
    const d2 = new Date(endTime);
    return Math.abs(Math.round((d2.getTime() - d1.getTime()) / 3600000));
  }

  parseColor(h: number): string {
    if (h < 100 ) {
      return 'rgb(255 30 30 / 32%)';
    } else {
      return 'white';
    }
  }

  
  constructor(private getData: GetDataService) { }

  ngOnInit(): void {
    this.getData.getEmployees().subscribe(employees => {
      for (let employee of employees) {
        let newEmployee: EmployeeFinal = {
          Id: employee.Id,
          EmployeeName: employee.EmployeeName,
          hours: this.calculateHours(employee.StarTimeUtc, employee.EndTimeUtc)
        }
        this.allEmployees.push(newEmployee);
      }

      this.allEmployees.sort((a, b) => {
        return a.hours < b.hours ? 1 : -1;
      });
    })
  }

}
