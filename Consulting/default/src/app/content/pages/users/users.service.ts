import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  public getUsers(){
		return this.http.get('http://localhost:8080/user/get');
  }
	public getUser(id){
		return this.http.get<any>('http://localhost:8080/user/get/'+id);
  }
  
  /***************** */
	public updateUser(id,model){
		return this.http.put<any>('http://localhost:8080/user/update/'+id, model);
	}

	public addUser(model){
		return this.http.post<any>('http://localhost:8080/user/createuser/', model);
	}

	public deleteUser(id){
		return this.http.delete<any>('http://localhost:8080/user/delete/'+id);
	}

}
