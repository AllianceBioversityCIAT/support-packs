import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const API = environment['api'];
const app_id = environment.app_id;

@Injectable({
  providedIn: 'root'
})
export class SppServices {

  constructor(private http: HttpClient) { }
  /**
   *  Get roles by app_id
   */
  getSPRoles() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/roles/${app_id}`).pipe();
  }
  /**
   *  Get stages by app_id
   */
  getSPStages() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/stages/${app_id}`).pipe();
  }
  /**
   *  Get categories by app_id
   */
  getSPCategories() {
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
