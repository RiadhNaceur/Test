import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import{RoleService} from './role.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditComponent} from './edit/edit.component';

@Component({
  selector: 'm-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{

  displayedColumns = ['role_nom', 'createdAt', 'role_etat','action'];
  public tables;
  public ELEMENT_DATA2;
  public dataSource;
  public id;
  public titre='';
  closeResult: string;

  constructor(private RoleService: RoleService, private modalService: NgbModal, public dialog: MatDialog){
  }
  @ViewChild(MatSort) sort: MatSort;

  /**
  * Set the sort after the view init since this component will
  * be able to query its view for the initialized sort.
  */
 ngAfterViewInit() {
  
}
  ngOnInit() {
    console.log(EditComponent)
      console.log('aaa')
      this.RoleService.getRoles().subscribe(response => {
      console.log(response)
      this.ELEMENT_DATA2 = response;
      this.ELEMENT_DATA2.forEach(element => {
        
        element.role_eetat = (element.role_etat) ? 'Activé' : 'Désactivé';

      });
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA2);
      this.dataSource.sort = this.sort;
    });

  }
  getRole(id){
    this.RoleService.getRole(id).subscribe(response => {
      console.log('response: '+JSON.stringify(response))
    });
  }
  /*open(content, id) {
    this.id = id;
    this.titre = (id>0) ? "Modification" : "Ajout d\'un nouveau role";
    this.modalService.open(content, {
        size: 'lg'
    });
  }*/

openDialog(id) {
  this.id = id;
  this.titre = (id>0) ? "Modification" : "Ajout d\'un nouveau role";
 this.dialog.open(EditComponent, { data: { id } });
}
}
