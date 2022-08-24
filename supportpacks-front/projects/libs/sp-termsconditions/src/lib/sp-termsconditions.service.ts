import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'projects/melsp/src/environments/environment.prod';
import { Observable, Subject } from 'rxjs';
import { FileSaver }  from 'FileSaver';
import JSZipUtils from 'jszip-utils';
import * as JSZip from 'jszip';


@Injectable({
  providedIn: 'root'
})
export class SPTermsconditionsService {
  [x: string]: any;

  public docsToDonw$ = new Subject<any>();


  constructor(private http: HttpClient, @Inject('env') private env) {

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
    return this.http.post<any>(`${this.env['api']}/sp/person/info`, params).pipe();
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
    let app_id = environment.app_id;
    return this.http.post<any>(`${this.env['api']}/sp/download`, params).pipe();
  }


  /**
   * 
   *
   */
  getRegions() {
    // let app_id = environment.app_id;
    return this.http.get<any>(`${this.env['api']}/sp/regions`).pipe();
  }

  /**
   * 
   * 
   */
  getFilesPath(){
    return `${this.env['api_name']}/public/data/`
  }
}
