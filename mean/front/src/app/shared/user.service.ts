import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new User;
  private baseUri: string =   "http://localhost:8080";
  private headers = new HttpHeaders().set('Content-Type','application/json')
  constructor(private http: HttpClient) { }

  createUser(user: User){
    return this.http.post(this.baseUri+'/create',user,{headers: this.headers});
  }
  getUserById(id: any){
    return this.http.get(this.baseUri+'/get/'+id);
  }
  readUsers(){
    return this.http.get(this.baseUri+'/read',{headers: this.headers});
  }
  updateUser(user: User){
    return this.http.put(this.baseUri+'/update',user,{headers: this.headers});
  }
  deleteUser(id: string){
    return this.http.delete(this.baseUri+'/delete/'+id,{headers: this.headers});
  }

  setter(user: User){
    this.user = user;
  }
  getter(){
    return this.user;
  }
}
