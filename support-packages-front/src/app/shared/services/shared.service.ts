import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isLoggedMELSP = signal({
    status: false,
  });

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${environment.api}/auth/auth/login`, data).pipe();
  }

  getSPFilters(app_id: number) {
    return this.http.get<any>(`${environment.api}/support/all/${app_id}`).pipe();
  }

  getAllTools(app_id: number) {
    return this.http.get<any>(`${environment.api}/guidelines/sp-guidelines/all/${app_id}`).pipe();
  }

  getAllToolsWithoutImportantLevels(app_id: number) {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/allWithoutImportantLevels/${app_id}`)
      .pipe();
  }

  // getDownloadTool(data: any) {
  //   return this.http.post<any>(`${environment.api}/support/create`, data).pipe();
  // }

  // postRequestTool(data: any) {
  //   return this.http.post<any>(`${environment.api}/support/createRequest`, data).pipe();
  // }

  // getAllRequest() {
  //   return this.http.get<any>(`${environment.api}/support/resquest`).pipe();
  // }

  getToolOverview(app_id: number) {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/overview/${app_id}`)
      .pipe();
  }

  downloadFiles(keys: string[]) {
    return this.http.post(
      `${environment.api}/file-management/download-zip`,
      { keys },
      { responseType: 'blob' },
    );
  }

  // Admin module
  getActiveAdminTools(app_id: number) {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/editPanel/${app_id}`)
      .pipe();
  }

  getRequestedAdminTools(app_id: number) {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/adminPanel/requested/${app_id}`)
      .pipe();
  }

  getDisabledAdminTools(app_id: number) {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/editPanelDesactive/${app_id}`)
      .pipe();
  }

  // Admin tools actions

  activeOrDesactive(app_id: string, data: any, active: any) {
    return this.http
      .post<any>(
        `${environment.api}/guidelines/sp-guidelines/activeOrDesactive/${app_id}/${data.id}/${active}`,
        data,
      )
      .pipe();
  }
}
