import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesLearningZoneService {

  urlApi = environment.api;
  app_id = environment.app_id;
  constructor(private http: HttpClient) { }


  getSPFilters() {
    console.log(this.urlApi);
    
    return this.http.get<any>(`${this.urlApi}/support/all/${this.app_id}`).pipe();
  }

  getAllTools(){
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/all/${this.app_id}`).pipe();
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
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/overview/${this.app_id}`).pipe();
  }

  getToolsAdmin(){
    return this.http.get<any>(`${this.urlApi}/guidelines/sp-guidelines/editPanel/${this.app_id}`).pipe();
  }

  postregisterdowload(data:any){
    return this.http.post<any>(`${this.urlApi}/support/registerDowloadTool`,data).pipe();
  }

  putTool(data:any){
    return this.http.post<any>(`${this.urlApi}/guidelines/sp-guidelines/updateTool/${this.app_id}/${data.id}`,data).pipe();
  }

  activeOrDesactive(data:any, active:any){
    return this.http.post<any>(`${this.urlApi}/guidelines/sp-guidelines/activeOrDesactive/${this.app_id}/${data.id}/${active}`,data).pipe();
  }

  login(data:any){
    return this.http.post<any>(`${this.urlApi}/auth/auth/login`,data).pipe();
  }
}
