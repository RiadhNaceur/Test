import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../shared/user.service';
import {Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder, private route: ActivatedRoute ) { }
  loginForm: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
  });
}
login(){
  this.userService.login(this.loginForm.value).subscribe(
    data=>{
      console.log(data);
      localStorage.setItem('token', data['token']);
      this.router.navigate(['/']);
    },
    error=>{
      console.log(error);
    }
  )
}
}
