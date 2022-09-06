import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

const API = environment['api'];
const app_id = environment.app_id;

@Injectable({
  providedIn: 'root',
})
export class SppServices {
  app_id = app_id;

  constructor(private http: HttpClient) {}
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
   * @params
   * @param role contains roles information
   * @param stage contains stages information
   * @param category contains categories information
   */
  getRSC(params) {
    return this.http.post<any>(`${API}/sp/guidelines/byRSC`, params).pipe();
  }
  /**
   * @params importance_level
   */
  updateImportanceLevel(params) {
    return this.http.patch<any>(`${API}/sp/importance-level`, params).pipe();
  }

  setDownload(params: any) {
    // let app_id = environment.app_id;
    params.app_id = environment.app_id;
    console.log(params);
    return this.http.post<any>(`${API}/sp/download`, params).pipe();
  }

  getAppId() {
    return this.app_id;
  }
}
