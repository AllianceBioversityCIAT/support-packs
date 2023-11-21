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
}
