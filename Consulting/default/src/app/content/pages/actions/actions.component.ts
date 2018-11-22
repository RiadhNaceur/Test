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

import {EditActionComponent} from './edit-action/edit-action.component';
import { ActionService } from './action.service';

@Component({
  selector: 'm-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  displayedColumns = ['action_id', 'action_nom', 'action_fonction', 'action_etat', 'action_dateCreation', 'actions'];
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
public filterTable = [];

	constructor(
		private customersService: CustomersService,
		public dialog: MatDialog,
    public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
    private ActionService : ActionService
	) {}

  ngOnInit() {
		this.loading = true;
    this.ActionService.getActions().subscribe(response => {
			this.ELEMENT_DATA2 = response;
      this.ELEMENT_DATA2.forEach(element => {
        
        element.action_eetat = (element.action_etat) ? 'Activé' : 'Désactivé';

      });
			this.dataSource = new MatTableDataSource(this.ELEMENT_DATA2);
			console.log('datasource:')
			console.log(this.dataSource)
			this.dataSource.sort = this.sort;
			
				this.dataSource.paginator = this.paginator;
			  
			this.loading = false;
	});

	}



	applyFilter(filterValue) {

		var val = (filterValue.source) ? filterValue.value : filterValue.target.value;

		this.dataSource.filter = val
		/*if (filterValue.source) {
			/*this.dataSource.filterPredicate = (data: any, filter: any) => {
				if (filter == "true")
				return (data.action_etat);
				return (!data.action_etat)
			   };
			   this.filterTable.push(filterValue.value)
			   this.dataSource.filter = filterValue.value;
		}else{
			filterValue.target.value = filterValue.target.value.trim(); // Remove whitespace
			filterValue.target.value = filterValue.target.value.toLowerCase(); // Datasource defaults to lowercase matche
			this.filterTable.push(filterValue.target.value)
			this.dataSource.filter = filterValue.target.value;
		}*/
		//this.dataSource.filter = x;

  }
  editCustomer(customer) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += customer.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = customer.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(EditActionComponent, { data: { customer } });
		dialogRef.afterClosed().subscribe(res => {
			console.log(res)
			if (!res) {
				return;
			}
			
			//this.ngOnInit();
			//this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
		});
	}

	deleteCustomer(id) {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement('Suppression', 'Voulez-vous supprimer cet utilisateur ?', 'Veuillez patienter');
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.ActionService.deleteAction(id).subscribe(() => {
				this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				//this.loadCustomersList();
				this.ngOnInit();
			});
		});
	}

	loadCustomersList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(true),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		//this.dataSource.loadCustomers(queryParams);
		this.selection.clear();
	}
	filterConfiguration(isGeneralSearch: boolean = true): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.lastName = searchText;
		if (!isGeneralSearch) {
			return filter;
		}

		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}
}
export interface Element {
	action_id: number;
	action_nom: string;
	action_prenom: string;
	action_email: string;
	action_etat: boolean;
  }