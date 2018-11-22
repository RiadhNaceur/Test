import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesUtilsService } from '../../components/apps/e-commerce/_core/utils/types-utils.service'
import { CustomersService } from '../../components/apps/e-commerce/_core/services/index';
import { CustomerModel } from '../../components/apps/e-commerce/_core/models/customer.model';
import { ModuleService } from '../module.service';
import {SnotifyService} from 'ng-snotify';
import { Observable } from "rxjs";


@Component({
  selector: 'm-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.scss']
})
export class EditModuleComponent implements OnInit {
  public customer;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
  loadingAfterSubmit: boolean = false;
  hide = true
  titre_button = 'Modifier';
  Title = 'Modifier un utilisateur';
  updated = false;


  constructor(public dialogRef: MatDialogRef<EditModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private customerService: CustomersService,
    private typesUtilsService: TypesUtilsService,
    private ModuleService: ModuleService, 
    private snotifyService: SnotifyService) { }
    ngOnInit() {
      this.customer = this.data.customer;
      console.log(this.customer)
      
      this.customerForm = this.fb.group({
        module_nom: ['', Validators.required],
        module_etat: ['', Validators.required]
      });

      if (this.customer != 0){
 
      this.ModuleService.getModule(this.customer.module_id)
            .subscribe( data => {
              if (data.role_id)
            data.role_id = data.role_id.toString();

              this.customerForm.patchValue(data);
            });
      }else{
        this.titre_button = 'Ajouter';
        this.Title = 'Ajouter un utilisateur';
      }

    }
  

  
    /** UI */
    getTitle(): string {
      if (this.customer.id > 0) {
        return `Edit customer '${this.customer.firstName} ${
          this.customer.lastName
        }'`;
      }
  
      return 'New customer';
    }
  
    isControlInvalid(controlName: string): boolean {
      const control = this.customerForm.controls[controlName];
      const result = control.invalid && control.touched;
      return result;
    }
  
    /** ACTIONS */
    prepareCustomer(): CustomerModel {
      const controls = this.customerForm.controls;
      const _customer = new CustomerModel();
      _customer.id = this.customer.id;
      const _date = controls['dob'].value;
      if (_date) {
        _customer.dateOfBbirth = this.typesUtilsService.dateFormat(_date);
      } else {
        _customer.dateOfBbirth = '';
      }
      console.log('_customer', _customer);
      _customer.firstName = controls['firstName'].value;
      _customer.lastName = controls['lastName'].value;
      _customer.email = controls['email'].value;
      _customer.userName = controls['userName'].value;
      _customer.gender = controls['gender'].value;
      _customer.ipAddress = controls['ipAddress'].value;
      _customer.type = +controls['type'].value;
      _customer.status = this.customer.status;
      return _customer;
    }
  
    onSubmit() {
    if (this.customer !=0){
      this.ModuleService.updateModule(this.customer.module_id,this.customerForm.value).subscribe(
        data=>{
          console.log(data);
          this.snotifyService.async('Veuillez patientez', successAction);
          setTimeout(() => {
            this.dialogRef.close()
            console.log('bruuuuh')
          }, 3000);
          
          this.updated = true;
         // this.dialogRef.close(3000);
        },
        error=>{
          console.log(error);
          this.snotifyService.async('Veuillez patientez', errorAction);
        }
      )
    }else{
    this.ModuleService.addModule(this.customerForm.value).subscribe(
      data=>{
        console.log(data);
        this.snotifyService.async('Veuillez patientez', successAction);

        
      },
      error=>{
        console.log(error);
        this.snotifyService.async('Veuillez patientez', errorAction);
      }
    )
  }
    }
  
    updateCustomer(_customer: CustomerModel) {
      this.loadingAfterSubmit = true;
      this.viewLoading = true;
      this.customerService.updateCustomer(_customer).subscribe(res => {
        /* Server loading imitation. Remove this on real code */
        this.viewLoading = false;
        this.viewLoading = false;
        this.dialogRef.close({
          _customer,
          isEdit: true
        });
      });
    }
  
    createCustomer(_customer: CustomerModel) {
      this.loadingAfterSubmit = true;
      this.viewLoading = true;
      this.customerService.createCustomer(_customer).subscribe(res => {
        this.viewLoading = false;
        this.dialogRef.close({
          _customer,
          isEdit: false
        });
      });
    }
  
    onAlertClose($event) {
      this.hasFormErrors = false;
    }
}

const successAction = Observable.create(observer => {
  setTimeout(() => {
    observer.next({
      title: 'Success',
      body: 'Role modifié !',
      config: {
        closeOnClick: true,
        timeout: 1000,
        showProgressBar: true
      }
    })
    observer.complete();
  }, 1000);
});

const errorAction = Observable.create(observer => {
  setTimeout(() => {
    observer.next({
      title: 'Erreur',
      body: 'Une erreur c\'est produite',
      config: {
        closeOnClick: true,
        timeout: 1000,
        showProgressBar: true
      }
    });
    observer.complete();
  }, 1000);
});