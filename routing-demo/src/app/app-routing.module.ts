import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartmentListComponent} from "./department-list/department-list.component";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import { DepartmentDetailsComponent } from './department-details/department-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/departments', pathMatch: 'full'},
  {path: 'departments', component: DepartmentListComponent},
  {path: 'departments/:id', component: DepartmentDetailsComponent},
  {path: 'employees', component: EmployeeListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [DepartmentListComponent, EmployeeListComponent,NotFoundComponent, DepartmentDetailsComponent];
