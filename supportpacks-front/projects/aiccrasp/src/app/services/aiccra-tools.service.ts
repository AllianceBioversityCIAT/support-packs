import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const API = environment['api'];
const app_id = environment.app_id;
@Injectable({
  providedIn: 'root'
})

export class AiccraToolsService {

  constructor(private http: HttpClient) { }

   /**
   *  Get users/roles by app_id
   */
  getSPUsers() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/roles/${app_id}`).pipe();
  }
  /**
   *  Get phases/stages by app_id
   */
  getSPPhases() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/stages/${app_id}`).pipe();
  }
  /**
   *  Get areas/categories by app_id
   */
  getSPAreas() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/categories/${app_id}`).pipe();
  }
  /**
   *  Get stages by app_id
   * @param id string
   */
  getAllGuidelines(id?) {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/guidelines-all/${id}/${app_id}`).pipe();
  }

  /**
   * 
   * @params 
   * @param role
   * @param stage
   * @param category
   */
  getRSC(params) {
    return this.http.post<any>(`${API}/sp/guidelines/byRSC`, params).pipe();
  }
  /**
   * 
   * @params importance_level
   */
  updateImportanceLevel(params) {
    return this.http.patch<any>(`${API}/sp/importance-level`, params).pipe();
  }
}
