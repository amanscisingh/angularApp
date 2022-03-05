import { Component } from '@angular/core';
import { GetDataService } from './services/get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Data';
  isTable: boolean = true
  allData:[] = []

  constructor(private getData: GetDataService)
  { }

  ngOnInit() {
      
  }

  toggleIsTable() : void {
    this.isTable = !this.isTable
    console.log(this.isTable)
  }

}
