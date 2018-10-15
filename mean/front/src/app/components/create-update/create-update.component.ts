import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {User} from '../../user';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  user: User;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
   this.user = this.userService.getter();
  }
  createUpdate(){
    if (this.user._id){
      this.userService.updateUser(this.user).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/']);
        },
        error=>{
          console.log(error);
        }
      )
    }else{
    this.userService.createUser(this.user).subscribe(
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
