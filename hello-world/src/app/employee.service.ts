import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IEmployee } from './employee';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _url : string = '/assets/data/employees.json';
  constructor(private http: HttpClient) { }
  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url)
      .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "server error");
  }

}
