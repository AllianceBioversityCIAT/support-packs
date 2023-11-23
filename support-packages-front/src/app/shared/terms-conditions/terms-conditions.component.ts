import { Component, OnInit } from '@angular/core';
import { ServicesTermsService } from '../services/services-terms.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit{
  
    email = '';
    constructor(public _servicesVariables : ServicesTermsService) { }
  
    ngOnInit(): void {
      
    }

    back(){
      this._servicesVariables.back = true;
      this._servicesVariables.continue = false;
      this._servicesVariables.termsConditions = false;

    }
    saveEmail(){}

    skip(){
      this._servicesVariables.back = false;
      this._servicesVariables.continue = true;
      this._servicesVariables.termsConditions = false;
    }
}
