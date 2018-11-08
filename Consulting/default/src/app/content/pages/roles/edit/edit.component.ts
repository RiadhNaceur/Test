import { Component, OnInit, Input,ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import{RoleService} from '../role.service';
@Component({
  selector: 'm-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() id: number;
public model = {'nom': '', 'etat': ''}
public errors;
@ViewChild('f') f: NgForm;
  constructor(private RoleService: RoleService) { }

  ngOnInit() {
    this.RoleService.getRole(this.id).subscribe(response => {
      console.log('ressponnsse: '+response.role_nom)
     this.model.nom = response.role_nom;
     this.model.etat = response.role_etat;
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
  submit() {
		
			this.RoleService.updateRole(this.id,this.model).subscribe(response => {
				console.log(typeof response)
			/*	if (typeof response !== 'undefined') {
					this.router.navigate(['/']);
				} else {
					this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'error');
				}
				this.spinner.active = false;
				this.cdr.detectChanges();
			});*/
		});
  
}

}
