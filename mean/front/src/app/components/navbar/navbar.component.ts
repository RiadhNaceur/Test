import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../shared/user.service';
import{User} from '../../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }
  /*addUser(event: any){
    event.preventDefault();
    this.userService.setter(new User);
    this.router.navigate(['/createUpdate']);

  }*/

}
