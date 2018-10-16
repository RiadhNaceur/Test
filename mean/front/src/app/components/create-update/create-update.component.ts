import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
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
  registrationForm: FormGroup;
  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute ) { }
  get userName(){
    return this.registrationForm.get('name');
  }
  id;
  ngOnInit() {
   this.registrationForm = this.fb.group({
    _id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['']
});

this.route.params.subscribe(params => {
  this.id = params['id'];
  if (this.id != 0){

    this.userService.getUserById<User>(this.id)
          .subscribe( data => {
            console.log('daata'+JSON.stringify(data));
            this.registrationForm.patchValue(data);
          });
      }
});

}
  createUpdate(){
    if (this.id !=0){
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
  }
}
}
