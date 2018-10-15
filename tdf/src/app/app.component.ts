import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private enrollmentService: EnrollmentService){}

  title = 'tdf';

  topics = ['Angular', 'React', 'Vue'];
  errorMsg = '';
  userModel = new User('Rob','rob@test.com',1114445522,'','morning',true);
  submitted = false;
  onSubmit(){
    this.submitted = true;
    this.enrollmentService.enroll(this.userModel)
    .subscribe(
      data => console.log('Success', data),
      error => this.errorMsg = error.statusText
    )
  }
}
