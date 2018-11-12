import { Component, OnInit, Input,ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import{RoleService} from '../role.service';
import {SnotifyService} from 'ng-snotify';
import { Observable } from "rxjs";

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
public modules;
@ViewChild('f') f: NgForm;
  constructor(private RoleService: RoleService, private snotifyService: SnotifyService) {

   }
   

  ngOnInit() {
    this.RoleService.getRole(this.id).subscribe(response => {
      console.log(response)
     this.model = response;
    });
    this.RoleService.getModules().subscribe(response => {
      this.modules = response;
      
     });
 
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
    console.log(f.value)

		/*	this.RoleService.updateRole(this.id,f).subscribe(
				response => {
         this.snotifyService.async('Veuillez patientez', successAction);

			}, err=>{
        this.errorMessage = err.message;
        this.snotifyService.async('Veuillez patientez', errorAction);
      });*/
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