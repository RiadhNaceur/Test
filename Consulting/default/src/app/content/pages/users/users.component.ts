import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent, merge, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
// Services
import { CustomersService } from '../components/apps/e-commerce/_core/services/index'
import { LayoutUtilsService, MessageType } from '../components/apps/e-commerce/_core/utils/layout-utils.service';
import { HttpUtilsService } from '../components/apps/e-commerce/_core/utils/http-utils.service';
// Models
import { QueryParamsModel } from '../components/apps/e-commerce/_core/models/query-models/query-params.model';
import { CustomerModel } from '../components/apps/e-commerce/_core/models/customer.model';
import { CustomersDataSource } from '../components/apps/e-commerce/_core/models/data-sources/customers.datasource';
// Components

import {EditUsersComponent} from './edit/edit.component';
import { UsersService } from './users.service';
@Component({
  selector: 'm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

	displayedColumns = ['user_id', 'user_nom', 'lastName', 'email', 'dateCreation', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<CustomerModel>(true, []);
	customersResult: CustomerModel[] = [];
  public ELEMENT_DATA2;
	public dataSource;
	public loading;

	constructor(
		private customersService: CustomersService,
		public dialog: MatDialog,
    public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
    private userService : UsersService
	) {}

  ngOnInit() {
		this.loading = true;
    this.userService.getUsers().subscribe(response => {
      console.log(response)
			this.ELEMENT_DATA2 = response;
     /* this.ELEMENT_DATA2.forEach(element => {
        
        element.role_eetat = (element.role_etat) ? 'Activé' : 'Désactivé';

      });*/
			this.dataSource = new MatTableDataSource(this.ELEMENT_DATA2);
			console.log(this.dataSource)
			this.dataSource.sort = this.sort;
			this.loading = false;
    });
  }
  editCustomer(customer) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += customer.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = customer.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(EditUsersComponent, { data: { customer } });
		dialogRef.afterClosed().subscribe(res => {
			console.log(res)
			if (!res) {
				return;
			}
			
			//this.ngOnInit();
			//this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
		});
	}

}
