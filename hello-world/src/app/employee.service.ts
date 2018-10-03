import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
  getEmployees(){
    return [
      {'id':1, 'name':'aaa', 'age':25},
      {'id':2, 'name':'bbb', 'age':26},
      {'id':3, 'name':'bbb', 'age':27}
    ];
  }

}
