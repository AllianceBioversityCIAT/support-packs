import { Component, OnInit } from '@angular/core';
import { ServicesTermsService } from '../services/services-terms.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit{
  
    email = '';
    continuoClcik = false;
    cities!: any[];
  
    selectedCities!: any[];
    selectedCitiesw!: any[];
  
    forml = {
      name: '',
      intitution: '',
      message: '',
      last_name : '',
    }
    constructor(public _servicesVariables : ServicesTermsService) { }
  
    ngOnInit(): void {
      this.cities = [
        {name: 'Africa', code: 'NY'},
        {name: 'Asia', code: 'RM'},
        {name: 'Australia and Oceania', code: 'LDN'},
        {name: 'Central America and the Caribbean', code: 'IST'},
        {name: 'Middle East and North Africa', code: 'PRS'},
        {name: 'North America', code: 'RM'},
        {name: 'South America', code: 'RM'},
        {name: 'Europe', code: 'RM'},
    ];
    }

    back(){
      this._servicesVariables.back = true;
      this._servicesVariables.continue = false;
      this._servicesVariables.termsConditions = false;

    }
    saveEmail(){
      this._servicesVariables.back = false;
      this._servicesVariables.continue = true;
      this._servicesVariables.termsConditions = false;
    }

    skip(){
      this._servicesVariables.back = false;
      this._servicesVariables.continue = true;
      this._servicesVariables.termsConditions = false;
    }
}
