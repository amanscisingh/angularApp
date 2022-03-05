import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Origin':'*',
  })
};


import{ Observable, of } from 'rxjs';


import {Employee} from '../EmployeeData'

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private apiUrl: string = 'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
  constructor(
    private http: HttpClient
  ) { }

  getEmployees() : Observable<Employee[]> {
    let allEmployees = this.http.get<Employee[]>(this.apiUrl, httpOptions);
    return allEmployees;
  }
}
 