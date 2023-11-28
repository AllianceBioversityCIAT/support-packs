import { Component, OnInit } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';

@Component({
  selector: 'app-home-learning',
  templateUrl: './home-learning.component.html',
  styleUrls: ['./home-learning.component.scss']
})
export class HomeLearningComponent implements OnInit{
  thematicAreas: any[] = [];
  selectThematicAreas: any;
  targetUser: any[] = [];
  selectTargetUser: any;
  projectPhase: any[] = [];
  selectProjectUser: any;
  products: any[] = [];
  loading: boolean = false;
  color = 'red'
  selectedProducts: any[] = [];
  backInfo: any[] = [];
  terms = false;
  email = '';
  resources = false;
  dowloadSection = false;
  continuoClcik = false;
  cities!: any[];

  selectedCities!: any[];
  selectedCitiesw!: any[];

  forml = {
    first_name: '',
    last_name: '',
    institute: '',
    intended: '',
    app_id : '',
    email:''
  }
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService){}
  ngOnInit() {
    this.getAllFilters();
    this.getAllTools();
    this.loading = true;
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

  filterInformation(){
    this.products = this.backInfo;
    if(this.selectThematicAreas != undefined && this.selectTargetUser != undefined && this.selectProjectUser != undefined){
      this.products = this.products.filter((data)=>{
        return data.id_cat == this.selectThematicAreas.id && data.id_rol == this.selectTargetUser.id && data.id_stage == this.selectProjectUser.id ;
      });
    }

  }

  clearFilters(){
    this.selectThematicAreas = undefined;
    this.selectTargetUser = undefined;
    this.selectProjectUser = undefined;
    this.products = this.backInfo;
    this.selectedProducts = []
  }
  getAllFilters(){
    this._servicesLearningZoneService.getSPFilters().subscribe((data)=>{
      console.log(data);

      this.thematicAreas = data.result.categories;
      this.targetUser = data.result.roles;
      this.projectPhase = data.result.stage;
    });
  }

  getAllTools(){
    this.loading = true;
    this._servicesLearningZoneService.getAllTools().subscribe((data)=>{
      console.log(data);
      this.products = data.result;
      this.backInfo = data.result;
      this.loading = false;
    });
  }

  viewSelected(){
    this.terms = true;
    this.products = this.selectedProducts;

  }

  back(){
    this.terms = false;
    this.products = this.backInfo;
    this.selectThematicAreas = undefined;
    this.selectTargetUser = undefined;
    this.selectProjectUser = undefined;
    this.resources = false;
    this.dowloadSection = false;
    this.continuoClcik = false;
    this.selectedProducts = []
  }

  async saveEmail(){
    this.terms = false;
    this.resources = true;
    this.dowloadSection = true;
    this.products = this.selectedProducts;

    this.selectedCities.map((data:any)=>{
      data['scope'] = 'researchRegion';
    });

    this.selectedCitiesw.map((data:any)=>{
      data['scope'] = 'instituteRegion';
    })

    console.log(this.selectedCities);
    console.log(this.selectedCitiesw);      
    const region = await this.selectedCities.concat(this.selectedCitiesw);
    this.selectedProducts.map((data:any)=>{
      data['guideline_id'] = data.id;
    });
    this.forml.app_id = '3';
    this.forml['region'] = region;
    this.forml['guiades'] = this.selectedProducts

    console.log(this.forml);
    

    this._servicesLearningZoneService.postregisterdowload(this.forml).subscribe((data)=>{
      console.log(data);
      
    });
  }

  public downloadAsPDF() {
    
  }
}
