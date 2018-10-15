import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {User} from '../../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";



@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  //user: User;
  registrationForm: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }
  get userName(){
    return this.registrationForm.get('name');
  }

  ngOnInit() {
   //this.user = this.userService.getter();
   this.registrationForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['']
});
this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  createUpdate(){
    if (this.registrationForm.get('_id')){
      this.userService.updateUser(this.registrationForm.value).pipe(first()).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/']);
        },
        error=>{
          console.log(error);
        }
      )
    }else{
    this.userService.createUser(this.registrationForm.value).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error);
      }
    )
    //}
  }


}
}
