import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {UserService} from './shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private userService: UserService) { }
  intercept(req, next){
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.userService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
