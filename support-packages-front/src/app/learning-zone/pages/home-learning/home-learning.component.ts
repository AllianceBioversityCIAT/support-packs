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
    name: '',
    intitution: '',
    message: '',
    last_name : '',
  }
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService){}
  ngOnInit() {
    this.getAllFilters();
    this.getAllTools();
    this.loading = true;
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

  saveEmail(){
    this.terms = false;
    this.resources = true;
    this.dowloadSection = true;
    this.products = this.selectedProducts;
    this.selectedProducts.map((data)=>{data.email = this.email});

    this._servicesLearningZoneService.getDownloadTool(this.selectedProducts).subscribe((data)=>{
      console.log(data);
      
    })
  }

  public downloadAsPDF() {
    
  }
}
