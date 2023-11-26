import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicedmspService {

  urlApi = environment.api;
  
  constructor(private http: HttpClient) { }


  getSPFilters() {
    console.log(this.urlApi);
    
    return this.http.get<any>(`${this.urlApi}/support/all/1`).pipe();
  }

  getAllTools(){
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/all/1`).pipe();
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

  getToolOverview(){
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/overview/1`).pipe();
  }
}
