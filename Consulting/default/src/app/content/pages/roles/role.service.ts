import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

	public getRoles(){
		return this.http.get('http://localhost:8080/role/get');
	}
	public getRole(id){
		return this.http.get<any>('http://localhost:8080/role/get/'+id);
	}
	public updateRole(id,model){

		return this.http.put<any>('http://localhost:8080/role/update/'+id, model);
	}
}
