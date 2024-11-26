import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
export interface IProduct {
  id: number;
  name: string;
  source: string;
  contact: null;
  description: string;
  target_scale: string;
  integrates_gender: string;
  participants: string;
  methods: string;
  input_types: string;
  expected_outputs: string;
  human_resources: string;
  estimated_time: string;
  strengths: string;
  limitations: string;
  key_references: string;
  importance_level: string;
  role_name: string;
  cate_name: string;
  staga_name: string;
  code: string;
  id_cat: number;
  id_rol: number;
  id_stage: number;
  resources: Resource[];
}

export interface Resource {
  id: number;
  active: number;
  name: string;
  code: string;
  source: string;
  type: string;
  guideline_id: number;
}
@Injectable({
  providedIn: 'root',
})
export class ServicesTermsService {
  continue: boolean = false;
  termsConditions: boolean = false;
  productsData: IProduct[] = [];
  selectedProducts: IProduct[] = [];
  searchedTools;

  constructor(private http: HttpClient) {}

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
