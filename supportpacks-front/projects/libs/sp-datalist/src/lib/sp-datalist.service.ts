import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(private http: HttpClient, @Inject('env') private env) { }

  /**
 * 
 * @params 
 * @param role
 * @param stage
 * @param category
 */
  getRSC(params) {
    return this.http.post<any>(`${this.env['api']}/sp/guidelinesByRSC`, params).pipe();
  }

  /**
   * 
   * check if obj has null properties
   */
  hasNull(obj) {
    for (var key in obj) {
      if (obj[key] === null || obj[key] == "")
        return false;
    }
    return true;
  }


}
