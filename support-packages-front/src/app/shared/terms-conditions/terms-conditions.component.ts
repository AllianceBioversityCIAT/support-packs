import { Component, Input, OnInit } from '@angular/core';
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
  
    

    @Input() app_id:any;
    @Input() tools:any;

    forml = {
      first_name: '',
      last_name: '',
      institute: '',
      intended: '',
      app_id : '',
      email:''
    }
    constructor(public _servicesVariables : ServicesTermsService) { }
  
    ngOnInit(): void {
      this.cities = [
        {name: 'Africa', id: 1},
        {name: 'Asia', id: 2},
        {name: 'Australia and Oceania', id: 3},
        {name: 'Central America and the Caribbean', id: 4},
        {name: 'Middle East and North Africa', id: 5},
        {name: 'North America', id: 6},
        {name: 'South America', id: 7},
        {name: 'Europe', id: 8},
    ];
    }

    back(){
      this._servicesVariables.back = true;
      this._servicesVariables.continue = false;
      this._servicesVariables.termsConditions = false;

    }
    async saveEmail(){
      this._servicesVariables.back = false;
      this._servicesVariables.continue = true;
      this._servicesVariables.termsConditions = false;

      
      
      this.selectedCities.map((data:any)=>{
        data['scope'] = 'researchRegion';
      });

      this.selectedCitiesw.map((data:any)=>{
        data['scope'] = 'instituteRegion';
      })

      console.log(this.selectedCities);
      console.log(this.selectedCitiesw);      
      const region = await this.selectedCities.concat(this.selectedCitiesw);

      this.forml.app_id = this.app_id;
      this.forml['region'] = region;
      this.forml['guiades'] = this.tools;

      console.log(this.forml);
      

      this._servicesVariables.postregisterdowload(this.forml).subscribe((data)=>{
        console.log(data);
        
      });
    }

    skip(){
      this._servicesVariables.back = false;
      this._servicesVariables.continue = true;
      this._servicesVariables.termsConditions = false;
    }
}
