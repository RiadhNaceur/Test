import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  public employees = [];
  errorMsg;
  constructor(private _ES: EmployeeService) { }

  ngOnInit() {
    this._ES.getEmployees()
      .subscribe(data => this.employees = data,
        error => this.errorMsg = error);
  }

}
