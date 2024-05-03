import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesTermsService {
  urlApi = environment.api;
  constructor(private http: HttpClient) {}

  continue: boolean = false;
  termsConditions: boolean = false;

  termsAndConditions() {
    this.termsConditions = true;
  }

  resetValues() {
    this.termsConditions = false;
    this.continue = false;
  }

  postregisterdowload(data: any) {
    return this.http.post<any>(`${this.urlApi}/support/registerDowloadTool`, data).pipe();
  }
}
