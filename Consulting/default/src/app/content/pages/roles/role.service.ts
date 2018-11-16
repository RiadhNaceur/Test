import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private headers = new HttpHeaders().set('Content-Type','x-www-form-urlencoded json')

  constructor(private http: HttpClient) { }

	public getRoles(){
		return this.http.get('http://localhost:8080/role/get');
	}
	public getRole(id){
		return this.http.get<any>('http://localhost:8080/role/get/'+id);
	}
	public updateRole(id,model: NgForm){
		return this.http.put<any>('http://localhost:8080/role/update/'+id, model.value);
	}
	public getModules(){
		return this.http.get<any>('http://localhost:8080/module/get');
	}
	public addRole(model: NgForm){
		return this.http.post<any>('http://localhost:8080/role/createrole/', model.value);
	}
}
