import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import{RoleService} from './role.service';

@Component({
  selector: 'm-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  displayedColumns = ['nom', 'date', 'etat'];
  public tables;
  public tables2: [];
  dataSource = new MatTableDataSource(this.tables2);


  constructor(private RoleService: RoleService){}
  @ViewChild(MatSort) sort: MatSort;

  /**
  * Set the sort after the view init since this component will
  * be able to query its view for the initialized sort.
  */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  med2014positif
  ngOnInit() {
    this.RoleService.getRoles().subscribe(response => {
      console.log('rrrrrrrrrrr'+JSON.stringify(response))
     //this.ELEMENT_DATA2 = response;
     this.tables = response;
     this.tables2 = this.tables;
    });

  }
}
export interface Element {
  nom: string;
  date: string;
  etat: number;
}
export interface Element2 {
  role_nom: string;
  createdAt: string;
  role_etat: string;
}
const ELEMENT_DATA2: Element2[] = [
  {role_nom: 'Hydrogen', createdAt: '2018-01-01', role_etat: '1'},
  {role_nom: 'Helium', createdAt: '2018-01-01', role_etat: '1'},
  {role_nom: 'Lithium', createdAt: '2018-01-01', role_etat: '1'},
  {role_nom: 'Beryllium', createdAt: '2018-01-01', role_etat: '1'},
];
const ELEMENT_DATA: Element[] = [
  {nom: 'Hydrogen', date: '2018-01-01', etat: 1},
  {nom: 'Helium', date: '2018-01-01', etat: 1},
  {nom: 'Lithium', date: '2018-01-01', etat: 1},
  {nom: 'Beryllium', date: '2018-01-01', etat: 1},
];

