import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesTermsService {
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
    return this.http.post<any>(`${environment.api}/support/registerDowloadTool`, data).pipe();
  }

  getExistingUser(email: string) {
    return this.http.get<any>(`${environment.api}/users/sp-users/get-user?email=${email}`).pipe();
  }
}
