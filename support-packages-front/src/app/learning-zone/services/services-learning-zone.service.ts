import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesLearningZoneService {
  constructor(private http: HttpClient) {}

  getSPFilters() {
    return this.http.get<any>(`${environment.api}/support/all/3`).pipe();
  }

  getAllTools() {
    return this.http.get<any>(`${environment.api}/guidelines/sp-guidelines/all/3`).pipe();
  }

  getDownloadTool(data: any) {
    return this.http.post<any>(`${environment.api}/support/create`, data).pipe();
  }

  postRequestTool(data: any) {
    return this.http.post<any>(`${environment.api}/support/createRequest`, data).pipe();
  }

  getAllRequest() {
    return this.http.get<any>(`${environment.api}/support/resquest`).pipe();
  }

  getToolOverview() {
    return this.http.get<any>(`${environment.api}/guidelines/sp-guidelines/overview/3`).pipe();
  }

  getToolsAdmin() {
    return this.http.get<any>(`${environment.api}/guidelines/sp-guidelines/editPanel/3`).pipe();
  }

  getToolsAdminRquest() {
    return this.http.get<any>(`${environment.api}/support/editRequest/3`).pipe();
  }

  getToolsAdminDesactive() {
    return this.http
      .get<any>(`${environment.api}/guidelines/sp-guidelines/editPanelDesactive/3`)
      .pipe();
  }

  postregisterdowload(data: any) {
    return this.http.post<any>(`${environment.api}/support/registerDowloadTool`, data).pipe();
  }

  putTool(data: any) {
    return this.http
      .post<any>(`${environment.api}/guidelines/sp-guidelines/updateTool/3/${data.id}`, data)
      .pipe();
  }

  putToolRequest(data: any) {
    return this.http
      .post<any>(`${environment.api}/support/updateToolRequest/3/${data.id}`, data)
      .pipe();
  }

  activeOrDesactive(data: any, active: any) {
    return this.http
      .post<any>(
        `${environment.api}/guidelines/sp-guidelines/activeOrDesactive/3/${data.id}/${active}`,
        data,
      )
      .pipe();
  }

  login(data: any) {
    return this.http.post<any>(`${environment.api}/auth/auth/login`, data).pipe();
  }

  createRequestNewTool(data: any) {
    return this.http.post<any>(`${environment.api}/support/createToolNewRequest/3`, data).pipe();
  }

  aceptedRequest(data: any) {
    return this.http
      .post<any>(`${environment.api}/guidelines/sp-guidelines/createToolNew/3`, data)
      .pipe();
  }

  denyToolRequest(data: any) {
    return this.http
      .post<any>(`${environment.api}/support/denyToolRequest/3/${data.id}`, data)
      .pipe();
  }
}
