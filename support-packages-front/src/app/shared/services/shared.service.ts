import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  getSPFilters(app_id: number) {
    return this.http.get<any>(`${environment.api}/support/all/${app_id}`).pipe();
  }

  getAllTools(app_id: number) {
    return this.http.get<any>(`${environment.api}/guidelines/sp-guidelines/all/${app_id}`).pipe();
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
}
