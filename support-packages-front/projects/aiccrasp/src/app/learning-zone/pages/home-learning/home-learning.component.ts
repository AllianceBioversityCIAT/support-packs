import { Component, OnInit, SimpleChange } from '@angular/core';
import { ServicesLearningZoneService } from '../../services/services-learning-zone.service';
import { LazyLoadEvent } from 'primeng/api';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-home-learning',
  templateUrl: './home-learning.component.html',
  styleUrls: ['./home-learning.component.css']
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
  constructor(private _servicesLearningZoneService:ServicesLearningZoneService){}
  ngOnInit() {
    this.getAllFilters();
    this.getAllTools();
    this.loading = true;
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
  }

  saveEmail(){
    this.terms = false;
    this.resources = true;
    this.products = this.selectedProducts;
    this.selectedProducts.map((data)=>{data.email = this.email});

    this._servicesLearningZoneService.getDownloadTool(this.selectedProducts).subscribe((data)=>{
      console.log(data);
      
    })
  }

  public downloadAsPDF() {
    const opt = {
      margin: 1,
      filename: 'AICCRA-Tools.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    let element = document.getElementById('pdfSection');
    html2pdf().from(element).set(opt).save();
  }
}
