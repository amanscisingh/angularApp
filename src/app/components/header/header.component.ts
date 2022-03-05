import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleIsTable = new EventEmitter();
  isTable:boolean = true
  constructor() { }

  onClick1(): void {
    this.isTable = !this.isTable
    this.toggleIsTable.emit();
  }

  onClick2(): void {
    this.isTable = !this.isTable
    this.toggleIsTable.emit();
  }

  ngOnInit(): void {
    
  }

}
