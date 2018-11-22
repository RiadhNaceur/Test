import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private http: HttpClient) { }

	public getAction(id){

		return this.http.get<any>('http://localhost:8080/action/get/'+id);
	}
	public updateAction(id,model){
		return this.http.put<any>('http://localhost:8080/action/update/'+id, model);
	}
	public getActions(){
		return this.http.get<any>('http://localhost:8080/action/get');
	}
	public addAction(model){
		return this.http.post<any>('http://localhost:8080/action/createmodule/', model);
  }
  public deleteAction(id){
		return this.http.delete<any>('http://localhost:8080/action/delete/'+id);
	}
}
