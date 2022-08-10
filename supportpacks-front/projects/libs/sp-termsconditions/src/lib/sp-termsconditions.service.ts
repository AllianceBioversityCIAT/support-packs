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

  downloadAll(urls: string[], callback?: any) {
    let count = 0;
    const zip = new JSZip();
    urls.forEach(u => {
      const filename = u.split('/')[u.split('/').length - 1];
      // I think that this function where the binary content of a file is obtained through a link is what causes the download to be so slow and to consume a lot of resources
      JSZipUtils.getBinaryContent(u, (err, data) => {
        if (err) { throw err;  }
        zip.file(filename, data, { binary: true });
        count++;
        if (count === urls.length) {
          // This function works relatively normal and reports progress as expected.
          zip.generateAsync({ type: 'blob' }, (value) => callback(value)).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            const link: any = document.createElement('a');
            console.log(link);
            link.download = 'resources.zip';
            link.href = objectUrl;
            link.click();
          });
        }
      });
    });
  }

}
