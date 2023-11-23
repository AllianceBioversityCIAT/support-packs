import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesMelService {

  urlApi = environment.api;
  
  constructor(private http: HttpClient) { }


  getSPFilters() {
    console.log(this.urlApi);
    
    return this.http.get<any>(`${this.urlApi}/support/all/2`).pipe();
  }

  getAllTools(){
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/all/2`).pipe();
  }

  getDownloadTool(data:any){
    return this.http.post<any>(`${this.urlApi}/support/create`,data).pipe();
  }

  postRequestTool(data:any){
    return this.http.post<any>(`${this.urlApi}/support/createRequest`,data).pipe();
  }

  getAllRequest(){
    return this.http.get<any>(`${this.urlApi}/support/resquest`).pipe();
  }
}
