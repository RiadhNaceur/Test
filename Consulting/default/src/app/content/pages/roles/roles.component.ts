import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import{RoleService} from './role.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'm-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {

  displayedColumns = ['role_nom', 'createdAt', 'role_etat','action'];
  public tables;
  public ELEMENT_DATA2;
  public dataSource;
  closeResult: string;

  constructor(private RoleService: RoleService, private modalService: NgbModal){}
  @ViewChild(MatSort) sort: MatSort;

  /**
  * Set the sort after the view init since this component will
  * be able to query its view for the initialized sort.
  */
 ngAfterViewInit() {
  
}
  ngOnInit() {
      console.log(this.ELEMENT_DATA2)
      this.RoleService.getRoles().subscribe(response => {
      console.log('rrrrrrrrrrr'+JSON.stringify(response))
      this.ELEMENT_DATA2 = response;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA2);
      this.dataSource.sort = this.sort;
      
    });

  }
  getRole(id){
    this.RoleService.getRole(id).subscribe(response => {
      console.log('response: '+JSON.stringify(response))
    });
  }
  open(content) {
    this.modalService.open(content, {
        size: 'lg'
    });
}

}
