import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {User} from '../../user';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private users: User[];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.readUsers();
  }
readUsers(){
  this.userService.readUsers().subscribe(
    data=>{
      console.log(data);
      this.users = data['msg'];
    },
    error=>{
      if (error instanceof HttpErrorResponse){
        if (error.status === 401){
          this.router.navigate(['/login']);
        }
      }
    }
  )
}

update(user){
this.userService.setter(user);
localStorage.setItem('usrid',user._id);
this.router.navigate(['/createUpdate/'+user._id]);
}

delete(user){
  this.userService.deleteUser(user._id).subscribe(
    data=>{
      this.users.splice(this.users.indexOf(user),1);
    },
    error=>{

    }
  )
}
}
