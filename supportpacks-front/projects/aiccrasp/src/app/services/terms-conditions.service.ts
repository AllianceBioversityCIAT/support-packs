import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

const API = environment['api'];
const app_id = environment.app_id;
const api_name = environment.app_id;

@Injectable({
  providedIn: 'root'
})
export class TermsConditionsService {
  public docsToDonw$ = new Subject<any>();


  constructor(private http: HttpClient) {

  }

  public setDocsArray(docs: []): void {
    this.docsToDonw$.next(this.setDocs(docs));
  }

  private setDocs(docs: []): any {
    return docs;
  }
  /**
   * 
   * @param params 
   * @property email
   */
  getPersonInfo(params: any) {
    // let app_id = environment.app_id;
    return this.http.post<any>(`${API}/sp/person/info`, params).pipe();
  }
  /**
   * 
   * @param params 
   * 
    @property  "user_id"
    @property "email"
    @property "first_name"
    @property "last_name"
    @property "institute_name"
    @property "use"
    @property "guide_selected"
    @property "research_regions"
    @property "institute_regions"
   */
  setDownload(params: any) {
    // let app_id = environment.app_id;
    params.app_id = environment.app_id;
    console.log(params);
    return this.http.post<any>(`${API}/sp/download`, params).pipe();
  }


  /**
   * 
   *
   */
  getRegions() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${API}/sp/regions`).pipe();
  }

  /**
   * 
   * 
   */
  getFilesPath(){
    return `${api_name}/public/data/`
  }
}
