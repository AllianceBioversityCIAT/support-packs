import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesLearningZoneService {
  constructor(private http: HttpClient) {}

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
