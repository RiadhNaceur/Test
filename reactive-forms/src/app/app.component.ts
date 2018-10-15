import { Component } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private fb: FormBuilder){}
get userName(){
  return this.registrationForm.get('userName');
}

  title = 'reactive-forms';
  registrationForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postal: [''],
  })
})

  /*registrationForm = new FormGroup({
    userName: new FormControl('Riadh'),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    address: new FormGroup({
      city: new FormControl(''),
      state: new FormControl(''),
      postal: new FormControl('')
    })
  });*/

  loadApiData(){
    this.registrationForm.setValue({
      userName: 'Riadh',
    password: 12346,
    confirmPassword: 12346,
    address: {
    city: 'aaaaaa',
      state: 'aaaaaa',
      postal:'aaaaaa'
    }
  })
  }
}
