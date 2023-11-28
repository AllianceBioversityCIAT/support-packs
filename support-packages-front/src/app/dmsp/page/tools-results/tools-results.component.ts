import { Component, OnInit } from '@angular/core';
import { ServicedmspService } from '../../services/servicedmsp.service';
import { ServicesTermsService } from 'src/app/shared/services/services-terms.service';

@Component({
  selector: 'app-tools-results',
  templateUrl: './tools-results.component.html',
  styleUrls: ['./tools-results.component.scss']
})
export class ToolsResultsComponent implements OnInit{

  products!: any[];

  selectedProducts!: any;

  backInfo!: any[];

  roles: any[] | undefined;
  selectRole: any | undefined;

  whereAreYou: any[] | undefined;
  selectWhereAreYou: any | undefined;

  what: any[] | undefined;
  selectWhat: any | undefined;

  rol = null;

  constructor(private _servicesDmspService:ServicedmspService, public _servicesVariables : ServicesTermsService) { }

  ngOnInit(): void {
    this.getFilters();
    this.getTools();
  }

  getFilters(){
    this._servicesDmspService.getSPFilters().subscribe((data)=>{
      console.log(data);

      this.what = data.result.categories;
      this.roles = data.result.roles;
      this.whereAreYou = data.result.stage;

      this.roles.map((data:any)=>{
        data.img = '../../../../assets/roles/'+data.id+'.png';
      });
      this.what.map((data:any)=>{
        data.selected = true;
      })
    });
  }

  getTools(){
    this._servicesDmspService.getAllTools().subscribe((data)=>{
      console.log('DD', data);
      this.products = data.result;
      this.backInfo = data.result;
      
    });
  }
  filterInformation(){
    this.products = this.backInfo;
    if(this.selectRole != undefined && this.selectWhereAreYou != undefined && this.selectWhat != undefined){
      this.products = this.products.filter((data)=>{
        return data.category_id == this.selectWhat.id && data.role_id == this.selectRole.id && data.stage_id == this.selectWhereAreYou.id ;
      });
    }
    console.log(this.products);
    
  }

  termsAndConditions(){
    this._servicesVariables.termsConditions = true;
  }

  newSource(){
    this._servicesVariables.back = false;
    this._servicesVariables.continue = false;
    this._servicesVariables.termsConditions = false;
    this.selectRole = undefined; this.selectWhat = undefined; this.selectWhereAreYou = undefined;
    this.selectedProducts = []
  }

  changesItemStus(item){
    this.what.map((data)=>{
      data.selected = false;
    })
    item.selected = true;
  }
}
