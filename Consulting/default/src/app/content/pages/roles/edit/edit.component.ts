import { Component, OnInit, Input,ViewChild, Inject  } from '@angular/core';
import { NgForm } from '@angular/forms';
import{RoleService} from '../role.service';
import {SnotifyService} from 'ng-snotify';
import { Observable } from "rxjs";
import {RolesComponent} from '../roles.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
@Input() id: number;
public model = {}
public errors;
errorMessage = '';
public allModules;
public modules = [];
public actions : number[] = [];
public button = '';

@ViewChild('f') f: NgForm;
  constructor(private RoleService: RoleService, private snotifyService: SnotifyService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

   }
   

  ngOnInit() {
    console.log(this.data.id)
    if (this.data.id){
      this.RoleService.getRole(this.data.id).subscribe(response => {
      console.log(response)
      response.actions.forEach(element => {
        //this.actions.push(element.action_id)
        this.actions.push(element.action_id)
      });
      this.model = response;
      this.modules = response['modules'];

      });
      this.button = 'Modifier';
  }else{
    this.button = 'Ajouter';
  }
    this.RoleService.getModules().subscribe(response => {
      console.log(response)
    this.allModules = response;
     });

 
  }
  inArray(array, needle){
      return array.indexOf(needle) >= 0;
  }
  inObjectArray(array, needle){
    console.log(array.filter(x => x.action_id == needle))
    return  array.filter(x => x.action_id == needle);
}

  ChangingModule($event,module){
    if (this.modules.indexOf(module.module_id) >= 0){
      if (!$event.checked) {
        this.modules.splice(this.modules.indexOf(module.module_id),1)
        module.actions.forEach(element => {
          this.actions.splice(this.actions.indexOf(element.action_id),1)
        });
      }

    }else{
      this.modules.push(module.module_id)
    }
   
  }
  ChangingAction($event,id){
    console.log(this.actions)

      if (this.actions.indexOf(id) >= 0){
        if (!$event.checked) {
          this.actions.splice(this.actions.indexOf(id),1)
        }
  
      }else{
        this.actions.push(id)
      }
  }
  validate(f: NgForm) {
		if (f.form.status === 'VALID') {
			return true;
    }
   

		this.errors = [];
		/*if (objectPath.get(f, 'form.controls.email.errors.email')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}
		if (objectPath.get(f, 'form.controls.email.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.REQUIRED', {name: this.translate.instant('AUTH.INPUT.EMAIL')}));
		}

		if (objectPath.get(f, 'form.controls.password.errors.required')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.INVALID', {name: this.translate.instant('AUTH.INPUT.PASSWORD')}));
		}
		if (objectPath.get(f, 'form.controls.password.errors.minlength')) {
			this.errors.push(this.translate.instant('AUTH.VALIDATION.MIN_LENGTH', {name: this.translate.instant('AUTH.INPUT.PASSWORD')}));
		}

		if (this.errors.length > 0) {
			this.authNoticeService.setNotice(this.errors.join('<br/>'), 'error');
			this.spinner.active = false;
    }*/

		return false;
  }
  
  submit(f: NgForm) {
    //let data: {} = f.value;
    f.value.actions = this.actions;
    console.log(f.value)
 
    if (this.data.id>0){
			this.RoleService.updateRole(this.data.id,f).subscribe(
				response => {
         this.snotifyService.async('Veuillez patientez', successAction);
         //this.RolesComponent.ngOnInit();
			}, err=>{
        this.errorMessage = err.message;
        this.snotifyService.async('Veuillez patientez', errorAction);
      });
    }else{
      this.RoleService.addRole(f).subscribe(
				response => {
         this.snotifyService.async('Veuillez patientez', successAction);
        //this.RolesComponent.ngOnInit();
			}, err=>{
        this.errorMessage = err.message;
        this.snotifyService.async('Veuillez patientez', errorAction);
      });
    }
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
    });
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