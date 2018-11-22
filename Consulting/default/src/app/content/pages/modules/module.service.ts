import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {


  constructor(private http: HttpClient) { }

	public getModule(id){
		return this.http.get<any>('http://localhost:8080/module/get/'+id);
	}
	public updateModule(id,model){
		return this.http.put<any>('http://localhost:8080/module/update/'+id, model);
	}
	public getModules(){
		return this.http.get<any>('http://localhost:8080/module/get');
	}
	public addModule(model){
		return this.http.post<any>('http://localhost:8080/module/createmodule/', model.value);
  }
  public deleteModule(id){
		return this.http.delete<any>('http://localhost:8080/module/delete/'+id);
	}
}
